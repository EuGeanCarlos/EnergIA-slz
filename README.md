# EnergIA SLZ — consumo energético

Aplicação de navegador para cadastro de usuário/aparelhos e estimativas de consumo mensal, custo e emissão de CO₂.

## Tecnologias

- HTML
- CSS
- JavaScript
- localStorage

## Funcionalidades e utilização

Informe tarifa, potência, quantidade e horas de uso dos aparelhos; atualize o relatório. Os resultados são estimativas, e o projeto não é um medidor físico.

## Como executar

```bash
git clone https://github.com/EuGeanCarlos/EnergIA-slz.git
cd EnergIA-slz
python -m http.server 8000 --directory "."
```

Requer Python 3 para o servidor local. Abra http://localhost:8000.

## Demonstração e publicação

[Acessar demonstração verificada](https://eugeancarlos.github.io/EnergIA-slz/)

## Estrutura versionada

```text
README.md
img/logo-energIA.png
index.html
script.js
styles.css
```

## Status

Protótipo / projeto de estudo em desenvolvimento. A descrição acima distingue o que está implementado das dependências ou etapas pendentes.

## Autor e créditos

**Gean Carlos** — estudante de Engenharia de Computação, UEMA.

[GitHub](https://github.com/EuGeanCarlos)

Licenças, autoria compartilhada e atribuições existentes no código e nos materiais originais permanecem aplicáveis.

---

## Documentação original e contexto

O material original a seguir preserva contexto, créditos e planejamento. Para execução e limitações atuais, considere as seções de auditoria acima.

# 🌱 Energia Inteligente SLZ

**Eficiência energética acessível para São Luís (MA)**

O **Energia Inteligente SLZ** é uma aplicação web que ajuda moradores, pequenos comércios e escolas públicas de São Luís a **reduzir o desperdício de energia elétrica** usando dados simples, cálculos claros e **inteligência artificial aplicada com responsabilidade**.

O foco não é tecnologia cara nem sensores físicos. O foco é **educação energética prática**, impacto social real e economia imediata na conta de luz.

---

## 🎯 Motivação

São Luís é quente, úmida e socialmente desigual. Em muitas residências e instituições, o alto consumo de energia não vem do luxo, mas de:

* Uso incorreto de eletrodomésticos
* Aparelhos antigos e ineficientes
* Falta de informação clara
* Desperdícios invisíveis (stand-by, horários de pico, iluminação inadequada)

Enquanto iniciativas tradicionais focam na substituição de equipamentos, este projeto atua **antes disso**: no comportamento, na decisão e na informação.

O Energia Inteligente SLZ nasce alinhado ao propósito do **EQT Lab** e do **Programa de Eficiência Energética (PEE) da Equatorial**, conectando tecnologia, dados e impacto social mensurável.

---

## 💡 A Solução

Uma aplicação web onde o usuário informa:

* Tipo de ambiente (residência, pequeno comércio ou escola)
* Bairro de São Luís
* Aparelhos elétricos utilizados
* Tempo médio de uso diário

O sistema:

* Calcula o consumo mensal estimado (kWh)
* Estima o custo mensal em reais
* Identifica pontos de desperdício
* Compara com um cenário mais eficiente
* Gera um **plano de economia personalizado**

A inteligência artificial entra como **orientadora**, não como decisora. Ela transforma dados técnicos em **recomendações simples, humanas e acionáveis**, priorizando soluções de **custo zero ou baixo custo**.

---

## 🧠 Uso de Inteligência Artificial

A IA é utilizada para:

* Analisar o perfil de consumo do usuário
* Gerar recomendações contextualizadas para São Luís
* Explicar o impacto das mudanças em linguagem acessível
* Priorizar ações por impacto, esforço e custo

Exemplo de abordagem:

> "Se você reduzir 2 horas diárias do uso do ar-condicionado, pode economizar cerca de R$ X por mês, mantendo conforto térmico com ajustes simples."

---

## 🧩 MVP – Produto Mínimo Viável

### Funcionalidades essenciais

* Cadastro simples de usuário
* Definição do tipo de ambiente
* Registro de bairro
* Cadastro de aparelhos elétricos
* Cálculo automático de consumo
* Estimativa de custo mensal
* Relatório de eficiência energética
* Recomendações personalizadas com IA

---

## 🏗️ Arquitetura

### Front-end

* HTML
* CSS
* JavaScript puro

Interface simples, objetiva e educativa.
Funcionalidade vem antes de estética excessiva.

### Back-end

* Java
* Spring Boot
* API REST
* JPA / Hibernate
* Banco de dados: PostgreSQL ou MySQL

### IA

* Integração com API do ChatGPT
* Prompts controlados e contextualizados

---

## 🗂️ Modelo Lógico (Entidades)

* **Usuario**

  * id
  * nome
  * tipoAmbiente
  * bairro

* **Aparelho**

  * id
  * nome
  * potenciaWatts

* **UsoAparelho**

  * id
  * horasPorDia
  * usuarioId
  * aparelhoId

* **RelatorioConsumo**

  * id
  * consumoMensalKwh
  * custoEstimado
  * usuarioId

* **RecomendacaoIA**

  * id
  * texto
  * usuarioId

---

## 🧪 Simulações e Diferenciais

* Simulador de economia ("E se eu mudar isso?")
* Ranking de ações por maior impacto
* Sugestões de menor esforço e menor custo
* Conceito de modo comunidade (bairros, escolas, projetos sociais)

Mesmo quando mockadas, essas ideias reforçam o **potencial de escala e impacto social** do projeto.

---

## 🌍 Impacto Social Esperado

* Redução da conta de energia
* Educação energética prática
* Menor inadimplência
* Menor sobrecarga no sistema elétrico
* Sustentabilidade local

Resultados claros, mensuráveis e diretamente conectados à realidade da Equatorial.

---

## ⚙️ Stack Tecnológica

* Front-end: HTML, CSS, JavaScript
* Back-end: Java + Spring Boot
* Banco de Dados: PostgreSQL ou MySQL
* API: REST
* IA: ChatGPT API

---

## 🚀 Pitch (20 segundos)

> "O Energia Inteligente SLZ é uma aplicação web que ajuda moradores de São Luís a reduzir o desperdício de energia usando dados reais, cálculos simples e inteligência artificial. Sem equipamentos caros, ela educa, orienta e gera economia imediata na conta de luz, unindo impacto social, sustentabilidade e eficiência energética para a Equatorial."

---

## 📅 Cronograma de Desenvolvimento (15 dias)

* Dias 1–2: Escopo final e wireframes
* Dias 3–5: Setup Spring Boot e modelagem
* Dias 6–8: API REST e cálculos de consumo
* Dias 9–10: Integração com IA
* Dias 11–12: Front-end e integração
* Dias 13–14: Testes e ajustes
* Dia 15: Pitch e apresentação

---

## 🤝 Alinhamento Estratégico

* Projeto simples e executável
* Contextualizado em São Luís
* Baixo custo de implementação
* Alto impacto social
* Escalável para outros municípios

---

**Energia Inteligente SLZ**

Tecnologia só importa quando melhora a vida real. Aqui, ela faz exatamente isso.

## Validação desta auditoria — 14/10/2026

PUBLICADO: [workflow confirmado](https://github.com/EuGeanCarlos/EnergIA-slz/actions/runs/38607968598), HTTP 200, conteúdo correspondente ao projeto e 2 recursos locais verificados. Empacotamento local e sintaxe dos arquivos JavaScript verificados; teste funcional completo e responsividade não foram executados.
