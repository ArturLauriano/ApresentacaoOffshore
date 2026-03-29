"use strict";

const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");
PptxGenJS.ShapeType = new PptxGenJS().ShapeType;
const { imageSizingContain } = require("./pptxgenjs_helpers/image");
const { autoFontSize, calcTextBox } = require("./pptxgenjs_helpers/text");
const { safeOuterShadow } = require("./pptxgenjs_helpers/util");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers/layout");
const decks = require("./content");

const ROOT = path.resolve(__dirname, "..", "..");
const OUTPUT_DIR = path.join(__dirname, "output");
const LOGO_PATH = path.join(ROOT, "assets", "logos", "logo-altavista.svg");
const PAGE_W = 13.333;
const PAGE_H = 7.5;
const HEAD_FONT = "Georgia";
const BODY_FONT = "Segoe UI";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function absPath(relativePath) {
  return path.join(ROOT, relativePath);
}

function removeMeasurementFields(options) {
  const clone = { ...options };
  for (const field of ["mode", "minFontSize", "maxFontSize", "padding", "leading"]) {
    delete clone[field];
  }
  return clone;
}

function fitTextOptions(text, fontFace, options) {
  const measured = autoFontSize(text, fontFace, {
    x: options.x,
    y: options.y,
    w: options.w,
    h: options.h,
    fontSize: options.fontSize ?? 16,
    minFontSize: options.minFontSize ?? Math.max(9, (options.fontSize ?? 16) - 4),
    maxFontSize: options.maxFontSize ?? options.fontSize ?? 16,
    mode: "shrink",
    margin: options.margin ?? 0,
    padding: options.padding ?? 0.02,
    leading: options.leading ?? 1.15,
    bold: options.bold,
    italic: options.italic,
    color: options.color,
    align: options.align ?? "left",
    valign: options.valign ?? "top",
  });

  return {
    ...removeMeasurementFields(measured),
    fontFace,
    color: options.color,
    bold: options.bold,
    italic: options.italic,
    align: options.align ?? "left",
    valign: options.valign ?? "top",
    margin: options.margin ?? 0,
  };
}

function addFittedText(slide, text, options) {
  slide.addText(text, fitTextOptions(text, options.fontFace || BODY_FONT, options));
}

function measureTextHeight(text, fontSize, width, fontFace = BODY_FONT, leading = 1.16) {
  return calcTextBox(fontSize, {
    text,
    w: width,
    fontFace,
    margin: 0,
    padding: 0.02,
    leading,
  }).h;
}

function tonePalette(theme, tone) {
  switch (tone) {
    case "blue":
      return { fill: "EAF5FD", border: theme.blue, title: theme.dark, text: theme.text };
    case "gold":
      return { fill: "FDF6E8", border: theme.gold, title: theme.dark, text: theme.text };
    case "red":
      return { fill: "FDECEB", border: theme.red, title: theme.dark, text: theme.text };
    case "green":
      return { fill: "EEF7F1", border: theme.green || theme.blue, title: theme.dark, text: theme.text };
    default:
      return { fill: "FFFFFF", border: theme.border, title: theme.dark, text: theme.text };
  }
}

function addBulletList(slide, items, options) {
  let cursorY = options.y;
  const bulletColor = options.bulletColor || options.accentColor;
  const fontSize = options.fontSize ?? 14.2;
  const width = options.w - 0.18;

  for (const item of items || []) {
    const textHeight = Math.max(
      0.3,
      measureTextHeight(item, fontSize, width - 0.1, options.fontFace || BODY_FONT, 1.18) + 0.02
    );
    slide.addShape(PptxGenJS.ShapeType.ellipse, {
      x: options.x + 0.02,
      y: cursorY + 0.11,
      w: 0.08,
      h: 0.08,
      fill: { color: bulletColor },
      line: { color: bulletColor, transparency: 100 },
    });
    slide.addText(item, {
      x: options.x + 0.16,
      y: cursorY,
      w: width,
      h: textHeight,
      fontFace: options.fontFace || BODY_FONT,
      fontSize,
      color: options.color,
      margin: 0,
      valign: "top",
    });
    cursorY += textHeight + (options.gap ?? 0.08);
  }

  return cursorY;
}

