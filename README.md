# UDP-APP

## Descrição

Fluxo UDP em Node.js

## Sumário

- [Instalação](#instalação)
- [Uso](#uso)
- [Lista de Tarefas](#lista-de-tarefas)

## Instalação

1. Clone o repositório: `git clone [URL do repositório]`
2. Navegue até o diretório do projeto: `cd [diretório do projeto]`
3. Instale as dependências: `npm install`

## Uso

1. Inicie o servidor com o comando: `npm run server:dev`
2. Inicie o cliente com o comando: `npm run client:dev`

## Lista de Tarefas

0. [x] Criação da estrutura do projeto
1. [ ] Entrega ordenada para aplicação baseado na ordem dos pacotes (# de sequência).
2. [ ] Confirmação acumulativa (ACK acumulativo) do destinatário para o remetente.
3. [ ] Utilização de um Buffer de pacotes de tamanho T, onde pacotes ocupam M Bytes.
4. [ ] O tamanho de cada pacote é de, no máximo, 1024 Bytes. (M)
5. [ ] Deve haver uma janela deslizante com tamanho N no buffer do remetente e do servidor. Onde N é igual a pelo menos 10 pacotes de tamanho M.
6. [ ] Números de sequência devem ser utilizados. Eles podem ser inteiros em um total de N\*2, ou serem incrementados conforme o fluxo de bytes, como no TCP.
7. [ ] Adicione no protocolo um controle de fluxo, onde o remetente deve saber qual o tamanho da janela N do destinatário, a fim de não afogá-lo.
8. [ ] Por fim, crie um equação de controle de congestionamento, a fim de que, se a rede estiver apresentando perda (muitos pacotes com ACK pendentes e timeout), ele deve ser utilizado para reduzir o fluxo de envio de pacotes. Você deve propor um controle de congestionamento, que pode ser baseado em algum do TCP, QUIC ou qualquer outro protocolo. Lembre da Aula 13, onde há controle de congestionamento no TCP que utiliza uma janela "cwnd" e um variável "ssthresh" para controle das fases de "Slow Start" e "Congestiona Avoidance".
9. [ ] Avalie seu protocolo sobre 1 remetente (cliente) que envia um arquivo (ou dados sintéticos) de, pelo menos, 10MB, qualquer, para 1 destinatário (servidoor). Para avaliar o controle de congestionamento, insira perdas arbitrárias (ou utilizando uma função rand()) de pacotes no destinatário (você pode fazer isso sorteando a cada chegada de um novo pacotes se ele será contabilizado e processado ou descartado).

## Referência da API

[]
