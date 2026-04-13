# ApresentacaoOffshore

Repositorio dos materiais HTML estaticos da Alta Vista sobre investimentos internacionais.

## Estrutura

- `materials/`: HTMLs finais publicados para clientes.
- `materials/presentations/`: PPTX finais usados pelos botoes de download da area publica.
- `assets/logos/`: logos usados pelos materiais.
- `assets/tributacao/`: assets especificos do material de tributacao.
- `assets/diversificacao/`: assets especificos do material de diversificacao.
- `docs/`: contexto operacional do projeto.
- `tools/presentations/`: fonte do gerador de PPTX.
- `tools/presentations/output/`: artefatos temporarios de renderizacao, ignorados no Git.
- raiz do projeto: apenas `index.html` e os redirects publicos canonicos para os tres HTMLs em `materials/`.

## Publicacao

- GitHub Pages e Vercel servem os arquivos estaticos da raiz.
- Os atalhos canonicos da raiz redirecionam apenas para os HTMLs publicos em `materials/`.
- O guia HUB interno foi segregado para um repositorio e deploy separados.
- Evite criar aliases duplicados de redirect na raiz; use apenas os slugs canonicos.

## Fluxo de trabalho

- `main`: producao estavel.
- `codex/*`: branches de trabalho e experimentos.
- Mudancas experimentais de apresentacao nao devem entrar na `main` sem validacao.