function addLogoChip(slide, theme, x = 10.95, y = 0.56) {
  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w: 1.6,
    h: 0.52,
    rectRadius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: "FFFFFF", transparency: 100 },
    shadow: safeOuterShadow(theme.dark, 0.12, 45, 2, 1),
  });
  slide.addImage({
    path: LOGO_PATH,
    ...imageSizingContain(LOGO_PATH, x + 0.13, y + 0.1, 1.34, 0.28),
  });
}

function addChrome(slide, deck, slideNumber, sectionLabel) {
  const { theme } = deck;
  slide.background = { color: theme.bg };

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0,
    y: 0,
    w: PAGE_W,
    h: 0.42,
    fill: { color: theme.dark },
    line: { color: theme.dark, transparency: 100 },
  });
  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0,
    y: 0.42,
    w: PAGE_W,
    h: 0.06,
    fill: { color: theme.gold },
    line: { color: theme.gold, transparency: 100 },
  });

  addLogoChip(slide, theme);

  slide.addText(sectionLabel.toUpperCase(), {
    x: 0.78,
    y: 0.67,
    w: 2.6,
    h: 0.22,
    fontFace: BODY_FONT,
    fontSize: 9,
    color: theme.gold,
    bold: true,
    charSpace: 1.5,
    margin: 0,
  });
  slide.addText(deck.shortName, {
    x: 0.78,
    y: 7.05,
    w: 4.6,
    h: 0.18,
    fontFace: BODY_FONT,
    fontSize: 9,
    color: theme.muted,
    margin: 0,
  });
  slide.addText(String(slideNumber).padStart(2, "0"), {
    x: 12.05,
    y: 7.02,
    w: 0.55,
    h: 0.2,
    fontFace: BODY_FONT,
    fontSize: 9,
    color: theme.muted,
    bold: true,
    align: "right",
    margin: 0,
  });
}

function addSlideTitle(slide, deck, spec) {
  const titleX = 0.78;
  const titleY = 0.95;
  const titleW = 8.6;
  const titleH = Math.min(
    1.04,
    Math.max(0.6, measureTextHeight(spec.title, 24, titleW, HEAD_FONT, 1.08) + 0.05)
  );
  addFittedText(slide, spec.title, {
    x: titleX,
    y: titleY,
    w: titleW,
    h: titleH,
    fontFace: HEAD_FONT,
    fontSize: 24,
    minFontSize: 20,
    color: deck.theme.dark,
    margin: 0,
  });
  const leadY = titleY + titleH + 0.12;
  const leadH = Math.min(
    0.7,
    Math.max(0.3, measureTextHeight(spec.lead, 12.6, 10.45, BODY_FONT, 1.18) + 0.02)
  );
  addFittedText(slide, spec.lead, {
    x: 0.8,
    y: leadY,
    w: 10.45,
    h: leadH,
    fontFace: BODY_FONT,
    fontSize: 12.6,
    minFontSize: 11,
    color: deck.theme.muted,
    margin: 0,
  });
  return leadY + leadH + 0.2;
}

function addCard(slide, deck, card, x, y, w, h, options = {}) {
  const palette = tonePalette(deck.theme, card.tone);
  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: palette.fill },
    line: { color: palette.border, width: 1.25 },
    shadow: safeOuterShadow(deck.theme.dark, 0.1, 45, 2, 1),
  });
  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: x + 0.22,
    y: y + 0.68,
    w: 0.78,
    h: 0.04,
    fill: { color: palette.border },
    line: { color: palette.border, transparency: 100 },
  });
  addFittedText(slide, card.title, {
    x: x + 0.22,
    y: y + 0.18,
    w: w - 0.44,
    h: 0.42,
    fontFace: HEAD_FONT,
    fontSize: options.titleSize ?? 17.5,
    minFontSize: options.titleMin ?? 14.5,
    color: palette.title,
    margin: 0,
  });
  addBulletList(slide, card.items, {
    x: x + 0.22,
    y: y + (options.bulletStart ?? 0.88),
    w: w - 0.44,
    color: palette.text,
    bulletColor: palette.border,
    fontSize: options.bulletSize ?? 13.4,
    gap: options.bulletGap ?? 0.08,
  });
}

function addStatCard(slide, deck, stat, x, y, w, h, index) {
  const fillColor = index % 2 === 0 ? "FFFFFF" : deck.theme.warm;
  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fillColor },
    line: { color: deck.theme.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
  });
  addFittedText(slide, stat.value, {
    x: x + 0.18,
    y: y + 0.18,
    w: w - 0.36,
    h: 0.52,
    fontFace: HEAD_FONT,
    fontSize: 22,
    minFontSize: 16,
    color: deck.theme.gold,
    align: "center",
    margin: 0,
  });
  addFittedText(slide, stat.label, {
    x: x + 0.18,
    y: y + 0.78,
    w: w - 0.36,
    h: 0.3,
    fontFace: BODY_FONT,
    fontSize: 10.8,
    minFontSize: 9.2,
    color: deck.theme.text,
    align: "center",
    margin: 0,
  });
}

