"use strict";

module.exports = [
  {
    id: "por-que-investir-exterior-cliente",
    htmlFile: "materials/por-que-investir-exterior-cliente.html",
    publishedFile: "por-que-investir-exterior-cliente-apresentacao.pptx",
    shortName: "Diversificacao Internacional",
    theme: {
      bg: "FAF8F4",
      dark: "1B2A3D",
      navy: "243447",
      gold: "C4963C",
      goldLight: "D4A94E",
      warm: "F5F0E8",
      surface: "FFFDFC",
      text: "2C3E50",
      muted: "6B7B8D",
      border: "DDD5C8",
    },
    fonts: {
      title: "DM Serif Display",
      body: "Source Sans 3",
    },
    cover: {
      eyebrow: "Alta Vista Investimentos | Guia do Cliente",
      title: "Por que Diversificar Al\u00E9m do Brasil?",
      titleRuns: [
        { text: "Por que Diversificar ", options: { color: "FFFFFF" } },
        { text: "Al\u00E9m", options: { color: "D4A94E" } },
        { text: " do Brasil?", options: { color: "FFFFFF" } },
      ],
      subtitle:
        "Um deck visual para explicar concentracao local, dolar, risco Brasil e o ganho de acesso ao mercado global.",
      chips: ["Mercado global", "Protecao cambial", "Acesso simplificado"],
      notes:
        "Mensagem central: investir apenas no Brasil restringe o universo investivel, concentra risco em uma unica moeda e deixa a carteira dependente do mesmo ciclo domestico. Use este slide para abrir a conversa e preparar o racional dos proximos graficos.",
    },
    slides: [
      {
        layout: "statement",
        section: "Tese Central",
        title:
          "Diversificacao internacional amplia o universo de investimento da carteira",
        kicker:
          "Ao incluir ativos internacionais, a carteira passa a acessar mais emissores, setores, moedas e geografias do que o mercado local, sozinho, consegue oferecer.",
        body:
          "Na pratica, isso reduz a concentracao em uma unica economia, torna a alocacao mais previsivel em seus vetores de risco e amplia a capacidade de buscar retornos mais eficientes em relacao ao risco assumido.",
        notes:
          "A tese central do HTML e de ampliacao de fronteira investivel. O cliente nao precisa abandonar Brasil; precisa abrir acesso para um universo maior de emissores, setores, geografias e moedas, reduzindo a dependencia estrutural do mesmo ciclo domestico.",
      },
      {
        layout: "image-full",
        section: "Mercado Global",
        title: "Brasil e uma fatia muito pequena do mercado global",
        image: {
          htmlAlt: "Participacao do Brasil nos indices MSCI e no PIB do G20",
        },
        notes:
          "Use o grafico para mostrar que ficar 100 por cento no Brasil equivale a aceitar um recorte muito pequeno do mercado mundial. O investidor sente conforto domestico, mas assume concentracao severa.",
      },
      {
        layout: "image-full",
        section: "Mercado Global",
        title:
          "Renda fixa global: o investidor brasileiro acessa so uma fracao do mercado",
        image: {
          htmlAlt: "Tamanho do mercado de titulos corporativos",
        },
        frame: {
          x: 1.18,
          y: 2.06,
          w: 10.98,
          h: 4.82,
        },
        notes:
          "Este slide deve reproduzir a logica do HTML: mesmo na renda fixa, onde o investidor brasileiro se sente mais confortavel, a profundidade do mercado local e pequena frente ao mercado global de credito corporativo.",
      },
      {
        layout: "image-full",
        section: "Mercado Global",
        title: "O mercado global oferece uma fronteira muito mais ampla de oportunidades",
        image: {
          htmlAlt: "J.P. Morgan: Local investing and global opportunities",
        },
        frame: {
          x: 1.08,
          y: 2.04,
          w: 11.12,
          h: 4.84,
        },
        notes:
          "Use a imagem do J.P. Morgan como ponte narrativa: o investidor domestico costuma olhar o mesmo jardim de sempre, enquanto o mercado global abre acesso a muito mais classes, regioes e combinacoes de risco e retorno.",
      },
      {
        layout: "image-full",
        section: "Mercado Global",
        title: "Acoes internacionais: o investidor brasileiro ainda aloca muito pouco",
        image: {
          htmlAlt: "Alocacao dos investidores em acoes internacionais por pais",
        },
        frame: {
          x: 1.14,
          y: 2.06,
          w: 11.04,
          h: 4.82,
        },
        notes:
          "A mensagem aqui e de vies domestico. Em comparacao internacional, o investidor brasileiro ainda mantem pouca exposicao a acoes globais, mesmo com o mercado local representando uma parcela pequena do universo investivel.",
      },
      {
        layout: "image-full",
        section: "Setores",
        title: "Setores: O Mundo se Transformou, o Brasil Ficou Parado",
        image: {
          htmlAlt: "Maiores empresas: Ibovespa vs S&P 500 ao longo do tempo",
        },
        notes:
          "Mostre a diferenca entre uma bolsa ainda dominada por bancos, commodities e Petrobras/Vale versus o S and P 500 com tecnologia, plataformas, cloud, semicondutores e IA. A diversificacao geografica tambem e setorial.",
      },
      {
        layout: "image-pair",
        section: "Risco Brasil",
        title: "Risco Brasil: A Ilus\u00E3o da Estabilidade do CDI",
        images: [
          {
            htmlAlt: "CDS 5 anos por pais",
            caption: "CDS 5 anos",
          },
          {
            htmlAlt: "Paises com rating melhor que o Brasil",
            caption: "Rating soberano",
          },
        ],
        notes:
          "O ponto aqui e mostrar que estabilidade percebida em reais nao significa neutralidade. O mercado global continua precificando o Brasil como risco relevante e isso afeta patrimonio concentrado localmente.",
      },
      {
        layout: "bars-horizontal",
        section: "Moedas",
        title: "Deprecia\u00E7\u00E3o de Moedas Frente ao D\u00F3lar (\u00FAltimos 10 anos)",
        bars: [
          { label: "Peso Argentino", value: -98.3, display: "-98,3%" },
          { label: "Lira Turca", value: -93.0, display: "-93,0%" },
          {
            label: "Real Brasileiro",
            value: -60.0,
            display: "~ -60%",
            highlight: true,
          },
          { label: "Peso Colombiano", value: -51.5, display: "-51,5%" },
          { label: "Rand Sul-Africano", value: -45.0, display: "~ -45%" },
          { label: "Iene Japones", value: -30.9, display: "-30,9%" },
          { label: "Dolar Australiano", value: -26.8, display: "-26,8%" },
          { label: "Peso Mexicano", value: -24.6, display: "-24,6%" },
          { label: "Libra Esterlina", value: -21.3, display: "-21,3%" },
          { label: "Euro", value: -18.0, display: "~ -18%" },
        ],
        notes:
          "Este slide entra logo depois de CDS e rating para mostrar que o risco Brasil nao esta so no soberano. Ele tambem aparece na moeda e no poder de compra internacional do patrimonio.",
      },
      {
        layout: "image-stack",
        section: "Retornos",
        title: "Retornos Globais em Perspectiva",
        images: [
          {
            htmlAlt: "Comparacao de retornos: CDI vs 60/40 vs S&P 500",
            caption: "CDI vs 60/40 vs S&P 500",
          },
          {
            htmlAlt: "Evolucao nominal de US$ 100k em 20 anos",
            caption: "Evolucao nominal de US$ 100 mil em 20 anos",
          },
        ],
        frame: {
          x: 1.62,
          y: 2.08,
          w: 10.1,
        },
        topHeight: 2.02,
        bottomHeight: 2.24,
        gap: 0.08,
        notes:
          "O pedido do deck aqui e visual: primeiro a comparacao de retornos, depois a evolucao do patrimonio em dolar como continuidade da mesma historia. A leitura e que ganhar em reais nao basta quando a referencia patrimonial e moeda forte.",
      },
      {
        layout: "image-full",
        section: "Risco vs. Retorno",
        title: "Risco vs. Retorno: A Inefici\u00EAncia dos Ativos Brasileiros",
        image: {
          htmlAlt: "Retorno acumulado vs volatilidade anualizada - 20 anos",
        },
        frame: {
          x: 1.24,
          y: 2.04,
          w: 10.86,
          h: 4.84,
        },
        notes:
          "Este slide fica sozinho para dar peso ao argumento. Em dolar, os ativos brasileiros aparecem piores na combinacao risco-retorno do que diversas alternativas globais.",
      },
      {
        layout: "image-full",
        section: "Protecao",
        title: "O D\u00F3lar como Prote\u00E7\u00E3o em Momentos de Crise",
        image: {
          htmlAlt: "Dolar vs benchmarks Brasil - Retorno anual",
        },
        frame: {
          x: 1.24,
          y: 2.04,
          w: 10.86,
          h: 4.84,
        },
        notes:
          "Aqui a narrativa deve ser de hedge natural. Nos anos de estresse local, a exposicao dolarizada funcionou como amortecedor relevante em reais.",
      },
      {
        layout: "timeline",
        section: "Acesso",
        title: "O que Mudou: De Privil\u00E9gio a Acess\u00EDvel",
        items: [
          {
            year: "Antes de 2018",
            title: "Mercado restrito",
            body:
              "Exterior era assunto de clientes private, com minimos altos e processo operacional pesado.",
          },
          {
            year: "2018-2021",
            title: "Primeira abertura",
            body:
              "Plataformas focadas no investidor brasileiro comecam a reduzir barreiras e simplificar a entrada.",
          },
          {
            year: "2022-2024",
            title: "Infraestrutura melhora",
            body:
              "Cambio mais fluido, integracao com apps brasileiros e acesso mais amplo a mutual funds, bonds e treasuries.",
          },
          {
            year: "2025-Hoje",
            title: "Acesso virou rotina",
            body:
              "Conta mais simples, relatorios de IR, alternativas sem estate tax e assessoria para perfis diferentes.",
          },
        ],
        notes:
          "Use este slide como timeline curta. A mensagem e que o investidor brasileiro nao ficou sofisticado de repente; foi a infraestrutura que melhorou e transformou o exterior em algo operacionalmente acessivel.",
      },
      {
        layout: "metrics",
        section: "Tributacao e Sucessao",
        title: "Tributa\u00E7\u00E3o e Sucess\u00E3o: O Problema que Tamb\u00E9m Ficou Mais Simples",
        kicker:
          "Hoje a conversa ficou objetiva: aliquota, dividendos, estate tax e TOD.",
        metrics: [
          { value: "15%", label: "Ganho de capital sobre o saldo liquido anual" },
          {
            value: "30%",
            label: "Retencao na fonte sobre dividendos de acoes, ETFs e REITs dos EUA",
          },
          {
            value: "US$ 60 mil",
            label: "Faixa em que ativos de raiz americana entram no radar do estate tax",
          },
          {
            value: "TOD",
            label: "Designacao da conta para agilizar a transferencia sucessoria",
          },
        ],
        notes:
          "O objetivo aqui e simplificar a leitura para o cliente. Sem entrar em estruturas societarias, a conversa fica ancorada em quatro referencias praticas: ganho de capital, dividendos, estate tax e TOD.",
      },
      {
        layout: "table",
        section: "Tributacao e Sucessao",
        title: "Ve\u00EDculo certo simplifica imposto e sucess\u00E3o",
        headers: ["Veiculo", "Tributacao principal", "Atencao sucessoria"],
        rows: [
          [
            "Mutual Funds Irlanda/Luxemburgo",
            "Nao distribuem dividendos ao cotista e tendem a ser mais eficientes do que a exposicao direta a ETFs americanos.",
            "Ficam fora do estate tax americano para nao residentes.",
          ],
          [
            "Bonds, Treasuries e CDs",
            "Permitem renda e preservacao em dolar com apuracao objetiva para a pessoa fisica.",
            "Sao alternativas que nao entram no estate tax americano para nao residentes.",
          ],
          [
            "Acoes, ETFs e REITs dos EUA",
            "Dividendos sofrem retencao de 30% na fonte e o ganho de capital entra na regra anual de 15%.",
            "Entram na base do estate tax acima de US$ 60 mil.",
          ],
        ],
        notes:
          "A ideia aqui e reproduzir a leitura pratica do HTML e da apresentacao de tributacao: antes de pensar em estrutura complexa, o cliente precisa entender que o veiculo escolhido altera eficiencia tributaria e risco sucessorio.",
      },
      {
        layout: "cards",
        section: "Estate Tax",
        title: "Quais ativos entram no Estate Tax e quais ficam fora",
        cards: [
          {
            tag: "Sujeitos",
            tone: "red",
            title: "Entram no estate tax",
            body:
              "Acoes americanas, ETFs domiciliados nos EUA e REITs entram na base de calculo para nao residentes.",
          },
          {
            tag: "Nao sujeitos",
            tone: "green",
            title: "Ficam fora desse risco",
            body:
              "Mutual Funds Irlanda/Luxemburgo, bonds individuais, Treasuries e CDs ajudam a afastar o risco sucessorio.",
          },
        ],
        notes:
          "A conta nao e o problema. O problema e o ativo com raiz americana acima da faixa relevante. Use o slide para separar risco sucessorio do simples fato de ter conta internacional.",
      },
      {
        layout: "table",
        section: "Estate Tax",
        title: "O imposto incide apenas sobre o excedente acima de US$ 60 mil",
        headers: ["Base tributavel acima de US$ 60 mil", "Aliquota"],
        rows: [
          ["Ate US$ 10 mil", "18%"],
          ["De US$ 10 mil ate US$ 20 mil", "20%"],
          ["De US$ 20 mil ate US$ 40 mil", "22%"],
          ["De US$ 40 mil ate US$ 60 mil", "24%"],
          ["De US$ 60 mil ate US$ 80 mil", "26%"],
          ["De US$ 80 mil ate US$ 100 mil", "28%"],
          ["De US$ 100 mil ate US$ 150 mil", "30%"],
          ["De US$ 150 mil ate US$ 250 mil", "32%"],
          ["De US$ 250 mil ate US$ 500 mil", "34%"],
          ["De US$ 500 mil ate US$ 750 mil", "36%"],
          ["De US$ 750 mil ate US$ 1 milhao", "38%"],
          ["Acima de US$ 1 milhao", "40%"],
        ],
        footnote:
          "Mensagem-chave: o risco nao desaparece porque a carteira e diversificada. O que reduz o problema e a combinacao entre veiculo correto, TOD preenchido e, em alguns casos, estrutura patrimonial.",
        notes:
          "Explique a progressividade e reforce que o Brasil nao possui tratado sucessorio com os Estados Unidos para ampliar a faixa de isencao do investidor brasileiro.",
      },
      {
        layout: "image-full",
        section: "Estate Tax",
        title: "Estate Tax: como funciona para ativos de raiz americana",
        image: {
          path: "assets/tributacao/estate-tax.png",
        },
        frame: {
          x: 2.16,
          y: 2.08,
          w: 9.02,
          h: 4.82,
        },
        notes:
          "Use a mesma imagem do material de tributacao. Ela resolve melhor a explicacao do que um slide recriado com texto demais.",
      },
      {
        layout: "steps",
        section: "TOD",
        title: "TOD: a provid\u00EAncia b\u00E1sica da conta internacional",
        steps: [
          {
            number: "1",
            title: "Designacao em vida",
            body:
              "O cliente registra antecipadamente quem recebera os ativos mantidos naquela conta internacional.",
          },
          {
            number: "2",
            title: "Transferencia mais direta",
            body:
              "A corretora usa essa designacao para encaminhar a transferencia sem exigir o mesmo rito de inventario americano.",
          },
          {
            number: "3",
            title: "Menos custo e demora",
            body:
              "TOD ajuda a evitar probate e agiliza o processo, mas nao elimina estate tax se a carteira seguir exposta a ativos de raiz americana.",
          },
        ],
        notes:
          "Este slide deve seguir a logica da apresentacao de tributacao: TOD resolve transferencia da conta, nao resolve sozinho o risco de estate tax.",
      },
      {
        layout: "image-full",
        section: "Acesso",
        title: "Hoje existem caminhos diferentes para perfis diferentes",
        image: {
          path: "assets/diversificacao/seguimentos.png",
        },
        frame: {
          x: 2.06,
          y: 2.12,
          w: 9.2,
          h: 4.78,
        },
        notes:
          "Use o asset extraido do HTML diretamente no slide. A ideia aqui nao e reconstruir os cards, e sim preservar o visual que ja ficou bom na pagina.",
      },
      {
        layout: "steps",
        section: "Como Comecar",
        title: "Primeiros Passos: Como Come\u00E7ar Sua Diversifica\u00E7\u00E3o Internacional",
        steps: [
          {
            number: "1",
            title: "Definir o objetivo",
            body:
              "Decidir se a parcela internacional busca ampliar oportunidades, proteger em moeda forte, gerar renda ou organizar sucessao.",
          },
          {
            number: "2",
            title: "Escolher o caminho simples",
            body:
              "Na maioria dos casos, conta internacional com mutual funds globais e renda fixa em dolar ja resolve grande parte da necessidade.",
          },
          {
            number: "3",
            title: "Organizar imposto e sucessao",
            body:
              "Usar relatorios, preencher TOD e so adicionar complexidade quando o patrimonio realmente pedir.",
          },
          {
            number: "4",
            title: "Escalar aos poucos",
            body:
              "A alocacao internacional pode crescer gradualmente, com disciplina e revisao, ate ganhar peso natural no patrimonio.",
          },
        ],
        notes:
          "Fechamento do deck: o desafio principal deixou de ser operacional. O investidor consegue comecar pequeno, com mais clareza, e adicionar complexidade apenas se fizer sentido.",
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
      dark: "132235",
      navy: "1B3045",
      gold: "C4963C",
      goldLight: "E6C57D",
      warm: "F7EFE2",
      surface: "FFFDFC",
      text: "2B3A48",
      muted: "67788A",
      border: "DDD1BF",
    },
    fonts: {
      title: "DM Serif Display",
      body: "Source Sans 3",
    },
    cover: {
      eyebrow: "Alta Vista Investimentos | Guia do Cliente",
      title: "Tributacao de Investimentos Internacionais",
      subtitle:
        "Um deck visual sobre ganho de capital, dividendos, estate tax, TOD e quando a PIC entra na conversa patrimonial.",
      chips: ["15% ganho de capital", "30% dividendos EUA", "Estate tax e TOD"],
      notes:
        "Abra explicando que o tema nao e decorar siglas. O ponto e entender como veiculo, jurisdicao e sucessao mudam retorno liquido e risco patrimonial.",
    },
    slides: [
      {
        layout: "metrics",
        section: "Visao Geral",
        title: "Tributacao e sucessao entram na decisao desde o primeiro dolar",
        kicker: "Veiculo, jurisdicao e estrutura sucessoria alteram retorno liquido e complexidade patrimonial.",
        metrics: [
          { value: "15%", label: "Ganho de capital sobre saldo liquido" },
          { value: "30%", label: "Dividendos de acoes, ETFs e REITs dos EUA" },
          { value: "US$ 60 mil", label: "Faixa de atencao para estate tax" },
          { value: "US$ 500 mil+", label: "Faixa em que PIC entra na analise" },
        ],
        notes:
          "Mensagem de abertura: a conversa nao comeca no ticker. Antes do ativo, importa o envelope juridico e como a familia ficara exposta a dividendos, estate tax e sucessao.",
      },
      {
        layout: "cards",
        section: "Visao Geral",
        title: "Duas lentes praticas para montar a carteira",
        cards: [
          {
            tag: "Premissa",
            tone: "gold",
            title: "Ponto de partida",
            body:
              "Para a pessoa fisica residente no Brasil, o exterior exige leitura conjunta de ativo, veiculo, tributacao corrente e sucessao.",
          },
          {
            tag: "Leitura pratica",
            tone: "blue",
            title: "O que realmente muda",
            body:
              "Nao basta escolher entre renda fixa, acoes ou fundos. Importa saber se o ativo distribui dividendos, se tem raiz americana e se a sucessao esta organizada.",
          },
          {
            tag: "Atencao",
            tone: "green",
            title: "Gestao tributaria",
            body:
              "Na pratica da pessoa fisica, perdas de aplicacoes financeiras no exterior podem compensar rendimentos financeiros no exterior no mesmo periodo de apuracao, sem segregacao por classe de ativo.",
          },
        ],
        notes:
          "Este slide deve soar como leitura pratica do HTML: duas lentes principais e um lembrete de organizacao tributaria. Na narrativa de pessoa fisica, o ponto principal e que a Receita trata essas perdas e rendimentos financeiros no exterior em conjunto no mesmo periodo de apuracao.",
      },
      {
        layout: "table",
        section: "Aliquotas",
        title: "A diferenca pratica aparece menos no ganho de capital e mais nos dividendos",
        headers: ["Classe de ativo", "Ganho de capital", "Dividendos"],
        rows: [
          [
            "Bonds e Treasuries",
            "15% sobre o ganho. Cupons e ganho de capital entram nessa logica.",
            "0, porque nao distribuem dividendos.",
          ],
          [
            "Acoes, ETFs e REITs dos EUA",
            "15% sobre o ganho.",
            "30% retido na fonte.",
          ],
          [
            "Mutual Funds",
            "15% sobre o ganho.",
            "0 para o cotista, com reinvestimento interno.",
          ],
        ],
        footnote:
          "Duas carteiras com retorno bruto parecido podem gerar resultados liquidos muito diferentes se uma delas distribui dividendos com retencao de 30% e a outra reinveste internamente.",
        notes:
          "Explique a regra-base: ganho de capital em reais, aliquota de 15 por cento e pagamento no ajuste anual. O divisor de aguas economico aparece nos dividendos e no veiculo escolhido.",
      },
      {
        layout: "cards",
        section: "Aliquotas",
        title: "Exposicao direta e mutual funds nao tem o mesmo atrito tributario",
        cards: [
          {
            tone: "red",
            title: "Quando a exposicao e direta",
            body:
              "Acoes, ETFs e REITs domiciliados nos EUA carregam retencao de 30% na fonte sobre dividendos.",
          },
          {
            tone: "green",
            title: "Como mutual funds ajudam",
            body:
              "O cotista nao recebe dividendos. O fundo reinveste internamente e melhora o compounding no longo prazo.",
          },
        ],
        notes:
          "Este slide existe para martelar o tema economico do HTML: nao e so uma questao de ativo, mas do envelope em que o investidor acessa a exposicao internacional.",
      },
      {
        layout: "image-full",
        section: "Estate Tax",
        title: "Antes do ativo, vale fixar a regra-base do Estate Tax",
        image: {
          path: "assets/tributacao/estate-tax.png",
        },
        frame: {
          x: 0.84,
          y: 2.12,
          w: 11.68,
          h: 4.86,
        },
        notes:
          "Use este slide para explicar a regra-base antes de entrar nos ativos sujeitos. O objetivo e deixar claro que o problema nao e simplesmente investir fora, mas manter exposicao relevante a ativos de raiz americana acima da faixa de US$ 60 mil.",
      },
      {
        layout: "cards",
        section: "Estate Tax",
        title: "Depois da regra-base, importa saber quais ativos entram no risco",
        cards: [
          {
            tag: "Sujeitos",
            tone: "red",
            title: "Entram no estate tax",
            body:
              "Acoes americanas, ETFs domiciliados nos EUA e REITs entram na base de calculo para nao residentes.",
          },
          {
            tag: "Nao sujeitos",
            tone: "green",
            title: "Ficam fora desse risco",
            body:
              "Mutual Funds Irlanda/Luxemburgo, bonds individuais, Treasuries e CDs ajudam a afastar o risco sucessorio.",
          },
        ],
        notes:
          "A conta nao e o problema. O problema e o ativo com raiz americana acima da faixa relevante. Use o slide para separar risco sucessorio do simples fato de ter conta internacional.",
      },
      {
        layout: "table",
        section: "Estate Tax",
        title: "O imposto incide apenas sobre o excedente acima de US$ 60 mil",
        headers: ["Base tributavel acima de US$ 60 mil", "Aliquota"],
        rows: [
          ["Ate US$ 10 mil", "18%"],
          ["De US$ 10 mil ate US$ 20 mil", "20%"],
          ["De US$ 20 mil ate US$ 40 mil", "22%"],
          ["De US$ 40 mil ate US$ 60 mil", "24%"],
          ["De US$ 60 mil ate US$ 80 mil", "26%"],
          ["De US$ 80 mil ate US$ 100 mil", "28%"],
          ["De US$ 100 mil ate US$ 150 mil", "30%"],
          ["De US$ 150 mil ate US$ 250 mil", "32%"],
          ["De US$ 250 mil ate US$ 500 mil", "34%"],
          ["De US$ 500 mil ate US$ 750 mil", "36%"],
          ["De US$ 750 mil ate US$ 1 milhao", "38%"],
          ["Acima de US$ 1 milhao", "40%"],
        ],
        footnote:
          "Mensagem-chave: o risco nao desaparece porque a carteira e diversificada. O que reduz o problema e a combinacao entre veiculo correto, TOD preenchido e, em alguns casos, estrutura patrimonial.",
        notes:
          "Explique a progressividade e reforce que o Brasil nao possui tratado sucessorio com os Estados Unidos para ampliar a faixa de isencao do investidor brasileiro.",
      },
      {
        layout: "steps",
        section: "TOD",
        title: "TOD e a providencia basica para a conta internacional",
        steps: [
          {
            number: "1",
            title: "Designacao em vida",
            body:
              "O cliente escolhe antecipadamente quem recebera os ativos mantidos naquela conta internacional.",
          },
          {
            number: "2",
            title: "Transferencia mais direta",
            body:
              "A corretora usa essa designacao para encaminhar a transferencia sem exigir o mesmo rito de inventario americano.",
          },
          {
            number: "3",
            title: "Menos custo e menos demora",
            body:
              "TOD evita um processo judicial mais caro e lento, mas precisa vir junto de revisao da composicao dos ativos.",
          },
        ],
        notes:
          "Diferencie bem o que TOD resolve e o que ele nao resolve. Ele evita probate e acelera a transferencia, mas nao elimina estate tax se a carteira continuar com raiz americana.",
      },
      {
        layout: "cards",
        section: "PIC Offshore",
        title: "PIC offshore entra quando a conversa deixa de ser apenas de produto",
        cards: [
          {
            tag: "Funcao patrimonial",
            tone: "gold",
            title: "Como a PIC ajuda",
            body:
              "A empresa concentra investimentos no exterior, organiza governanca e faz a sucessao ocorrer nas cotas da companhia.",
          },
          {
            tag: "Quando faz sentido",
            tone: "blue",
            title: "Quando entra na conversa",
            body:
              "Quando o patrimonio comporta custos, ha necessidade de ativos de raiz americana ou a sucessao pede estrutura mais sofisticada.",
          },
        ],
        notes:
          "Reforce que PIC nao e resposta padrao. Ela e uma camada societaria para casos patrimoniais especificos, e nao um ponto de partida universal.",
      },
      {
        layout: "metrics",
        section: "PIC Offshore",
        title: "Custos tipicos da estrutura offshore",
        metrics: [
          { value: "US$ 3k a 5k", label: "Constituicao" },
          { value: "US$ 2k a 4k", label: "Manutencao anual" },
          { value: "US$ 1,2k a 5k", label: "Contabilidade" },
          { value: "US$ 3,2k a 10k", label: "Custo anual total" },
        ],
        notes:
          "Mostre que a estrutura compra governanca e protecao sucessoria, mas adiciona custo recorrente. Isso ajuda a enquadrar por que o tema aparece em patrimonios maiores.",
      },
      {
        layout: "decision",
        section: "PIC Offshore",
        title: "Fluxo de decisao: quando a PIC faz sentido?",
        question: "O patrimonio offshore e superior a US$ 500.000?",
        topLeft: {
          tag: "Nao",
          title: "PIC nao recomendada",
          body:
            "Em geral, os custos nao se justificam nesse momento. Mutual Funds, bonds e outros veiculos mais simples tendem a resolver melhor.",
          tone: "warm",
        },
        topRight: {
          tag: "Sim",
          title: "O patrimonio comporta os custos",
          body:
            "Com a barreira economica superada, a decisao passa a depender de necessidade patrimonial real, nao apenas financeira.",
          tone: "surface",
        },
        middleLabel:
          "Avalie as duas perguntas abaixo de forma independente",
        middleLeft: {
          title: "Precisa manter ativos de raiz americana?",
          body: "Exemplo: ETFs dos EUA, acoes americanas ou REITs dentro da estrategia da familia.",
        },
        middleRight: {
          title: "A sucessao e complexa?",
          body: "Exemplo: multiplos herdeiros, menores de idade, patrimonio relevante ou necessidade de governanca mais sofisticada.",
        },
        bottomLeft: {
          tag: "Nao para ambas",
          title: "PIC dispensavel",
          body:
            "Mutual Funds, bonds e TOD costumam resolver a necessidade com menos custo e menos complexidade.",
          tone: "warm",
        },
        bottomRight: {
          tag: "Sim para qualquer uma",
          title: "PIC recomendada para analise",
          body:
            "Nesse cenario, a estrutura pode afastar o estate tax e organizar a sucessao de forma corporativa, se o custo fizer sentido.",
          tone: "green",
        },
        notes:
          "O fluxo deve reproduzir o HTML: primeiro a barreira de tamanho patrimonial, depois duas perguntas independentes sobre necessidade real. A mensagem final e que PIC so entra quando custo e caso justificam.",
      },
      {
        layout: "table",
        section: "Resumo",
        title: "Resumo consolidado",
        headers: ["Tema", "Ponto principal", "Leitura pratica"],
        rows: [
          [
            "Ganho de capital",
            "Apuracao em reais com aliquota-base de 15% sobre saldo liquido.",
            "O imposto so aparece se houver venda com lucro ao longo do ano.",
          ],
          [
            "Dividendos",
            "Acoes, ETFs e REITs dos EUA sofrem retencao de 30%; Mutual Funds reinvestem internamente.",
            "O veiculo escolhido muda bastante a eficiencia tributaria no longo prazo.",
          ],
          [
            "Ativos de raiz americana",
            "Entram no escopo do estate tax acima de US$ 60 mil.",
            "Retorno e liquidez nao bastam: e preciso olhar o risco sucessorio.",
          ],
          [
            "TOD",
            "Evita o inventario americano, mas nao elimina o estate tax.",
            "Deveria ser providencia basica para quem ja tem conta internacional.",
          ],
          [
            "PIC",
            "Pode ser transparente ou opaca e funciona como estrutura patrimonial.",
            "Faz sentido em patrimonio maior, ativos americanos e/ou sucessao complexa.",
          ],
        ],
        footnote:
          "Em uma frase: investir fora nao e so comprar ativos globais. E escolher a forma mais eficiente de acessar o exterior, proteger patrimonio e simplificar a sucessao.",
        notes:
          "Feche com a sequencia pratica do HTML: escolher o veiculo, organizar a sucessao basica e escalar complexidade apenas quando houver motivo patrimonial.",
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
      dark: "132235",
      navy: "1C3046",
      gold: "C4963C",
      goldLight: "E3BE74",
      warm: "F5ECDF",
      surface: "FFFDFC",
      text: "293949",
      muted: "677789",
      border: "DDD1BF",
    },
    fonts: {
      title: "DM Serif Display",
      body: "Source Sans 3",
    },
    cover: {
      eyebrow: "Alta Vista Investimentos | Guia pratico para assessor",
      title: "Guia HUB Investimentos Internacionais",
      subtitle:
        "Um deck operacional e visual para navegar no HUB, orientar TOD, executar cambio e acompanhar produtos.",
      chips: ["Navegacao", "Cambio D0", "Conta Global e TOD"],
      notes:
        "Introducao do fluxo. O assessor passa por quatro frentes: entrar no ambiente certo, ler a situacao do cliente, executar funding em cambio e transformar a conta abastecida em alocacao e acompanhamento.",
    },
    slides: [
      {
        layout: "statement",
        section: "Jornada",
        title: "Pense o HUB como uma jornada conectada",
        kicker: "Entrada, leitura do cliente, funding internacional e distribuicao de produtos.",
        notes:
          "Abra o guia com a logica da jornada. Isso reduz retrabalho e ajuda o assessor a nao navegar sem contexto.",
      },
      {
        layout: "image-pair",
        section: "Navegacao",
        title: "Menu lateral e regua superior trabalham juntos",
        images: [
          {
            path: "assets/hub/Hub1.png",
            caption: "Entrada em Investimento Global",
          },
          {
            path: "assets/hub/HUB2.png",
            caption: "Regua superior",
          },
        ],
        notes:
          "Explique que o menu lateral e porta de entrada. A regua superior organiza a execucao depois que o assessor ja esta dentro da frente internacional.",
      },
      {
        layout: "image-pair",
        section: "Cliente",
        title: "A tela do cliente concentra o contexto antes da proxima acao",
        images: [
          {
            path: "assets/hub/abertura de conta.png",
            caption: "Push de abertura",
          },
          {
            path: "assets/hub/cliente dados.png",
            caption: "Status da conta e dados",
          },
        ],
        notes:
          "Mostre os dois cenarios: cliente ainda sem conta global e cliente com conta ja ativa. O ponto e que a tela ajuda a decidir se o assessor precisa abrir conta, revisar dados ou avancar para cambio.",
      },
      {
        layout: "image-full",
        section: "Cliente",
        title: "Carteira consolidada ajuda a avaliar o ponto de partida",
        image: {
          path: "assets/hub/HUB carteira.png",
        },
        notes:
          "Use este slide para reforcar a leitura de saldos e posicoes local e offshore. E uma tela de contexto antes de funding e produto.",
      },
      {
        layout: "image-triptych",
        section: "TOD no App",
        title: "TOD pelo aplicativo em tres telas",
        images: [
          {
            path: "assets/hub/conta internacional HUB.png",
            caption: "Conta Global",
          },
          {
            path: "assets/hub/Caminho tod.png",
            caption: "Sucessao Patrimonial",
          },
          {
            path: "assets/hub/Cadastrar TOD.png",
            caption: "Cadastrar beneficiario",
          },
        ],
        notes:
          "Oriente a sequencia: entrar na Conta Global pelo globo, descer ate Sucessao Patrimonial e concluir o cadastro de beneficiario. Trate TOD como parte natural da ativacao da conta.",
      },
      {
        layout: "image-pair",
        section: "Cambio",
        title: "Da navegacao ao clique em Fazer Cambio",
        images: [
          {
            path: "assets/hub/caminho para cambio.png",
            caption: "Entrada em cambio",
          },
          {
            path: "assets/hub/cambio.png",
            caption: "Tela do cliente",
          },
        ],
        notes:
          "Mostre a sequencia operacional: entrar em cambio, localizar o cliente, confirmar saldo e somente depois clicar em Fazer Cambio.",
      },
      {
        layout: "image-full",
        section: "Cambio",
        title: "A boleta e a conferencia final antes do envio",
        image: {
          path: "assets/hub/boleta cambio.png",
        },
        frame: {
          x: 4.02,
          y: 2.18,
          w: 5.32,
          h: 4.72,
        },
        notes:
          "Fale do checklist: conta de origem, valor em reais, spread, impostos, comissao e total estimado a receber. Como a liquidacao e D0, essa revisao precisa ser disciplinada.",
      },
      {
        layout: "image-full",
        section: "Produtos",
        title: "Depois do funding, a prateleira vira ponto de distribuicao",
        image: {
          path: "assets/hub/produtos.png",
        },
        notes:
          "Mostre que a jornada nao termina no cambio. A conta precisa virar proposta de alocacao com fundos, equities, bonds, tesouro, CDs ou notas estruturadas.",
      },
      {
        layout: "image-full",
        section: "Acompanhamento",
        title: "A Central de Operacoes fecha o ciclo",
        image: {
          path: "assets/hub/Acompanhamentos.png",
        },
        frame: {
          x: 2.44,
          y: 2.18,
          w: 6.52,
          h: 4.72,
        },
        notes:
          "Fechamento operacional. Use a tela para acompanhar depositos e saques ligados ao cambio e os pushs de ativos internacionais enviados ao cliente.",
      },
    ],
  },
];
