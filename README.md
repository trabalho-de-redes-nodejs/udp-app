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
1. [x] Entrega ordenada para aplicação baseado na ordem dos pacotes (# de sequência).
2. [x] Confirmação acumulativa (ACK acumulativo) do destinatário para o remetente.
3. [x] Utilização de um Buffer de pacotes de tamanho T, onde pacotes ocupam M Bytes.
4. [x] O tamanho de cada pacote é de, no máximo, 1024 Bytes. (M)
5. [x] Deve haver uma janela deslizante com tamanho N no buffer do remetente e do servidor. Onde N é igual a pelo menos 10 pacotes de tamanho M.
6. [ ] (Falta apenas a validação de erro) Números de sequência devem ser utilizados. Eles podem ser inteiros em um total de N\*2, ou serem incrementados conforme o fluxo de bytes, como no TCP.
7. [ ] Adicione no protocolo um controle de fluxo, onde o remetente deve saber qual o tamanho da janela N do destinatário, a fim de não afogá-lo.

8. [ ] Por fim, crie um equação de controle de congestionamento, a fim de que, se a rede estiver apresentando perda (muitos pacotes com ACK pendentes e timeout), ele deve ser utilizado para reduzir o fluxo de envio de pacotes. Você deve propor um controle de congestionamento, que pode ser baseado em algum do TCP, QUIC ou qualquer outro protocolo. Lembre da Aula 13, onde há controle de congestionamento no TCP que utiliza uma janela "cwnd" e um variável "ssthresh" para controle das fases de "Slow Start" e "Congestiona Avoidance".

9. [ ] Avalie seu protocolo sobre 1 remetente (cliente) que envia um arquivo (ou dados sintéticos) de, pelo menos, 10MB, qualquer, para 1 destinatário (servidoor). Para avaliar o controle de congestionamento, insira perdas arbitrárias (ou utilizando uma função rand()) de pacotes no destinatário (você pode fazer isso sorteando a cada chegada de um novo pacotes se ele será contabilizado e processado ou descartado).

## To-do

0.0 [x] Estrutura cliente/servidor para envio de mensagens
1.0 [x] No cliente, dividir o arquivo em várias parte de tamanho N(min 10) de 1024 bytes
2.0 [x] No cliente, enviar cada parte para o servidor com cabeçalho
3.0 [x] No servidor, receber cada parte do arquivo e criar um buffer de tamanho N
4.0 [x] (async) No servidor, montar o arquivo com os dados do Buffer
4.1 [x] No cliente e servidor, realizar a operação de 3 way handshake com SYN e FYN
6.0 [ ] No cliente, fazer o controle de erro e enviar o chunk com erro novamente
6.1 [ ] No servidor, enviar a chave de integridade do arquivo montado
6.2 [ ] (async) No cliente, fazer a verificação de integridade do arquivo montado (adicionando o md5 no head da aplicação)
6.3 [ ] No cliente, se tiver errado, fale que foi erro e aparece a mensagem para enviar novamente
7.0 [x] No servidor, fazer um controle de pacotes
7.1 [x] No cliente, colocar para enviar outro pacote caso tenha espaço no servidor (Recomendo criar uma lib Tranferor, que fará o controle do unpackPipeline, recebendo um pipeline cheio)
7.2 [x] No cliente, criar uma variável ack para saber qual pacote enviar
8.0 [ ] No cliente, criar variábel de sshtresh e adicionar um estado de Slow Start e Congetion avoidance no Tranferor
9.0 [ ] No cliente e servidor, colocar um temporizador para salvar em um vetor os logs para criar o relatório

## Referência da API

[]