function finishSlide(slide, pptx) {
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function renderCoverSlide(pptx, deck) {
  const slide = pptx.addSlide();
  const { theme, cover } = deck;
  slide.background = { color: theme.dark };

  slide.addShape(PptxGenJS.ShapeType.ellipse, {
    x: 8.9,
    y: -0.65,
    w: 4.4,
    h: 4.4,
    fill: { color: theme.gold, transparency: 78 },
    line: { color: theme.gold, transparency: 100 },
  });
  slide.addShape(PptxGenJS.ShapeType.ellipse, {
    x: 9.55,
    y: 3.2,
    w: 3.6,
    h: 3.6,
    fill: { color: theme.blue, transparency: 82 },
    line: { color: theme.blue, transparency: 100 },
  });
  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 8.2,
    y: 1.02,
    w: 4.35,
    h: 5.08,
    rectRadius: 0.09,
    fill: { color: "FFFFFF", transparency: 4 },
    line: { color: theme.gold, width: 1.2, transparency: 18 },
    shadow: safeOuterShadow("000000", 0.16, 45, 2, 1),
  });

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 0.82,
    y: 0.72,
    w: 2.05,
    h: 0.6,
    rectRadius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: "FFFFFF", transparency: 100 },
  });
  slide.addImage({
    path: LOGO_PATH,
    ...imageSizingContain(LOGO_PATH, 0.98, 0.84, 1.72, 0.28),
  });

  slide.addText(cover.eyebrow.toUpperCase(), {
    x: 0.84,
    y: 1.6,
    w: 5.4,
    h: 0.22,
    fontFace: BODY_FONT,
    fontSize: 9,
    color: theme.goldLight,
    bold: true,
    charSpace: 1.4,
    margin: 0,
  });
  addFittedText(slide, cover.title, {
    x: 0.84,
    y: 1.95,
    w: 6.7,
    h: 1.2,
    fontFace: HEAD_FONT,
    fontSize: 30,
    minFontSize: 24,
    color: "FFFFFF",
    margin: 0,
  });
  addFittedText(slide, cover.subtitle, {
    x: 0.86,
    y: 3.2,
    w: 6.1,
    h: 1.12,
    fontFace: BODY_FONT,
    fontSize: 15,
    minFontSize: 12,
    color: "F4F1EB",
    margin: 0,
  });

  let chipX = 0.84;
  for (const chip of cover.chips) {
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: chipX,
      y: 4.7,
      w: 1.95,
      h: 0.44,
      rectRadius: 0.08,
      fill: { color: "FFFFFF", transparency: 90 },
      line: { color: "FFFFFF", transparency: 72, width: 1 },
    });
    slide.addText(chip, {
      x: chipX + 0.1,
      y: 4.84,
      w: 1.75,
      h: 0.15,
      fontFace: BODY_FONT,
      fontSize: 9.5,
      color: "FFFFFF",
      bold: true,
      align: "center",
      margin: 0,
    });
    chipX += 2.08;
  }

  addFittedText(slide, cover.panelTitle, {
    x: 8.5,
    y: 1.34,
    w: 3.4,
    h: 0.4,
    fontFace: HEAD_FONT,
    fontSize: 18,
    minFontSize: 15,
    color: theme.dark,
    margin: 0,
  });
  addBulletList(slide, cover.panelItems, {
    x: 8.48,
    y: 1.92,
    w: 3.55,
    color: theme.text,
    bulletColor: theme.gold,
    fontSize: 12.6,
    gap: 0.1,
  });

  slide.addText("Baseado no conteudo do HTML publicado no projeto.", {
    x: 0.86,
    y: 6.95,
    w: 4.6,
    h: 0.18,
    fontFace: BODY_FONT,
    fontSize: 9,
    color: "D8D2C6",
    margin: 0,
  });
  // Cover art intentionally layers background ellipses behind the content.
}

function renderCardsSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  addChrome(slide, deck, slideNumber, spec.section);
  const contentY = addSlideTitle(slide, deck, spec);

  const cards = spec.cards || [];
  const count = cards.length;
  const columns = spec.columns || Math.min(count, 3);
  const rows = Math.ceil(count / columns);
  const gapX = 0.22;
  const gapY = 0.22;
  const regionX = 0.78;
  const regionY = contentY;
  const regionW = 11.78;
  const regionH = rows > 1 ? 4.55 : 4.38;
  const cardW = (regionW - gapX * (columns - 1)) / columns;
  const cardH = (regionH - gapY * (rows - 1)) / rows;

  cards.forEach((card, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = regionX + col * (cardW + gapX);
    const y = regionY + row * (cardH + gapY);
    addCard(slide, deck, card, x, y, cardW, cardH);
  });

  finishSlide(slide, pptx);
}

function renderStatsSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  addChrome(slide, deck, slideNumber, spec.section);
  const contentY = addSlideTitle(slide, deck, spec);

  const stats = spec.stats || [];
  const gap = 0.18;
  const statsY = contentY;
  const statW = (11.78 - gap * (stats.length - 1)) / stats.length;
  stats.forEach((stat, index) => {
    addStatCard(slide, deck, stat, 0.78 + index * (statW + gap), statsY, statW, 1.18, index);
  });

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 0.78,
    y: 3.62,
    w: 7.15,
    h: 2.82,
    rectRadius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: deck.theme.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
  });
  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 8.13,
    y: 3.62,
    w: 4.4,
    h: 2.82,
    rectRadius: 0.08,
    fill: { color: deck.theme.warm },
    line: { color: deck.theme.gold, width: 1.1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
  });

  addFittedText(slide, spec.bulletsTitle || "Leituras-chave", {
    x: 1.02,
    y: 3.9,
    w: 3.6,
    h: 0.34,
    fontFace: HEAD_FONT,
    fontSize: 17,
    minFontSize: 14,
    color: deck.theme.dark,
    margin: 0,
  });
  addBulletList(slide, spec.bullets, {
    x: 1.0,
    y: 4.34,
    w: 6.55,
    color: deck.theme.text,
    bulletColor: deck.theme.gold,
    fontSize: 13.5,
    gap: 0.1,
  });

  addFittedText(slide, spec.callout.title, {
    x: 8.38,
    y: 3.92,
    w: 3.88,
    h: 0.34,
    fontFace: HEAD_FONT,
    fontSize: 17,
    minFontSize: 14,
    color: deck.theme.dark,
    margin: 0,
  });
  addFittedText(slide, spec.callout.body, {
    x: 8.38,
    y: 4.38,
    w: 3.82,
    h: 1.55,
    fontFace: BODY_FONT,
    fontSize: 13,
    minFontSize: 10.8,
    color: deck.theme.text,
    margin: 0,
  });

  finishSlide(slide, pptx);
}

function renderProcessSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  addChrome(slide, deck, slideNumber, spec.section);
  const contentY = addSlideTitle(slide, deck, spec);

  const steps = spec.steps || [];
  const gap = 0.18;
  const stepY = contentY + 0.18;
  const stepW = (11.78 - gap * (steps.length - 1)) / steps.length;

  steps.forEach((step, index) => {
    const x = 0.78 + index * (stepW + gap);
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x,
      y: stepY,
      w: stepW,
      h: 2.28,
      rectRadius: 0.08,
      fill: { color: "FFFFFF" },
      line: { color: deck.theme.border, width: 1 },
      shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
    });
    slide.addShape(PptxGenJS.ShapeType.ellipse, {
      x: x + stepW / 2 - 0.22,
      y: stepY - 0.34,
      w: 0.44,
      h: 0.44,
      fill: { color: deck.theme.dark },
      line: { color: deck.theme.dark, transparency: 100 },
    });
    slide.addText(String(index + 1), {
      x: x + stepW / 2 - 0.12,
      y: 2.31,
      w: 0.24,
      h: 0.12,
      fontFace: BODY_FONT,
      fontSize: 9.8,
      color: "FFFFFF",
      bold: true,
      align: "center",
      margin: 0,
    });
    addFittedText(slide, step.title, {
      x: x + 0.18,
      y: stepY + 0.22,
      w: stepW - 0.36,
      h: 0.4,
      fontFace: HEAD_FONT,
      fontSize: 16.2,
      minFontSize: 13.6,
      color: deck.theme.dark,
      align: "center",
      margin: 0,
    });
    addBulletList(slide, step.items, {
      x: x + 0.18,
      y: stepY + 0.8,
      w: stepW - 0.36,
      color: deck.theme.text,
      bulletColor: deck.theme.gold,
      fontSize: 12.8,
      gap: 0.09,
    });
  });

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 0.78,
    y: 5.22,
    w: 11.78,
    h: 1.3,
    rectRadius: 0.08,
    fill: { color: deck.theme.warm },
    line: { color: deck.theme.gold, width: 1.1 },
  });
  addFittedText(slide, spec.summaryTitle, {
    x: 1.02,
    y: 5.48,
    w: 3.2,
    h: 0.28,
    fontFace: HEAD_FONT,
    fontSize: 16.4,
    minFontSize: 13.8,
    color: deck.theme.dark,
    margin: 0,
  });
  addBulletList(slide, spec.summaryItems, {
    x: 1.0,
    y: 5.86,
    w: 11.05,
    color: deck.theme.text,
    bulletColor: deck.theme.gold,
    fontSize: 12.8,
    gap: 0.08,
  });

  finishSlide(slide, pptx);
}

function renderGallerySlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  addChrome(slide, deck, slideNumber, spec.section);
  const contentY = addSlideTitle(slide, deck, spec);

  const cards = spec.cards || [];
  const cardGap = 0.2;
  const cardW = (11.78 - cardGap * (cards.length - 1)) / cards.length;
  cards.forEach((card, index) => {
    addCard(
      slide,
      deck,
      card,
      0.78 + index * (cardW + cardGap),
      contentY,
      cardW,
      1.75,
      {
        titleSize: 15,
        titleMin: 12.4,
        bulletStart: 0.78,
        bulletSize: 11,
        bulletGap: 0.05,
      }
    );
  });

  const images = spec.images || [];
  const imageGap = 0.22;
  const imageY = contentY + 2.06;
  const imageH = images.length >= 3 ? 1.84 : 1.98;
  const imageW =
    images.length === 1
      ? 11.78
      : (11.78 - imageGap * (images.length - 1)) / images.length;

  images.forEach((image, index) => {
    const x = 0.78 + index * (imageW + imageGap);
    const fullPath = absPath(image.path);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Imagem nao encontrada: ${fullPath}`);
    }
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x,
      y: imageY,
      w: imageW,
      h: imageH,
      rectRadius: 0.08,
      fill: { color: "FFFFFF" },
      line: { color: deck.theme.border, width: 1 },
      shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
    });
    slide.addImage({
      path: fullPath,
      ...imageSizingContain(fullPath, x + 0.12, imageY + 0.12, imageW - 0.24, imageH - 0.56),
    });
    slide.addText(image.caption, {
      x: x + 0.14,
      y: imageY + imageH - 0.3,
      w: imageW - 0.28,
      h: 0.18,
      fontFace: BODY_FONT,
      fontSize: 9.2,
      color: deck.theme.muted,
      align: "center",
      margin: 0,
    });
  });

  finishSlide(slide, pptx);
}

function createDeck(deck) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Codex";
  pptx.company = "Alta Vista Investimentos";
  pptx.subject = deck.cover.title;
  pptx.title = deck.cover.title;
  pptx.lang = "pt-BR";
  pptx.theme = {
    headFontFace: HEAD_FONT,
    bodyFontFace: BODY_FONT,
    lang: "pt-BR",
  };
  return pptx;
}

async function buildDeck(deck) {
  const pptx = createDeck(deck);
  renderCoverSlide(pptx, deck);

  deck.slides.forEach((spec, index) => {
    const slideNumber = index + 2;
    switch (spec.type) {
      case "cards":
        renderCardsSlide(pptx, deck, spec, slideNumber);
        break;
      case "stats":
        renderStatsSlide(pptx, deck, spec, slideNumber);
        break;
      case "process":
        renderProcessSlide(pptx, deck, spec, slideNumber);
        break;
      case "gallery":
        renderGallerySlide(pptx, deck, spec, slideNumber);
        break;
      default:
        throw new Error(`Tipo de slide nao suportado: ${spec.type}`);
    }
  });

  const outputPath = path.join(OUTPUT_DIR, deck.publishedFile);
  await pptx.writeFile({ fileName: outputPath });
  return outputPath;
}

async function main() {
  ensureDir(OUTPUT_DIR);
  for (const deck of decks) {
    const file = await buildDeck(deck);
    console.log(`Gerado: ${path.relative(ROOT, file)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
