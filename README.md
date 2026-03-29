# ApresentacaoOffshore

Repositorio dos materiais HTML estaticos da Alta Vista sobre investimentos internacionais.

## Estrutura

- `materials/`: HTMLs principais publicados.
- `assets/logos/`: logos usados pelos materiais.
- `assets/hub/`: capturas e imagens do guia operacional.
- `docs/`: contexto operacional do projeto.
- arquivos HTML na raiz: redirects publicos para manter URLs estaveis.

## Publicacao

- GitHub Pages e Vercel servem os arquivos estaticos da raiz.
- Os atalhos da raiz redirecionam para os HTMLs reais em `materials/`.
- Ao reorganizar arquivos, preserve os redirects para nao quebrar links publicos.

## Fluxo de trabalho

- `main`: producao estavel.
- `codex/*`: branches de trabalho e experimentos.
- Mudancas experimentais de apresentacao nao devem entrar na `main` sem validacao.
