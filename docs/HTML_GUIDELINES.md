# HTML Guidelines

## Objetivo

Este arquivo documenta o padrao editorial, estrutural e visual dos HTMLs estaticos da Alta Vista neste repositorio.

O objetivo e evitar que o padrao fique implicito apenas nos arquivos existentes. Novos materiais devem usar este guia como referencia primaria para HTML, enquanto o fluxo de PPTX continua documentado pelo gerador em `tools/presentations/` e pelas convencoes de deck ja usadas no projeto.

## Escopo

Este guia vale para:

- novos arquivos em `materials/*.html`
- revisoes de HTMLs existentes
- materiais que depois possam virar PPTX
- paginas editoriais, guias, outlooks e materiais de apoio

Este guia nao e para:

- automacoes do gerador de PPTX
- regras tecnicas internas de PptxGenJS
- componentes compartilhados fora deste repositorio

## Estrutura do repositorio

- `materials/` guarda os HTMLs finais publicados
- `materials/presentations/` guarda os PPTX finais
- `assets/` guarda logos, imagens, capturas e graficos por tema
- a raiz do projeto guarda apenas `index.html` e redirects canonicos para os HTMLs publicados
- `docs/` guarda contexto operacional e regras de manutencao

## Regra de publicacao

- todo HTML final deve viver em `materials/`
- se o material precisar de URL canonica publica na raiz, criar um redirect simples apontando para `materials/...`
- nao criar aliases duplicados na raiz
- se um HTML novo for listado no indice, atualizar `index.html`
- se um HTML for movido, validar todos os caminhos de assets e logos

## Papel do HTML no projeto

O HTML e o artefato editorial primario.

Quando existir deck correspondente, o PPTX deve seguir o HTML em:

- ordem narrativa
- tom de comunicacao
- tipografia e cores
- escolha de imagens e graficos

Em outras palavras: o deck nasce da pagina, nao o contrario.

## Padrao visual

Os HTMLs da casa seguem uma mesma familia visual:

- titulos em `DM Serif Display`
- corpo em `Source Sans 3`
- fundo claro e quente, normalmente com gradientes suaves
- azul escuro como cor principal
- dourado como cor de acento
- header forte, com profundidade visual e faixa inferior dourada
- logo Alta Vista sempre visivel no hero
- cards e blocos com cantos arredondados, borda suave e sombra discreta

Evitar:

- visual generico de landing page
- excesso de boxes pequenos sem hierarquia
- cara de dashboard se o material for editorial
- paleta aleatoria fora do universo visual da casa

## Anatomia recomendada da pagina

O padrao mais comum de HTML no repositorio e:

1. `top-bar` institucional
2. hero/header com logo, eyebrow, titulo e introducao
3. navegacao sticky com ancora para secoes
4. secoes numeradas ao longo da pagina
5. rodape simples

O hero normalmente contem:

- logo da Alta Vista
- eyebrow contextual
- titulo principal forte
- subtitulo ou texto de abertura
- opcionalmente, um painel lateral com leitura rapida

As secoes numeradas devem:

- ter titulo claro
- abrir com um `section-lead`
- manter coerencia de espacamento e ritmo visual
- evitar trocar de linguagem visual a cada bloco

## Tom editorial

O texto deve soar como material institucional e analitico, nao como lista de anotacoes.

Preferir:

- paragrafo bem construido antes de lista
- narrativa por bloco tematico
- conexao causal entre fatos, precos e implicacoes
- texto que explique o "por que isso importa"

Usar listas apenas quando a informacao for naturalmente listavel, por exemplo:

- checklist
- mensagens-chave muito objetivas
- proximos passos
- legendas de slots visuais

Evitar:

- transformar toda a pagina em bullet points
- frases telegraficas demais
- repetir a mesma ideia em cards diferentes

## Uso de cards e blocos

Cards sao suporte visual, nao o formato dominante por padrao.

Use cards quando:

- houver comparacao clara entre 2 ou 3 ideias
- o bloco pedir separacao visual
- o trecho funcionar melhor como resumo

Nao use cards para quebrar um raciocinio que deveria fluir em prosa.

## Imagens, graficos e placeholders

Quando o material ainda nao tiver todos os graficos finais, prefira deixar slots explicitos em vez de improvisar visual generico.

Cada placeholder de imagem deve ter:

- titulo claro do que entrara ali
- breve descricao do uso esperado
- nota curta sobre leitura visual ou tipo de grafico

Exemplos de slots uteis:

- curva de juros
- spreads de credito
- comparativo de bolsas
- setores
- multiplos
- cronologia visual
- grafico principal de commodity

## Assets

Sempre reutilizar assets do projeto primeiro.

Prioridade:

1. `assets/` do proprio repositorio
2. imagens ja presentes no HTML original
3. novos arquivos adicionados pelo usuario

Se um grafico ou imagem ainda nao existir:

- deixar placeholder claro
- nao inventar dado visual so para preencher espaco

## Relacao com PPTX

Quando um HTML virar apresentacao:

- o HTML continua sendo a fonte de verdade para narrativa e ordem
- o deck deve condensar o texto e privilegiar o visual
- textos longos do HTML podem virar speaker notes no PPTX
- imagens e graficos marcados no HTML ajudam a orientar o desenho do deck

## Checklist antes de concluir um HTML

- o arquivo final esta em `materials/`
- a raiz so recebeu redirect se isso for realmente necessario
- a pagina abre com logo, hero e hierarquia clara
- a navegacao por ancora esta funcionando
- os caminhos de assets estao corretos
- o texto esta mais em prosa do que em bullets, salvo quando lista fizer sentido
- os placeholders de imagem estao nomeados de forma util
- o material esta coerente com o padrao visual da Alta Vista

## Referencias atuais do repositorio

Os exemplos mais uteis hoje para o padrao HTML da casa sao:

- `materials/por-que-investir-exterior-cliente.html`
- `materials/tributacao-investimentos-internacionais.html`
- `materials/guia-hub-investimentos-internacionais.html`
- `materials/outlook-mercados-marco-2026.html`
