"use strict";

const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");
PptxGenJS.ShapeType = new PptxGenJS().ShapeType;

const { imageSizingContain, imageSizingCrop } = require("./pptxgenjs_helpers/image");
const { safeOuterShadow } = require("./pptxgenjs_helpers/util");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers/layout");
const decks = require("./content");

const ROOT = path.resolve(__dirname, "..", "..");
const OUTPUT_DIR = path.join(ROOT, "materials", "presentations");
const LOGO_PATH = path.join(ROOT, "assets", "logos", "logo-altavista.svg");
const PAGE_W = 13.333;
const PAGE_H = 7.5;
const filterArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlyIds = filterArg
  ? new Set(
      filterArg
        .replace("--only=", "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    )
  : null;
const suffixArg = process.argv.find((arg) => arg.startsWith("--suffix="));
const outputSuffix = suffixArg ? suffixArg.replace("--suffix=", "") : "";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function absPath(relativePath) {
  return path.join(ROOT, relativePath);
}

function decodeHtmlEntities(text) {
  return String(text || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) =>
      String.fromCharCode(parseInt(code, 16))
    );
}

function normalizeKey(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function extractAttribute(tag, attributeName) {
  const match = tag.match(
    new RegExp(
      `${attributeName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
      "i"
    )
  );
  return decodeHtmlEntities(match?.[1] || match?.[2] || match?.[3] || "");
}

function loadHtmlImages(deck) {
  if (deck._htmlImages) {
    return deck._htmlImages;
  }

  const htmlPath = absPath(deck.htmlFile);
  const html = fs.readFileSync(htmlPath, "utf8");
  const tags = html.match(/<img\b[^>]*>/gi) || [];
  const htmlDir = path.dirname(htmlPath);

  deck._htmlImages = tags
    .map((tag, index) => {
      const src = extractAttribute(tag, "src");
      const alt = extractAttribute(tag, "alt");
      return {
        index,
        src,
        alt,
        normalizedAlt: normalizeKey(alt),
        htmlDir,
      };
    })
    .filter((image) => image.src && !image.src.includes("assets/logos/"));

  return deck._htmlImages;
}

function resolveImageSource(deck, imageSpec) {
  if (!imageSpec) {
    throw new Error("Imagem nao informada.");
  }

  if (imageSpec.path) {
    const fullPath = absPath(imageSpec.path);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Imagem nao encontrada: ${fullPath}`);
    }
    return { kind: "path", value: fullPath, alt: imageSpec.caption || "" };
  }

  if (imageSpec.htmlAlt || Number.isInteger(imageSpec.htmlIndex)) {
    const htmlImages = loadHtmlImages(deck);
    let match = null;

    if (Number.isInteger(imageSpec.htmlIndex)) {
      match = htmlImages[imageSpec.htmlIndex] || null;
    } else {
      const target = normalizeKey(imageSpec.htmlAlt);
      match =
        htmlImages.find((image) => image.normalizedAlt === target) ||
        htmlImages.find((image) => image.normalizedAlt.includes(target)) ||
        htmlImages.find((image) => target.includes(image.normalizedAlt)) ||
        null;
    }

    if (!match) {
      throw new Error(
        `Imagem do HTML nao encontrada para referencia: ${imageSpec.htmlAlt ?? imageSpec.htmlIndex}`
      );
    }

    if (match.src.startsWith("data:")) {
      return { kind: "data", value: match.src, alt: match.alt };
    }

    const fullPath = path.resolve(match.htmlDir, match.src);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Imagem nao encontrada: ${fullPath}`);
    }

    return { kind: "path", value: fullPath, alt: match.alt };
  }

  throw new Error("Imagem sem path, htmlAlt ou htmlIndex.");
}

function addImage(slide, deck, imageSpec, x, y, w, h, mode = "contain") {
  const source = resolveImageSource(deck, imageSpec);
  const sizing =
    mode === "crop"
      ? imageSizingCrop(source.value, x, y, w, h)
      : imageSizingContain(source.value, x, y, w, h);

  if (source.kind === "data") {
    slide.addImage({ data: source.value, ...sizing });
  } else {
    slide.addImage({ path: source.value, ...sizing });
  }
}

function titleFont(deck) {
  return deck.fonts?.title || "Georgia";
}

function bodyFont(deck) {
  return deck.fonts?.body || "Arial";
}

function baseSlide(slide, deck) {
  slide.background = { color: deck.theme.bg };

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0,
    y: 0,
    w: PAGE_W,
    h: 0.34,
    fill: { color: deck.theme.dark },
    line: { color: deck.theme.dark, transparency: 100 },
  });

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0,
    y: 0.34,
    w: PAGE_W,
    h: 0.05,
    fill: { color: deck.theme.gold },
    line: { color: deck.theme.gold, transparency: 100 },
  });
}

function addLogo(slide, deck, x = 0.82, y = 0.55, scale = 1) {
  const outerW = 2.42 * scale;
  const outerH = 0.72 * scale;
  const innerX = x + 0.18 * scale;
  const innerY = y + 0.13 * scale;
  const innerW = 2.02 * scale;
  const innerH = 0.4 * scale;

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w: outerW,
    h: outerH,
    rectRadius: 0.08,
    fill: { color: "FFFFFF", transparency: 5 },
    line: { color: "FFFFFF", transparency: 100 },
    shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
  });

  slide.addImage({
    path: LOGO_PATH,
    ...imageSizingContain(LOGO_PATH, innerX, innerY, innerW, innerH),
  });
}

function addSectionLabel(slide, deck, label, slideNumber) {
  slide.addText(String(label || "").toUpperCase(), {
    x: 0.84,
    y: 0.78,
    w: 4.5,
    h: 0.18,
    fontFace: bodyFont(deck),
    fontSize: 9,
    bold: true,
    color: deck.theme.gold,
    charSpace: 1.4,
    margin: 0,
  });

  slide.addText(String(slideNumber).padStart(2, "0"), {
    x: 12.2,
    y: 7.0,
    w: 0.45,
    h: 0.18,
    fontFace: bodyFont(deck),
    fontSize: 9,
    bold: true,
    color: deck.theme.muted,
    align: "right",
    margin: 0,
  });

  slide.addText(deck.shortName, {
    x: 0.84,
    y: 7.0,
    w: 3.6,
    h: 0.18,
    fontFace: bodyFont(deck),
    fontSize: 8.5,
    color: deck.theme.muted,
    margin: 0,
  });
}

function addTitle(slide, deck, title, kicker) {
  slide.addText(title, {
    x: 0.84,
    y: 1.08,
    w: 6.15,
    h: 0.95,
    fontFace: titleFont(deck),
    fontSize: 23,
    color: deck.theme.dark,
    bold: false,
    margin: 0,
    fit: "resize",
  });

  if (kicker) {
    slide.addText(kicker, {
      x: 0.86,
      y: 2.05,
      w: 5.6,
      h: 0.74,
      fontFace: bodyFont(deck),
      fontSize: 12.5,
      color: deck.theme.muted,
      margin: 0,
      valign: "mid",
      fit: "shrink",
    });
  }
}

function addNotes(slide, notes) {
  if (notes) {
    slide.addNotes(notes);
  }
}

function toneFill(deck, tone) {
  switch (tone) {
    case "gold":
      return { fill: "FDF6E8", border: deck.theme.gold };
    case "blue":
      return { fill: "EAF4FB", border: deck.theme.navy };
    case "green":
      return { fill: "EEF7F1", border: "5B9A74" };
    case "red":
      return { fill: "FDECEB", border: "B75449" };
    case "warm":
      return { fill: deck.theme.warm, border: deck.theme.gold };
    case "surface":
    default:
      return { fill: "FFFFFF", border: deck.theme.border };
  }
}

function addTag(slide, deck, text, x, y, tone = "gold") {
  const palette = toneFill(deck, tone);
  slide.addText(text, {
    x,
    y,
    w: 2.1,
    h: 0.14,
    fontFace: bodyFont(deck),
    fontSize: 7.6,
    bold: true,
    color: palette.border,
    margin: 0,
  });
}

function addContentCard(slide, deck, card, x, y, w, h) {
  const palette = toneFill(deck, card.tone);
  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: palette.fill },
    line: { color: palette.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.06, 45, 2, 1),
  });

  if (card.tag) {
    addTag(slide, deck, card.tag, x + 0.16, y + 0.16, card.tone);
  }

  slide.addText(card.title, {
    x: x + 0.16,
    y: y + (card.tag ? 0.36 : 0.22),
    w: w - 0.32,
    h: 0.38,
    fontFace: titleFont(deck),
    fontSize: 16,
    color: deck.theme.dark,
    margin: 0,
    fit: "resize",
  });

  slide.addText(card.body, {
    x: x + 0.16,
    y: y + (card.tag ? 0.82 : 0.7),
    w: w - 0.32,
    h: h - (card.tag ? 0.98 : 0.86),
    fontFace: bodyFont(deck),
    fontSize: 11.4,
    color: deck.theme.text,
    margin: 0,
    fit: "shrink",
  });
}

function finishSlide(slide, pptx) {
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function renderCoverSlide(pptx, deck) {
  const slide = pptx.addSlide();
  slide.background = { color: deck.theme.dark };

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0,
    y: 0,
    w: PAGE_W,
    h: PAGE_H,
    fill: {
      color: deck.theme.dark,
      transparency: 0,
    },
    line: { color: deck.theme.dark, transparency: 100 },
  });

  slide.addShape(PptxGenJS.ShapeType.ellipse, {
    x: 8.7,
    y: -0.3,
    w: 4.6,
    h: 4.6,
    fill: { color: deck.theme.gold, transparency: 80 },
    line: { color: deck.theme.gold, transparency: 100 },
  });

  slide.addShape(PptxGenJS.ShapeType.ellipse, {
    x: 9.4,
    y: 3.15,
    w: 3.2,
    h: 3.2,
    fill: { color: deck.theme.goldLight, transparency: 88 },
    line: { color: deck.theme.goldLight, transparency: 100 },
  });

  addLogo(slide, deck, 0.82, 0.78, 1.6);

  slide.addText(deck.cover.eyebrow.toUpperCase(), {
    x: 0.86,
    y: 2.58,
    w: 5.6,
    h: 0.18,
    fontFace: bodyFont(deck),
    fontSize: 9,
    color: deck.theme.goldLight,
    bold: true,
    charSpace: 1.3,
    margin: 0,
  });

  slide.addText(deck.cover.titleRuns || deck.cover.title, {
    x: 0.86,
    y: 2.94,
    w: 8.9,
    h: 1.22,
    fontFace: titleFont(deck),
    fontSize: 31,
    color: "FFFFFF",
    margin: 0,
    fit: "resize",
  });

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0.88,
    y: 4.68,
    w: 1.2,
    h: 0.05,
    fill: { color: deck.theme.gold },
    line: { color: deck.theme.gold, transparency: 100 },
  });

  slide.addText("Alta Vista Investimentos | Material de apoio", {
    x: 0.86,
    y: 6.95,
    w: 4.1,
    h: 0.18,
    fontFace: bodyFont(deck),
    fontSize: 8.5,
    color: "D8D2C6",
    margin: 0,
  });

  addNotes(slide, deck.cover.notes);
}

function renderStatementSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 0.84,
    y: 1.35,
    w: 11.68,
    h: 4.95,
    rectRadius: 0.1,
    fill: { color: deck.theme.surface },
    line: { color: deck.theme.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
  });

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x: 0.84,
    y: 1.35,
    w: 0.16,
    h: 4.95,
    fill: { color: deck.theme.gold },
    line: { color: deck.theme.gold, transparency: 100 },
  });

  slide.addText(spec.title, {
    x: 1.28,
    y: 2.08,
    w: 9.8,
    h: 1.15,
    fontFace: titleFont(deck),
    fontSize: 27,
    color: deck.theme.dark,
    margin: 0,
    fit: "resize",
    valign: "mid",
  });

  slide.addText(spec.kicker || "", {
    x: 1.3,
    y: spec.body ? 3.36 : 3.52,
    w: 8.9,
    h: spec.body ? 0.7 : 0.9,
    fontFace: bodyFont(deck),
    fontSize: spec.body ? 14 : 16,
    color: deck.theme.text,
    margin: 0,
    fit: "shrink",
  });

  if (spec.body) {
    slide.addText(spec.body, {
      x: 1.3,
      y: 4.18,
      w: 8.95,
      h: 1.28,
      fontFace: bodyFont(deck),
      fontSize: 12.2,
      color: deck.theme.muted,
      margin: 0,
      fit: "shrink",
      valign: "mid",
    });
  }

  slide.addShape(PptxGenJS.ShapeType.ellipse, {
    x: 11.18,
    y: 1.96,
    w: 0.9,
    h: 0.9,
    fill: { color: deck.theme.gold, transparency: 82 },
    line: { color: deck.theme.gold, transparency: 100 },
  });

  slide.addShape(PptxGenJS.ShapeType.ellipse, {
    x: 12.18,
    y: 3.18,
    w: 0.34,
    h: 0.34,
    fill: { color: deck.theme.navy, transparency: 88 },
    line: { color: deck.theme.navy, transparency: 100 },
  });

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderMetricsSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const metrics = spec.metrics || [];
  const gap = 0.18;
  const x0 = 0.84;
  const y0 = spec.kicker ? 2.86 : 2.55;
  const cardW = (11.68 - gap * (metrics.length - 1)) / metrics.length;

  metrics.forEach((metric, index) => {
    const x = x0 + index * (cardW + gap);
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x,
      y: y0,
      w: cardW,
      h: 2.45,
      rectRadius: 0.08,
      fill: { color: index % 2 === 0 ? "FFFFFF" : deck.theme.warm },
      line: { color: deck.theme.border, width: 1 },
      shadow: safeOuterShadow(deck.theme.dark, 0.06, 45, 2, 1),
    });

    slide.addText(metric.value, {
      x: x + 0.2,
      y: y0 + 0.54,
      w: cardW - 0.4,
      h: 0.7,
      fontFace: titleFont(deck),
      fontSize: 22,
      color: deck.theme.gold,
      align: "center",
      margin: 0,
      fit: "resize",
    });

    slide.addText(metric.label, {
      x: x + 0.18,
      y: y0 + 1.43,
      w: cardW - 0.36,
      h: 0.64,
      fontFace: bodyFont(deck),
      fontSize: 11,
      color: deck.theme.text,
      align: "center",
      margin: 0,
      fit: "shrink",
    });
  });

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderCardsSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const cards = spec.cards || [];
  const gap = 0.22;
  const columns = cards.length === 3 ? 3 : 2;
  const rows = Math.ceil(cards.length / columns);
  const regionX = 0.84;
  const regionY = 2.2;
  const regionW = 11.68;
  const regionH = rows > 1 ? 4.45 : 4.55;
  const cardW = (regionW - gap * (columns - 1)) / columns;
  const cardH = (regionH - gap * (rows - 1)) / rows;

  cards.forEach((card, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    addContentCard(
      slide,
      deck,
      card,
      regionX + col * (cardW + gap),
      regionY + row * (cardH + gap),
      cardW,
      cardH
    );
  });

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderTableSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const headers = spec.headers || [];
  const rows = spec.rows || [];
  const columns = headers.length;
  const x = 0.84;
  const y = 2.18;
  const w = 11.68;
  const footnoteH = spec.footnote ? 0.8 : 0;
  const h = 4.7 - footnoteH;
  const colW = w / columns;
  const headerH = 0.44;
  const rowH = (h - headerH) / Math.max(rows.length, 1);

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    fill: { color: "FFFFFF" },
    line: { color: deck.theme.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.05, 45, 2, 1),
  });

  slide.addShape(PptxGenJS.ShapeType.rect, {
    x,
    y,
    w,
    h: headerH,
    fill: { color: deck.theme.dark },
    line: { color: deck.theme.dark, transparency: 100 },
  });

  headers.forEach((header, index) => {
    slide.addText(header, {
      x: x + index * colW + 0.12,
      y: y + 0.14,
      w: colW - 0.24,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 8.5,
      bold: true,
      color: "FFFFFF",
      margin: 0,
      fit: "shrink",
    });
  });

  rows.forEach((row, rowIndex) => {
    const rowY = y + headerH + rowIndex * rowH;
    if (rowIndex > 0) {
      slide.addShape(PptxGenJS.ShapeType.line, {
        x,
        y: rowY,
        w,
        h: 0,
        line: { color: deck.theme.border, width: 1 },
      });
    }

    row.forEach((cell, cellIndex) => {
      if (cellIndex > 0) {
        slide.addShape(PptxGenJS.ShapeType.line, {
          x: x + cellIndex * colW,
          y: rowY,
          w: 0,
          h: rowH,
          line: { color: deck.theme.border, width: 1 },
        });
      }

      slide.addText(String(cell), {
        x: x + cellIndex * colW + 0.12,
        y: rowY + 0.1,
        w: colW - 0.24,
        h: rowH - 0.18,
        fontFace: bodyFont(deck),
        fontSize: columns === 2 ? 10.6 : 9.5,
        color: deck.theme.text,
        margin: 0,
        fit: "shrink",
        valign: "mid",
      });
    });
  });

  if (spec.footnote) {
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: 0.84,
      y: 6.18,
      w: 11.68,
      h: 0.52,
      rectRadius: 0.08,
      fill: { color: deck.theme.warm },
      line: { color: deck.theme.gold, width: 1 },
    });
    slide.addText(spec.footnote, {
      x: 1.02,
      y: 6.34,
      w: 11.3,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 9.2,
      color: deck.theme.text,
      margin: 0,
      fit: "shrink",
      align: "center",
    });
  }

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderStepsSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const steps = spec.steps || [];
  const gap = 0.22;
  const x = 0.84;
  const y = 2.28;
  const w = (11.68 - gap * (steps.length - 1)) / steps.length;

  steps.forEach((step, index) => {
    const cardX = x + index * (w + gap);
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: cardX,
      y,
      w,
      h: 4.08,
      rectRadius: 0.08,
      fill: { color: "FFFFFF" },
      line: { color: deck.theme.border, width: 1 },
      shadow: safeOuterShadow(deck.theme.dark, 0.05, 45, 2, 1),
    });

    slide.addText(step.number || String(index + 1), {
      x: cardX + 0.16,
      y: y + 0.14,
      w: 0.24,
      h: 0.14,
      fontFace: titleFont(deck),
      fontSize: 12,
      bold: true,
      color: deck.theme.gold,
      margin: 0,
    });

    slide.addText(step.title, {
      x: cardX + 0.16,
      y: y + 0.42,
      w: w - 0.32,
      h: 0.52,
      fontFace: titleFont(deck),
      fontSize: 16,
      color: deck.theme.dark,
      margin: 0,
      fit: "resize",
    });

    slide.addText(step.body, {
      x: cardX + 0.16,
      y: y + 1.1,
      w: w - 0.32,
      h: 2.7,
      fontFace: bodyFont(deck),
      fontSize: 11.2,
      color: deck.theme.text,
      margin: 0,
      fit: "shrink",
    });
  });

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderDecisionSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);

  slide.addText(spec.title, {
    x: 0.84,
    y: 1.08,
    w: 7.2,
    h: 0.76,
    fontFace: titleFont(deck),
    fontSize: 21,
    color: deck.theme.dark,
    margin: 0,
    fit: "resize",
  });

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 1.76,
    y: 1.9,
    w: 9.8,
    h: 0.42,
    rectRadius: 0.2,
    fill: { color: deck.theme.dark },
    line: { color: deck.theme.dark, transparency: 100 },
  });
  slide.addText(spec.question, {
    x: 1.94,
    y: 2.04,
    w: 9.45,
    h: 0.1,
    fontFace: bodyFont(deck),
    fontSize: 10,
    bold: true,
    color: "FFFFFF",
    align: "center",
    margin: 0,
  });

  addContentCard(slide, deck, spec.topLeft, 0.84, 2.54, 5.62, 1.28);
  addContentCard(slide, deck, spec.topRight, 6.9, 2.54, 5.62, 1.28);

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 2.14,
    y: 3.98,
    w: 9.04,
    h: 0.34,
    rectRadius: 0.08,
    fill: { color: "FFF8EC" },
    line: { color: deck.theme.border, width: 1 },
  });
  slide.addText(spec.middleLabel, {
    x: 2.28,
    y: 4.1,
    w: 8.76,
    h: 0.08,
    fontFace: bodyFont(deck),
    fontSize: 8.6,
    bold: true,
    color: deck.theme.dark,
    align: "center",
    margin: 0,
  });

  addContentCard(
    slide,
    deck,
    { ...spec.middleLeft, tone: "surface" },
    0.84,
    4.5,
    5.62,
    0.94
  );
  addContentCard(
    slide,
    deck,
    { ...spec.middleRight, tone: "surface" },
    6.9,
    4.5,
    5.62,
    0.94
  );

  addContentCard(slide, deck, spec.bottomLeft, 0.84, 5.68, 5.62, 1.1);
  addContentCard(slide, deck, spec.bottomRight, 6.9, 5.68, 5.62, 1.1);

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderEstateOverviewSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.48, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 0.84,
    y: 2.12,
    w: 5.3,
    h: 4.58,
    rectRadius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: deck.theme.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.05, 45, 2, 1),
  });

  slide.addText(spec.visualTitle || "Ativos de raiz americana", {
    x: 1.08,
    y: 2.4,
    w: 4.82,
    h: 0.46,
    fontFace: titleFont(deck),
    fontSize: 15,
    color: deck.theme.dark,
    margin: 0,
    align: "center",
    fit: "resize",
  });

  slide.addShape(PptxGenJS.ShapeType.line, {
    x: 1.24,
    y: 3.32,
    w: 3.82,
    h: 0,
    line: { color: deck.theme.border, width: 1, dash: "dash" },
  });
  slide.addShape(PptxGenJS.ShapeType.line, {
    x: 1.24,
    y: 5.18,
    w: 3.82,
    h: 0,
    line: { color: deck.theme.border, width: 1, dash: "dash" },
  });
  slide.addShape(PptxGenJS.ShapeType.line, {
    x: 1.24,
    y: 6.06,
    w: 3.82,
    h: 0,
    line: { color: deck.theme.border, width: 1, dash: "dash" },
  });

  slide.addText("Estate Tax\n18% a 40%", {
    x: 1.1,
    y: 4.05,
    w: 1.18,
    h: 0.62,
    fontFace: bodyFont(deck),
    fontSize: 11.5,
    bold: true,
    color: deck.theme.text,
    margin: 0,
    align: "left",
    fit: "shrink",
  });

  slide.addText("Isencao\nUS$ 60 mil", {
    x: 1.08,
    y: 5.34,
    w: 1.26,
    h: 0.56,
    fontFace: bodyFont(deck),
    fontSize: 11.2,
    bold: true,
    color: deck.theme.text,
    margin: 0,
    align: "left",
    fit: "shrink",
  });

  const towerX = 2.72;
  const towerBaseY = 3.56;
  const towerGap = 0.1;
  const wingW = 0.68;
  const centerW = 0.98;
  const baseH = 2.34;
  const exemptH = 0.84;
  const taxableH = baseH - exemptH;

  [
    { x: towerX, w: wingW, h: 1.92 },
    { x: towerX + wingW + towerGap, w: centerW, h: 2.34 },
    { x: towerX + wingW + towerGap + centerW + towerGap, w: wingW, h: 1.92 },
  ].forEach((tower) => {
    const topY = towerBaseY + (baseH - tower.h);
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: tower.x,
      y: topY,
      w: tower.w,
      h: tower.h - Math.min(exemptH, tower.h),
      rectRadius: 0.03,
      fill: { color: "D8663B" },
      line: { color: deck.theme.dark, width: 1 },
    });
    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: tower.x,
      y: towerBaseY + taxableH,
      w: tower.w,
      h: Math.min(exemptH, tower.h),
      rectRadius: 0.03,
      fill: { color: "74B455" },
      line: { color: deck.theme.dark, width: 1 },
    });
  });

  slide.addShape(PptxGenJS.ShapeType.line, {
    x: 2.54,
    y: 5.18,
    w: 2.54,
    h: 0,
    line: { color: deck.theme.border, width: 1, dash: "dash" },
  });

  slide.addText(spec.leftCaption || "Patrimonio exposto em ativos de raiz americana", {
    x: 2.3,
    y: 6.18,
    w: 3.08,
    h: 0.26,
    fontFace: bodyFont(deck),
    fontSize: 8.6,
    color: deck.theme.muted,
    margin: 0,
    align: "center",
    fit: "shrink",
  });

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 6.48,
    y: 2.48,
    w: 6.04,
    h: 3.74,
    rectRadius: 0.16,
    fill: { color: "FFFFFF" },
    line: { color: deck.theme.border, width: 1.25 },
    shadow: safeOuterShadow(deck.theme.dark, 0.05, 45, 2, 1),
  });

  slide.addText(spec.calloutTitle || "Estate Tax: regra-base para brasileiros", {
    x: 6.86,
    y: 2.82,
    w: 5.28,
    h: 0.38,
    fontFace: titleFont(deck),
    fontSize: 17,
    color: deck.theme.dark,
    margin: 0,
    align: "center",
    fit: "resize",
  });

  slide.addText(
    spec.calloutBody ||
      "Incide sobre ativos de raiz americana detidos por nao residentes. A isencao e limitada a US$ 60 mil e a aliquota pode chegar a 40%.",
    {
      x: 6.92,
      y: 3.42,
      w: 5.14,
      h: 0.92,
      fontFace: bodyFont(deck),
      fontSize: 14,
      color: deck.theme.text,
      margin: 0,
      align: "center",
      fit: "shrink",
      valign: "mid",
    }
  );

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x: 6.94,
    y: 4.58,
    w: 5.12,
    h: 0.44,
    rectRadius: 0.06,
    fill: { color: "FFF0A8" },
    line: { color: "FFF0A8", transparency: 100 },
  });

  slide.addText(spec.highlightTitle || "Produtos que ajudam a afastar esse risco", {
    x: 7.02,
    y: 4.72,
    w: 4.96,
    h: 0.12,
    fontFace: bodyFont(deck),
    fontSize: 11.8,
    bold: true,
    color: deck.theme.dark,
    margin: 0,
    align: "center",
    fit: "shrink",
  });

  slide.addText(
    spec.highlightBody ||
      "Mutual Funds Irlanda/Luxemburgo, bonds com emissao fora dos EUA e Treasuries.",
    {
      x: 6.98,
      y: 5.12,
      w: 5.04,
      h: 0.62,
      fontFace: bodyFont(deck),
      fontSize: 12.5,
      color: deck.theme.text,
      margin: 0,
      align: "center",
      fit: "shrink",
      valign: "mid",
    }
  );

  if (spec.footnote) {
    slide.addText(spec.footnote, {
      x: 0.96,
      y: 6.72,
      w: 11.42,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 8.6,
      color: deck.theme.muted,
      margin: 0,
      align: "center",
      fit: "shrink",
    });
  }

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderImageFrame(slide, deck, image, x, y, w, h, caption) {
  const hasCaption = Boolean(caption);

  slide.addShape(PptxGenJS.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: deck.theme.border, width: 1 },
    shadow: safeOuterShadow(deck.theme.dark, 0.08, 45, 2, 1),
  });

  addImage(
    slide,
    deck,
    image,
    x + 0.1,
    y + 0.1,
    w - 0.2,
    h - (hasCaption ? 0.44 : 0.2),
    "contain"
  );

  if (hasCaption) {
    slide.addText(caption, {
      x: x + 0.14,
      y: y + h - 0.24,
      w: w - 0.28,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 8.5,
      color: deck.theme.muted,
      margin: 0,
      align: "center",
    });
  }
}

function renderImageFullSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);
  const frame = spec.frame || { x: 0.84, y: 2.15, w: 11.68, h: 4.5 };
  renderImageFrame(
    slide,
    deck,
    spec.image,
    frame.x,
    frame.y,
    frame.w,
    frame.h,
    spec.caption
  );
  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderImagePairSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const images = spec.images || [];
  const gap = 0.22;
  const w = (11.68 - gap) / 2;
  renderImageFrame(slide, deck, images[0], 0.84, 2.18, w, 4.47, images[0]?.caption);
  renderImageFrame(slide, deck, images[1], 0.84 + w + gap, 2.18, w, 4.47, images[1]?.caption);

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderImageTriptychSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const images = spec.images || [];
  const gap = 0.18;
  const w = (11.68 - gap * 2) / 3;

  images.forEach((image, index) => {
    const x = 0.84 + index * (w + gap);
    renderImageFrame(slide, deck, image, x, 2.26, w, 4.35, image.caption);
  });

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderImageStackSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const images = spec.images || [];
  const gap = spec.gap ?? 0.18;
  const topH = spec.topHeight || 2.1;
  const bottomH = spec.bottomHeight || 2.18;
  const frame = spec.frame || {};
  const x = frame.x ?? 0.84;
  const y = frame.y ?? 2.18;
  const w = frame.w ?? 11.68;

  renderImageFrame(slide, deck, images[0], x, y, w, topH, images[0]?.caption);
  renderImageFrame(
    slide,
    deck,
    images[1],
    x,
    y + topH + gap,
    w,
    bottomH,
    images[1]?.caption
  );

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderBarsHorizontalSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const bars = spec.bars || [];
  const xLabel = 0.98;
  const xBar = 3.48;
  const y0 = 2.18;
  const rowH = 0.4;
  const gap = 0.08;
  const barW = 7.65;
  const maxValue = Math.max(...bars.map((bar) => Math.abs(Number(bar.value) || 0)), 1);

  bars.forEach((bar, index) => {
    const y = y0 + index * (rowH + gap);
    const value = Math.abs(Number(bar.value) || 0);
    const width = Math.min(Math.max((value / maxValue) * barW, 0.14), barW - 0.04);
    const fillColor = bar.highlight ? deck.theme.dark : deck.theme.gold;
    const textColor = bar.highlight ? deck.theme.dark : deck.theme.text;

    slide.addText(bar.label, {
      x: xLabel,
      y: y + 0.11,
      w: 2.2,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 10.4,
      bold: !!bar.highlight,
      color: textColor,
      margin: 0,
      fit: "shrink",
    });

    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: xBar,
      y,
      w: barW,
      h: rowH,
      rectRadius: 0.08,
      fill: { color: deck.theme.warm },
      line: { color: deck.theme.border, width: 0.6 },
    });

    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: xBar,
      y,
      w: width,
      h: rowH,
      rectRadius: 0.08,
      fill: { color: fillColor },
      line: { color: fillColor, transparency: 100 },
    });

    slide.addText(bar.display || `${bar.value}%`, {
      x: 11.38,
      y: y + 0.11,
      w: 0.8,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 10,
      bold: true,
      color: textColor,
      margin: 0,
      align: "right",
    });
  });

  if (spec.footnote) {
    slide.addText(spec.footnote, {
      x: 0.98,
      y: 6.72,
      w: 11.1,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 8.6,
      color: deck.theme.muted,
      margin: 0,
      fit: "shrink",
      align: "center",
    });
  }

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderTimelineSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const items = spec.items || [];
  const x0 = 1.46;
  const gap = 3.55;
  const lineY = 3.02;

  slide.addShape(PptxGenJS.ShapeType.line, {
    x: x0,
    y: lineY,
    w: gap * (items.length - 1),
    h: 0,
    line: { color: deck.theme.gold, width: 2 },
  });

  items.forEach((item, index) => {
    const cx = x0 + gap * index;

    slide.addShape(PptxGenJS.ShapeType.ellipse, {
      x: cx - 0.16,
      y: lineY - 0.16,
      w: 0.32,
      h: 0.32,
      fill: { color: deck.theme.dark },
      line: { color: deck.theme.goldLight, width: 1.4 },
    });

    slide.addText(item.year, {
      x: cx - 0.65,
      y: 2.36,
      w: 1.3,
      h: 0.18,
      fontFace: bodyFont(deck),
      fontSize: 9.2,
      bold: true,
      color: deck.theme.gold,
      margin: 0,
      align: "center",
      fit: "shrink",
    });

    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x: cx - 1.2,
      y: 3.36,
      w: 2.4,
      h: 2.46,
      rectRadius: 0.08,
      fill: { color: index % 2 === 0 ? "FFFFFF" : deck.theme.warm },
      line: { color: deck.theme.border, width: 1 },
      shadow: safeOuterShadow(deck.theme.dark, 0.04, 45, 2, 1),
    });

    if (item.title) {
      slide.addText(item.title, {
        x: cx - 1.02,
        y: 3.58,
        w: 2.04,
        h: 0.34,
        fontFace: titleFont(deck),
        fontSize: 13.4,
        color: deck.theme.dark,
        margin: 0,
        fit: "resize",
        align: "center",
      });
    }

    slide.addText(item.body, {
      x: cx - 1.02,
      y: item.title ? 4 : 3.82,
      w: 2.04,
      h: item.title ? 1.5 : 1.7,
      fontFace: bodyFont(deck),
      fontSize: 10.2,
      color: deck.theme.text,
      margin: 0,
      fit: "shrink",
      align: "center",
      valign: "mid",
    });
  });

  addNotes(slide, spec.notes);
  finishSlide(slide, pptx);
}

function renderPlatformCardsSlide(pptx, deck, spec, slideNumber) {
  const slide = pptx.addSlide();
  baseSlide(slide, deck);
  addLogo(slide, deck, 10.72, 0.54);
  addSectionLabel(slide, deck, spec.section, slideNumber);
  addTitle(slide, deck, spec.title, spec.kicker);

  const cards = spec.cards || [];
  const gap = 0.24;
  const x0 = 0.84;
  const y0 = 2.2;
  const cardW = (11.68 - gap * 2) / 3;
  const cardH = 4.54;

  cards.forEach((card, index) => {
    const x = x0 + index * (cardW + gap);
    const palette = toneFill(deck, card.tone);

    slide.addShape(PptxGenJS.ShapeType.roundRect, {
      x,
      y: y0,
      w: cardW,
      h: cardH,
      rectRadius: 0.06,
      fill: { color: palette.fill },
      line: { color: palette.border, width: 1 },
    });

    slide.addText(card.tag, {
      x: x + 0.16,
      y: y0 + 0.18,
      w: 1.1,
      h: 0.12,
      fontFace: bodyFont(deck),
      fontSize: 7.6,
      color: palette.border,
      bold: true,
      margin: 0,
    });

    slide.addText(card.title, {
      x: x + 0.16,
      y: y0 + 0.48,
      w: cardW - 0.32,
      h: 0.46,
      fontFace: titleFont(deck),
      fontSize: 15.4,
      color: deck.theme.dark,
      margin: 0,
      fit: "resize",
    });

    if (card.tagline) {
      slide.addText(card.tagline, {
        x: x + 0.16,
        y: y0 + 1.08,
        w: cardW - 0.32,
        h: 0.76,
        fontFace: bodyFont(deck),
        fontSize: 10.2,
        color: deck.theme.text,
        margin: 0,
        fit: "shrink",
      });
    }

    slide.addText((card.bullets || []).map((item) => `- ${item}`).join("\n"), {
      x: x + 0.16,
      y: y0 + 2.02,
      w: cardW - 0.32,
      h: 2.18,
      fontFace: bodyFont(deck),
      fontSize: 9.8,
      color: deck.theme.text,
      margin: 0,
      fit: "shrink",
      breakLine: false,
    });
  });

  addNotes(slide, spec.notes);
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
    headFontFace: titleFont(deck),
    bodyFontFace: bodyFont(deck),
    lang: "pt-BR",
  };
  return pptx;
}

async function buildDeck(deck) {
  const pptx = createDeck(deck);
  renderCoverSlide(pptx, deck);

  deck.slides.forEach((spec, index) => {
    const slideNumber = index + 2;
    switch (spec.layout) {
      case "statement":
        renderStatementSlide(pptx, deck, spec, slideNumber);
        break;
      case "metrics":
        renderMetricsSlide(pptx, deck, spec, slideNumber);
        break;
      case "cards":
        renderCardsSlide(pptx, deck, spec, slideNumber);
        break;
      case "table":
        renderTableSlide(pptx, deck, spec, slideNumber);
        break;
      case "steps":
        renderStepsSlide(pptx, deck, spec, slideNumber);
        break;
      case "decision":
        renderDecisionSlide(pptx, deck, spec, slideNumber);
        break;
      case "estate-overview":
        renderEstateOverviewSlide(pptx, deck, spec, slideNumber);
        break;
      case "image-full":
        renderImageFullSlide(pptx, deck, spec, slideNumber);
        break;
      case "image-pair":
        renderImagePairSlide(pptx, deck, spec, slideNumber);
        break;
      case "image-triptych":
        renderImageTriptychSlide(pptx, deck, spec, slideNumber);
        break;
      case "image-stack":
        renderImageStackSlide(pptx, deck, spec, slideNumber);
        break;
      case "bars-horizontal":
        renderBarsHorizontalSlide(pptx, deck, spec, slideNumber);
        break;
      case "timeline":
        renderTimelineSlide(pptx, deck, spec, slideNumber);
        break;
      case "platform-cards":
        renderPlatformCardsSlide(pptx, deck, spec, slideNumber);
        break;
      default:
        throw new Error(`Layout nao suportado: ${spec.layout}`);
    }
  });

  const publishedName = outputSuffix
    ? deck.publishedFile.replace(/\.pptx$/i, `${outputSuffix}.pptx`)
    : deck.publishedFile;
  const outputPath = path.join(OUTPUT_DIR, publishedName);
  await pptx.writeFile({ fileName: outputPath });
  return outputPath;
}

async function main() {
  ensureDir(OUTPUT_DIR);
  for (const deck of decks) {
    if (onlyIds && !onlyIds.has(deck.id)) {
      continue;
    }
    const file = await buildDeck(deck);
    console.log(`Gerado: ${path.relative(ROOT, file)}`);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
