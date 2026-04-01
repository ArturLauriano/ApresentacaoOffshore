# Project Status

## Estado de producao

- A branch `main` publica os materiais estaveis.
- A branch `feature/market-monthly-outlook-html` concentra o trabalho do material `outlook-mercados-marco-2026`.
- Os links historicos da raiz continuam ativos por meio de redirects.

## Layout atual

- `materials/` concentra os HTMLs finais.
- `materials/presentations/` concentra os PPTX finais aprovados.
- `assets/logos/` concentra os SVGs de marca.
- `assets/hub/` concentra os prints do guia operacional.
- `assets/tributacao/` concentra os assets do material tributario.
- `assets/diversificacao/` concentra os assets do material de diversificacao.
- `docs/HTML_GUIDELINES.md` consolida o padrao de HTML da casa.
- `tools/presentations/` concentra o gerador dos PPTX.
- `tools/presentations/output/` deve ser tratado como cache temporario local.
- A raiz do projeto mantem apenas os redirects canonicos dos materiais publicados ou em homologacao.

## Regras de manutencao

- Nao criar redirects aliases duplicados na raiz; manter apenas os nomes canonicos publicados.
- Nao mover ou remover redirects canonicos da raiz sem ajustar os links publicos.
- Validar referencias de imagens e logos sempre que um HTML for movido.
- Manter experimentos fora da `main` ate a aprovacao final.
