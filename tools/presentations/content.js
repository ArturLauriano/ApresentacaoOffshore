"use strict";

module.exports = [
  {
    id: "por-que-investir-exterior-cliente",
    htmlFile: "materials/por-que-investir-exterior-cliente.html",
    publishedFile: "por-que-investir-exterior-cliente-apresentacao.pptx",
    shortName: "Diversificacao Internacional",
    theme: {
      bg: "FAF8F4",
      warm: "F5F0E8",
      dark: "1B2A3D",
      navy: "243447",
      gold: "C4963C",
      goldLight: "D4A94E",
      text: "2C3E50",
      muted: "6B7B8D",
      border: "DDD5C8",
      blue: "2980B9",
      green: "27AE60",
      red: "C0392B",
    },
    cover: {
      eyebrow: "Alta Vista Investimentos | Guia do Cliente",
      title: "Por que Diversificar Alem do Brasil?",
      subtitle:
        "Uma apresentacao estruturada a partir do HTML original para explicar o custo do vies local, o papel do dolar e como o acesso internacional ficou mais simples.",
      chips: [
        "Diversificacao real",
        "Protecao em moeda forte",
        "Acesso mais simples",
      ],
      panelTitle: "O que o deck cobre",
      panelItems: [
        "Por que concentrar 100% no Brasil reduz o universo investivel.",
        "Como risco Brasil, cambio e setores afetam a carteira.",
        "O que mudou em acesso, tributacao e sucessao.",
        "Como iniciar a alocacao internacional com menos complexidade.",
      ],
    },
    slides: [
      {
        type: "cards",
        section: "Tese Central",
        title: "A discussao nao e sobre moda, e sobre fronteira de carteira",
        lead:
          "O HTML parte de uma ideia simples: investir so no Brasil restringe oportunidades, concentra riscos e deixa a carteira dependente da mesma moeda, dos mesmos setores e do mesmo ciclo domestico.",
        cards: [
          {
            title: "Problema do vies local",
            tone: "gold",
            items: [
              "Concentrar 100% do patrimonio no Brasil comprime o universo investivel.",
              "O investidor assume risco Brasil sem perceber.",
              "A carteira fica dependente de poucos setores e da mesma moeda.",
            ],
          },
          {
            title: "O que muda com exterior",
            tone: "blue",
            items: [
              "Acesso a empresas, titulos e moedas que o mercado local nao oferece.",
              "Protecao parcial em crises domesticas e mais opcao de renda em dolar.",
              "Mais ferramentas para sucessao e planejamento patrimonial.",
            ],
          },
          {
            title: "Mensagem do material",
            tone: "green",
            items: [
              "Diversificar fora deixou de ser privilegio de poucos.",
              "Tributacao e sucessao ficaram mais administraveis.",
              "A alocacao pode comecar simples e evoluir com o patrimonio.",
            ],
          },
        ],
      },
      {
        type: "stats",
        section: "Mercado Global",
        title: "Brasil e uma fatia pequena do mercado global",
        lead:
          "Aplicar 100% do patrimonio no mercado domestico significa aceitar uma concentracao estrutural em um recorte muito pequeno do mercado mundial de acoes e de renda fixa.",
        stats: [
          { value: "0,4%", label: "Peso do Brasil no MSCI ACWI" },
          { value: "4,1%", label: "Peso no MSCI Mercados Emergentes" },
          { value: "2,1%", label: "Participacao no PIB do G20" },
          { value: "0,6%", label: "Peso em bonds corporativos globais" },
        ],
        bulletsTitle: "Leituras-chave",
        bullets: [
          "Ficar so no Brasil equivale a ignorar 99,6% do mercado global de acoes.",
          "Mesmo na renda fixa, o investidor fica restrito a um universo muito pequeno de emissores, ratings e moedas.",
          "O conforto domestico mascara uma concentracao severa de risco e de oportunidade perdida.",
        ],
        callout: {
          title: "Vies local e estrutural",
          body:
            "O material mostra que a sensacao de diversificacao local engana. A carteira parece ampla em reais, mas continua estreita quando medida contra o mercado global.",
        },
      },
      {
        type: "cards",
        section: "Setores",
        title: "O mundo mudou de lideranca setorial, o Ibovespa muito menos",
        lead:
          "A comparacao de 25 anos entre Brasil e Estados Unidos reforca que a concentracao domestica nao e so geografica; ela tambem limita exposicao aos setores que mais criaram valor no ciclo recente.",
        cards: [
          {
            title: "Ibovespa",
            tone: "red",
            items: [
              "Petrobras, Vale, bancos e commodities seguem dominando a bolsa local.",
              "A lista das maiores empresas mudou pouco ao longo de 25 anos.",
              "Tecnologia global quase nao aparece na carteira brasileira tradicional.",
            ],
          },
          {
            title: "S&P 500",
            tone: "blue",
            items: [
              "NVIDIA, Microsoft, Apple, Amazon e Alphabet lideram a nova economia.",
              "Semicondutores, software, cloud e plataformas ganharam peso.",
              "Grande parte da geracao de retorno global veio de fora do Brasil.",
            ],
          },
          {
            title: "Implicacao para a carteira",
            tone: "gold",
            items: [
              "Ficar so no Brasil reduz exposicao a IA, biotech, cloud e plataformas digitais.",
              "A America Latina representa so 1% do setor global de tecnologia.",
              "A diversificacao setorial depende de abrir o leque internacional.",
            ],
          },
        ],
      },
      {
        type: "stats",
        section: "Risco Brasil",
        title: "O CDI parece estavel, mas nao elimina risco Brasil",
        lead:
          "O HTML chama atencao para um ponto recorrente: medir tudo em reais faz o investidor subestimar o risco soberano, o impacto da moeda e a perda de poder de compra em dolar.",
        stats: [
          { value: "141,5", label: "CDS de 5 anos do Brasil" },
          { value: "BB / Ba1", label: "Rating soberano atual" },
          { value: "Top 4", label: "Entre os maiores CDS do grupo comparado" },
          { value: "BRL", label: "Moeda fragil em ciclos longos" },
        ],
        bulletsTitle: "O que isso significa",
        bullets: [
          "O mercado global precifica o Brasil como um risco de credito elevado entre economias relevantes.",
          "O ganho nominal do CDI pode esconder perda de poder de compra quando a referencia correta e moeda forte.",
          "Risco fiscal, cambial e setorial continuam concentrados na mesma carteira.",
        ],
        callout: {
          title: "Estabilidade local nao e neutralidade",
          body:
            "A estabilidade percebida do CDI nao remove o risco do pais nem a volatilidade cambial acumulada no patrimonio medido em dolar.",
        },
      },
      {
        type: "stats",
        section: "Retornos",
        title: "Retornos globais em perspectiva mostram o custo da concentracao",
        lead:
          "A simulacao do material compara tres trajetorias para US$ 100 mil e evidencia como o patrimonio pode crescer em reais, mas ficar para tras frente a ativos globais mais eficientes.",
        stats: [
          { value: "US$ 281 mil", label: "CDI convertido em dolar" },
          { value: "US$ 471 mil", label: "Portfolio global 60/40" },
          { value: "US$ 807 mil", label: "S&P 500" },
        ],
        bulletsTitle: "Leitura correta dos numeros",
        bullets: [
          "A comparacao relevante e em moeda forte, nao apenas em retorno nominal em reais.",
          "Ativos globais entregaram maior acumulacao com menor dependencia do risco Brasil.",
          "Diversificacao externa pode melhorar retorno esperado e preservar poder de compra no longo prazo.",
        ],
        callout: {
          title: "Nao basta ganhar em reais",
          body:
            "O ponto do HTML e mostrar que patrimonio mais rico em reais ainda pode estar relativamente mais pobre quando comparado a alternativas internacionais mais eficientes.",
        },
      },
      {
        type: "cards",
        section: "Protecao",
        title: "Risco-retorno e dolar cumprem papeis complementares",
        lead:
          "O material combina duas mensagens: ativos brasileiros dolarizados tiveram uma relacao risco-retorno inferior, e uma parcela conservadora em dolar historicamente protegeu a carteira nos piores momentos locais.",
        cards: [
          {
            title: "Ineficiencia dos ativos brasileiros",
            tone: "red",
            items: [
              "Em dolar, os ativos brasileiros ficaram na area fraca do grafico risco-retorno.",
              "Mais volatilidade nao se traduziu em melhor premio de retorno.",
              "Diversificar e melhorar a fronteira eficiente da carteira.",
            ],
          },
          {
            title: "Dolar como hedge",
            tone: "blue",
            items: [
              "Uma alocacao conservadora em dolar ajudou a equilibrar a carteira em crises locais.",
              "Protecao cambial e diversificacao setorial nao sao substitutos; eles se somam.",
              "A moeda forte tende a responder quando os ativos locais sofrem.",
            ],
          },
          {
            title: "Anos emblematicos",
            tone: "gold",
            items: [
              "2015: +55% em reais.",
              "2020: +34% em reais.",
              "2024: +32% em reais.",
            ],
          },
        ],
      },
      {
        type: "process",
        section: "Acesso",
        title: "O acesso internacional saiu do private e virou infraestrutura",
        lead:
          "Outra tese central do HTML e que a grande mudanca nao foi filosofica; foi operacional. Abertura de conta, cambio, suporte e relatorios ficaram mais integrados ao investidor brasileiro.",
        steps: [
          {
            title: "Antes",
            items: [
              "Patrimonio minimo elevado.",
              "Documentacao extensa e pouca ajuda local.",
            ],
          },
          {
            title: "Plataformas",
            items: [
              "Avenue e XP Internacional reduziram a barreira de entrada.",
              "Abertura e operacao ficaram mais acessiveis.",
            ],
          },
          {
            title: "Infraestrutura",
            items: [
              "Cambio, custodia e relatorios ficaram mais integrados.",
              "A friccao operacional caiu bastante.",
            ],
          },
          {
            title: "Hoje",
            items: [
              "Ja e possivel comecar menor e com mais suporte.",
              "A decisao passa a ser como estruturar, nao se e viavel acessar.",
            ],
          },
        ],
        summaryTitle: "Mudanca de patamar",
        summaryItems: [
          "Baixar a barreira de acesso mudou a conversa: agora o foco e escolher o veiculo adequado para o objetivo, e nao apenas superar a dificuldade operacional.",
        ],
      },
      {
        type: "cards",
        section: "Tributacao e Sucessao",
        title: "Tributacao, sucessao e PIC ficaram mais administraveis",
        lead:
          "O HTML nao trata o tema como um detalhe. Ele mostra que imposto, sucessao e tipo de veiculo precisam entrar cedo na conversa, mas hoje podem ser tratados com muito mais clareza do que no passado.",
        cards: [
          {
            title: "Pessoa fisica",
            tone: "green",
            items: [
              "Ganho de capital em reais com aliquota de 15% sobre o resultado liquido.",
              "Prejuizos podem compensar ganhos futuros da mesma natureza.",
              "Organizar vendas e a declaracao anual continua importante.",
            ],
          },
          {
            title: "Estate tax e TOD",
            tone: "red",
            items: [
              "Ativos de raiz americana acima de US$ 60 mil entram no tema sucessorio.",
              "O TOD agiliza a transferencia operacional da conta.",
              "TOD nao elimina o estate tax, mas evita probate americano.",
            ],
          },
          {
            title: "PIC Offshore",
            tone: "gold",
            items: [
              "Faz sentido quando patrimonio e complexidade patrimonial aumentam.",
              "Pode neutralizar o risco sucessorio em estruturas especificas.",
              "Nao costuma ser o ponto de partida da maioria dos investidores.",
            ],
          },
        ],
      },
      {
        type: "cards",
        section: "Como Comecar",
        title: "A alocacao internacional pode comecar simples e ganhar sofisticacao",
        lead:
          "A conclusao do material e pragmatica: definir o objetivo, iniciar com uma estrutura eficiente e aumentar a complexidade apenas quando patrimonio, sucessao e governanca justificarem.",
        cards: [
          {
            title: "Conta internacional",
            tone: "blue",
            items: [
              "Boa porta de entrada para acoes, ETFs, mutual funds, bonds e treasuries.",
              "Abertura digital e cambio integrado reduzem friccao.",
              "Resolve a maior parte dos casos iniciais.",
            ],
          },
          {
            title: "Atendimento patrimonial",
            tone: "gold",
            items: [
              "Familias com patrimonio maior exigem apoio tributario, sucessorio e de governanca.",
              "A conversa pode incluir estrutura offshore quando fizer sentido.",
              "A solucao precisa acompanhar a complexidade do patrimonio.",
            ],
          },
          {
            title: "Primeiros passos",
            tone: "green",
            items: [
              "Definir objetivo: oportunidade, protecao, renda ou sucessao.",
              "Comecar com veiculos eficientes e TOD preenchido.",
              "Evoluir para estruturas mais sofisticadas apenas quando houver motivo patrimonial.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tributacao-investimentos-internacionais",
    htmlFile: "materials/tributacao-investimentos-internacionais.html",
    publishedFile: "tributacao-investimentos-internacionais-apresentacao.pptx",
    shortName: "Tributacao Internacional",
    theme: {
      bg: "FAF7F2",
      warm: "F7EFE2",
      dark: "132235",
      navy: "1B3045",
      gold: "C4963C",
      goldLight: "E6C57D",
      text: "2B3A48",
      muted: "67788A",
      border: "DDD1BF",
      blue: "2F6F9E",
      green: "31875A",
      red: "B75449",
    },
    cover: {
      eyebrow: "Alta Vista Investimentos | Guia do Cliente",
      title: "Tributacao de Investimentos Internacionais",
      subtitle:
        "Deck em PowerPoint estruturado a partir do HTML publicado para resumir aliquotas, risco sucessorio, TOD e quando a conversa evolui para uma PIC offshore.",
      chips: [
        "Ganho de capital",
        "Estate tax",
        "TOD e PIC",
      ],
      panelTitle: "Perguntas que o deck responde",
      panelItems: [
        "Como a pessoa fisica residente no Brasil e tributada ao investir fora.",
        "Quais ativos entram no estate tax americano.",
        "O que o TOD resolve e o que ele nao resolve.",
        "Quando faz sentido discutir uma PIC offshore.",
      ],
    },
    slides: [
      {
        type: "cards",
        section: "Primeiro Dolar",
        title: "A eficiencia da carteira depende de tres decisoes antes do retorno",
        lead:
          "O HTML insiste que a analise nao comeca no ticker. Veiculo, jurisdicao e estrutura sucessoria alteram o retorno liquido, o risco patrimonial e a complexidade para a familia.",
        cards: [
          {
            title: "Veiculo",
            tone: "blue",
            items: [
              "Ativo direto, mutual fund ou renda fixa internacional mudam tributacao e compounding.",
              "A classe de ativo importa, mas o envelope juridico importa tanto quanto.",
            ],
          },
          {
            title: "Jurisidicao",
            tone: "gold",
            items: [
              "Nem todo ativo em dolar carrega o mesmo risco sucessorio.",
              "Raiz americana e a variavel critica para estate tax.",
            ],
          },
          {
            title: "Sucessao",
            tone: "red",
            items: [
              "TOD, leitura da raiz americana e eventual PIC mudam o risco da familia.",
              "O primeiro dolar ja deveria nascer com essa reflexao.",
            ],
          },
        ],
      },
      {
        type: "stats",
        section: "Aliquotas",
        title: "A grande diferenca esta menos no ganho de capital e mais no fluxo de dividendos",
        lead:
          "Para a pessoa fisica residente no Brasil, a tributacao dos investimentos internacionais e mais linear do que muitos imaginam. O ponto de atencao aparece quando o produto distribui dividendos e quando o veiculo escolhido melhora ou piora esse atrito.",
        stats: [
          { value: "15%", label: "Ganho de capital em reais" },
          { value: "30%", label: "Dividendos de acoes, ETFs e REITs dos EUA" },
          { value: "15% / 0%", label: "Drag interno de mutual funds" },
          { value: "Anual", label: "Pagamento no ajuste anual" },
        ],
        bulletsTitle: "Como ler a regra",
        bullets: [
          "A apuracao considera o resultado em reais, ja refletindo a variacao cambial.",
          "So ha imposto se o investidor vender com lucro ao longo do ano.",
          "Prejuizos podem compensar ganhos futuros da mesma natureza.",
        ],
        callout: {
          title: "Onde esta o divisor de aguas",
          body:
            "O ganho de capital e relativamente uniforme entre classes. O grande diferencial economico aparece no tratamento dos dividendos e no veiculo escolhido para investir.",
        },
      },
      {
        type: "cards",
        section: "Estate Tax",
        title: "Ativos de raiz americana exigem leitura sucessoria desde o inicio",
        lead:
          "O HTML traduz o estate tax em termos praticos: o risco nao nasce da conta internacional em si, mas do tipo de ativo mantido dentro dela e do domicilio juridico desse ativo.",
        cards: [
          {
            title: "Regra-base",
            tone: "red",
            items: [
              "Faixa de isencao para nao residentes: US$ 60 mil.",
              "A tributacao sobre o excedente pode chegar a 40%.",
              "O Brasil nao possui tratado sucessorio com os Estados Unidos.",
            ],
          },
          {
            title: "Entram na base",
            tone: "gold",
            items: [
              "Acoes americanas.",
              "ETFs domiciliados nos EUA.",
              "REITs americanos.",
            ],
          },
          {
            title: "Afastam o risco",
            tone: "green",
            items: [
              "Mutual funds da Irlanda ou de Luxemburgo.",
              "Bonds individuais, Treasuries e CDs bancarios.",
              "Estruturas patrimoniais quando o caso exigir.",
            ],
          },
        ],
      },
      {
        type: "cards",
        section: "TOD",
        title: "TOD e a camada operacional minima da sucessao",
        lead:
          "O Transfer on Death aparece no HTML como providencia basica da conta internacional: simples, barata e imediata, mas insuficiente se a carteira continuar carregando ativos de raiz americana acima do limite relevante.",
        cards: [
          {
            title: "O que resolve",
            tone: "blue",
            items: [
              "Designa beneficiarios diretamente na conta internacional.",
              "Evita probate americano e acelera a transferencia operacional.",
              "Reduz friccao para a familia no pior momento.",
            ],
          },
          {
            title: "O que nao resolve",
            tone: "red",
            items: [
              "Nao elimina o estate tax.",
              "Nao substitui planejamento patrimonial.",
              "Nao dispensa revisar o tipo de ativo mantido na conta.",
            ],
          },
          {
            title: "Regra pratica",
            tone: "gold",
            items: [
              "Conta internacional aberta deveria sair com TOD preenchido.",
              "E uma medida simples, sem custo relevante e de implementacao imediata.",
              "Funciona como camada operacional minima da sucessao.",
            ],
          },
        ],
      },
      {
        type: "process",
        section: "PIC Offshore",
        title: "A PIC entra quando a conversa deixa de ser apenas de produto",
        lead:
          "A apresentacao derivada do HTML preserva a mesma mensagem: a PIC nao e a resposta padrao; ela aparece quando patrimonio, necessidade de governanca e sucessao mais sofisticada justificam a camada societaria adicional.",
        steps: [
          {
            title: "Quando entra",
            items: [
              "Patrimonio offshore relevante.",
              "Sucessao mais sofisticada ou necessidade real de ativos de raiz americana.",
            ],
          },
          {
            title: "Como funciona",
            items: [
              "A empresa passa a deter os investimentos.",
              "Na sucessao, o que muda de maos sao as cotas da companhia.",
            ],
          },
          {
            title: "Beneficios",
            items: [
              "Organizacao patrimonial e de governanca.",
              "Afastamento do estate tax em casos adequados.",
            ],
          },
          {
            title: "Custo e limite",
            items: [
              "Ha custo de abertura, manutencao e mais complexidade.",
              "Por isso a PIC nao deve ser tratada como default.",
            ],
          },
        ],
        summaryTitle: "Leitura correta da estrutura",
        summaryItems: [
          "PIC nao serve para ocultar patrimonio. E um veiculo societario para casos patrimoniais especificos em que a camada adicional faz sentido economico e sucessorio.",
        ],
      },
      {
        type: "cards",
        section: "Resumo",
        title: "A recomendacao e escalar complexidade so quando houver motivo patrimonial",
        lead:
          "O fechamento do HTML consolida uma logica simples: comecar por instrumentos eficientes, preencher TOD, mapear a raiz americana e so depois discutir estruturas mais pesadas, se o patrimonio realmente pedir.",
        cards: [
          {
            title: "Carteira simples",
            tone: "green",
            items: [
              "Mutual funds e renda fixa internacional costumam resolver muito bem o comeco.",
              "O foco e preservar compounding, eficiencia tributaria e simplicidade operacional.",
            ],
          },
          {
            title: "Risco sucessorio",
            tone: "red",
            items: [
              "TOD preenchido e leitura clara da raiz americana evitam surpresa futura.",
              "A familia nao deveria descobrir o problema apenas no evento sucessorio.",
            ],
          },
          {
            title: "Escalada de complexidade",
            tone: "gold",
            items: [
              "Se o patrimonio cresce, a conversa evolui para PIC e governanca.",
              "Estrutura deve acompanhar necessidade real, nao modismo.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "guia-hub-investimentos-internacionais",
    htmlFile: "materials/guia-hub-investimentos-internacionais.html",
    publishedFile: "guia-hub-investimentos-internacionais-apresentacao.pptx",
    shortName: "Guia HUB",
    theme: {
      bg: "FAF7F2",
      warm: "F5ECDF",
      dark: "132235",
      navy: "1C3046",
      gold: "C4963C",
      goldLight: "E3BE74",
      text: "293949",
      muted: "677789",
      border: "DDD1BF",
      blue: "2E6F9D",
      red: "B75449",
      green: "31875A",
    },
    cover: {
      eyebrow: "Alta Vista Investimentos | Guia Pratico para Assessor",
      title: "Guia HUB Investimentos Internacionais",
      subtitle:
        "Apresentacao em PowerPoint baseada no HTML operacional para transformar a navegacao do HUB, o fluxo de cambio e o uso da conta global em um roteiro visual e editavel.",
      chips: [
        "Navegacao do HUB",
        "Cambio D0",
        "Conta global e TOD",
      ],
      panelTitle: "Frentes cobertas",
      panelItems: [
        "Entrada no ambiente internacional e leitura da regua de navegacao.",
        "Tela do cliente, conta global, W8, suitability e TOD.",
        "Passo a passo do TOD no aplicativo.",
        "Boleta de cambio, prateleira de produtos e central de operacoes.",
      ],
    },
    slides: [
      {
        type: "process",
        section: "Jornada",
        title: "A operacao no HUB funciona melhor quando o assessor pensa em quatro frentes conectadas",
        lead:
          "O material operacional organiza a jornada internacional do assessor como um fluxo continuo: entrar no ambiente certo, ler a situacao do cliente, transformar saldo local em funding internacional e acompanhar a alocacao ate a conclusao.",
        steps: [
          {
            title: "Entrada no ambiente",
            items: [
              "Menu lateral e regua superior direcionam o assessor.",
              "O objetivo e chegar rapido a frente correta.",
            ],
          },
          {
            title: "Leitura do cliente",
            items: [
              "Conta global, push de abertura, W8, suitability e TOD.",
              "A tela concentra o contexto antes da proxima acao.",
            ],
          },
          {
            title: "Cambio e funding",
            items: [
              "Boleta D0, origem dos recursos, spread e valor a receber.",
              "E o elo entre saldo local e conta global.",
            ],
          },
          {
            title: "Produtos e monitoramento",
            items: [
              "Prateleira internacional, push ao cliente e central de operacoes.",
              "Acompanhamento fecha o ciclo operacional.",
            ],
          },
        ],
        summaryTitle: "Mensagem do guia",
        summaryItems: [
          "O ganho operacional vem de encadear essas etapas sem perder contexto da conta e da posicao do cliente.",
        ],
      },
      {
        type: "gallery",
        section: "Navegacao",
        title: "Navegacao no HUB: reconhecer os dois niveis economiza tempo",
        lead:
          "O HTML deixa claro que a orientacao inicial do assessor depende de duas leituras simultaneas: o caminho lateral para entrar no modulo correto e a regua superior para mudar de assunto sem perder o cliente de vista.",
        cards: [
          {
            title: "Menu lateral",
            tone: "gold",
            items: [
              "Caminho operacional: Investimento > Internacional > Investimento Global.",
              "Essa e a porta de entrada para abertura, cambio e produtos.",
            ],
          },
          {
            title: "Regua superior",
            tone: "blue",
            items: [
              "Organiza dashboard, produtos, clientes, cambio, operacoes e apoio.",
              "Reconhecer os dois niveis acelera a jornada do assessor.",
            ],
          },
        ],
        images: [
          {
            path: "assets/hub/Hub1.png",
            caption:
              "Entrada pela lateral do HUB ate a trilha de Investimento Global.",
          },
          {
            path: "assets/hub/HUB2.png",
            caption:
              "Regua superior com os modulos do ambiente internacional.",
          },
        ],
      },
      {
        type: "gallery",
        section: "Cliente",
        title: "A tela do cliente concentra o contexto que destrava a proxima acao",
        lead:
          "No fluxo do HTML, a consulta do cliente e o centro de gravidade da operacao: e ali que o assessor identifica se a conta existe, se o onboarding terminou e qual e a situacao patrimonial antes de falar de cambio ou produto.",
        cards: [
          {
            title: "Caso 1: sem conta global",
            tone: "red",
            items: [
              "Enviar push de abertura pelo HUB ou orientar abertura pelo app.",
              "Acompanhar o progresso ate a conta ficar disponivel.",
            ],
          },
          {
            title: "Caso 2: conta ativa",
            tone: "blue",
            items: [
              "Ler status da conta, dados cadastrais, W8, suitability e TOD.",
              "Conferir a conta XP International antes de avancar.",
            ],
          },
          {
            title: "Leitura operacional",
            tone: "gold",
            items: [
              "A tela mostra saldos e posicoes local e offshore.",
              "Ela reduz retrabalho e evita navegar sem contexto do cliente.",
            ],
          },
        ],
        images: [
          {
            path: "assets/hub/abertura de conta.png",
            caption:
              "Fluxo de abertura da conta internacional e envio de push.",
          },
          {
            path: "assets/hub/cliente dados.png",
            caption:
              "Painel com status da conta, TOD e demais dados de apoio.",
          },
          {
            path: "assets/hub/HUB carteira.png",
            caption:
              "Visao consolidada das carteiras local e offshore.",
          },
        ],
      },
      {
        type: "gallery",
        section: "TOD no App",
        title: "TOD pelo aplicativo: a orientacao do assessor vira roteiro simples para o cliente",
        lead:
          "O HTML transforma o cadastro de beneficiarios em um passo a passo objetivo. Depois de validar a conta global no HUB, o cliente pode concluir essa frente pelo proprio app da XP.",
        cards: [
          {
            title: "Passo a passo do cliente",
            tone: "green",
            items: [
              "Entrar pela Conta Global no app.",
              "Ir ate Sucessao Patrimonial.",
              "Cadastrar o beneficiario no TOD.",
            ],
          },
          {
            title: "Papel do assessor",
            tone: "gold",
            items: [
              "Validar no HUB que a conta existe e esta apta.",
              "Orientar a jornada pelo app quando isso fizer mais sentido que o push.",
              "Usar o mesmo caminho quando a conta ainda estiver em abertura.",
            ],
          },
        ],
        images: [
          {
            path: "assets/hub/conta internacional HUB.png",
            caption:
              "Entrada da Conta Global pelo simbolo do globo no app.",
          },
          {
            path: "assets/hub/Caminho tod.png",
            caption:
              "Acesso ao menu de Sucessao Patrimonial na Conta Global.",
          },
          {
            path: "assets/hub/Cadastrar TOD.png",
            caption:
              "Tela de cadastro do beneficiario para concluir o TOD.",
          },
        ],
      },
      {
        type: "gallery",
        section: "Cambio",
        title: "Fluxo de cambio: da consulta ao clique em Fazer Cambio",
        lead:
          "No HTML, o cambio e a ponte entre o saldo em reais e o funding da conta internacional. O processo e simples, mas depende de conferencia operacional disciplinada antes do envio.",
        cards: [
          {
            title: "Checklist antes do envio",
            tone: "blue",
            items: [
              "Abrir a aba de cambio e localizar o cliente correto.",
              "Conferir conta origem, saldo disponivel, valor, spread e total estimado.",
              "Confirmar origem dos recursos e limites antes da confirmacao.",
            ],
          },
          {
            title: "Leitura da boleta",
            tone: "gold",
            items: [
              "O botao Fazer Cambio leva para a boleta operacional.",
              "A liquidacao e em D0.",
              "A clareza da boleta reduz erro e retrabalho.",
            ],
          },
        ],
        images: [
          {
            path: "assets/hub/caminho para cambio.png",
            caption:
              "Entrada pela aba de Cambio no menu superior do HUB.",
          },
          {
            path: "assets/hub/cambio.png",
            caption:
              "Tela do cliente em cambio e acesso ao botao Fazer Cambio.",
          },
          {
            path: "assets/hub/boleta cambio.png",
            caption:
              "Boleta com conta origem, valor, spread e confirmacao do envio.",
          },
        ],
      },
      {
        type: "gallery",
        section: "Produtos",
        title: "Depois do funding, o HUB vira ponto de distribuicao da carteira internacional",
        lead:
          "A prateleira de produtos do HTML mostra que o processo nao termina no cambio. O assessor precisa converter a conta abastecida em uma proposta concreta de alocacao e envio ao cliente.",
        cards: [
          {
            title: "O que o assessor encontra",
            tone: "blue",
            items: [
              "Fundos, equity, bonds, tesouro, CDs e notas estruturadas.",
              "A prateleira organiza a distribuicao das solucoes internacionais.",
            ],
          },
          {
            title: "Objetivo da etapa",
            tone: "gold",
            items: [
              "Transformar o dinheiro convertido em carteira efetivamente alocada.",
              "Sair com o produto mapeado e com o push preparado para o cliente.",
            ],
          },
        ],
        images: [
          {
            path: "assets/hub/produtos.png",
            caption:
              "Prateleira internacional de produtos com destaque para fundos e demais classes globais.",
          },
        ],
      },
      {
        type: "gallery",
        section: "Acompanhamento",
        title: "A Central de Operacoes fecha o ciclo com monitoramento de cambio e pushs",
        lead:
          "O encerramento do HTML mostra que a visibilidade pos-operacao e parte da propria experiencia do assessor. O controle do status evita perder timing e reduz a necessidade de consultas dispersas.",
        cards: [
          {
            title: "Depois da execucao",
            tone: "green",
            items: [
              "Depositos e Saques monitora as movimentacoes ligadas ao cambio.",
              "Ativos Internacionais monitora os pushs enviados ao cliente.",
            ],
          },
          {
            title: "O que acompanhar",
            tone: "gold",
            items: [
              "Processando, pendente de cliente ou ja aceito.",
              "Leitura rapida para agir sem perder timing operacional.",
            ],
          },
        ],
        images: [
          {
            path: "assets/hub/Acompanhamentos.png",
            caption:
              "Central de Operacoes usada para acompanhar cambio e pushs internacionais.",
          },
        ],
      },
    ],
  },
];
