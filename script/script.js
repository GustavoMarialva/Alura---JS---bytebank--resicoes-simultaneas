import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar");

const graficoParaDOlar = new Chart(graficoDolar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dolar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

function geraHorario() {
  let data = new Date();
  let horario =
    data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  console.log(horario);
  return horario;
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  // Com isso, criamos a função adicionarDados() que recebe como parâmetro o grafico que construímos, a legenda contendo a hora em que a requisição foi feita, e os dados que serão o valor da moeda em si.
  // Dentro disso, pegamos o gráfico que criamos e, na linha em que criamos o gráfico com graficoParaDolar, entramos dentro de data: que é o gráfico, e dentro teremos labels que se traduz como "legenda".
  // Então acessamos este valor labels: e aplicamos o método .push() que pegará a lista e inserirá um valor no final.
  // Já temos alguns valores que vieram por padrão do Chart.js, então apagaremos e deixaremos os colchetes de labels: em branco. Com isso, poderemos prosseguir com a adicionarDados() inserindo outros dados como aconteceu na moeda em si.
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
    grafico.update();
    // Neste caso, é semelhante também. Iremos ao nosso gráfico em graficoParaDolas, entraremos em data:, depois em datasets: e, dentro dele, teremos label:, data: e borderWidth:.

    // Queremos acessar o segundo, por isso escrevemos dataset.data, seguido do .push() para inserir os novos valores que enviarmos à função adicionarDados() para ir ao final da lista e acrescentar.

    // Porém, data: já está com valores e iremos remover todos que estão entre os colchetes. Já em label:, apagaremos o '# of Votes' e deixaremos apenas 'Dolar'.
  });
}
// Em resumo, construímos uma requisição do tipo GET para uma API. Como não sabemos se o retorno será rápido ou demorado, transformamos essa função em assíncrona. Desse modo, conseguimos esperar o retorno sem travar o restante do código.

// Assim, temos uma conexão com uma biblioteca externa chamada Chart.js e uma requisição a uma API de cotação de moedas. Já conseguimos nos conectar com todos os recursos externos necessários para desenvolver nosso projeto.

// **********************
// Qual a função do setInterval()? Ele define um intervalo para algo acontecer, recebendo como parâmetro uma ação — neste caso, a chamada da API — junto ao tempo de duração de cada ciclo em milissegundos — neste caso, 5000 milissegundos que é equivalente à 5 segundos.

let workerDolar = new Worker("./script/worker/workerDolar.js");
// ler sobre worker no Notion
workerDolar.postMessage("usd");
// Podemos chamar essa etapa de processo multithread.
workerDolar.addEventListener("message", (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar", valor);
  adicionarDados(graficoParaDOlar, tempo, valor);
});
// Selecionamos o workerDolar e adicionamos um addEventListener específico para ele.
// Podemos considerar o addEventListener um fofoqueiro que gosta de ouvir o que os outros estão fazendo!
// Ele esperou o workerDolar enviar uma mensagem, e a cada mensagem recebida ele recolhe os seus valores através do event e realiza as tarefas que adicionamos entre as chaves:
// exibir o horário na variável tempo;
// exibir o valor da cotação daquela moeda naquele horário na variável valor através do event.data.ask, onde ele recebe a mensagem enviada e recolhe o valor da venda por meio do .ask enviado pela API;
// chamar a função imprimeCotacao() para imprimir os valores da moeda e adicionar os dados no gráfico.
// O processo que realizamos acima é bem semelhante ao que fizemos antes, contudo, agora a conexão da API é feita por um trabalhador em segundo plano. Isso evita que o navegador trave em momentos de erro ou demora nas requisições.

const graficoIene = document.getElementById("graficoIene");
const graficoParaIene = new Chart(graficoIene, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Iene",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

let workerIene = new Worker("./script/worker/workerIene.js");

workerIene.postMessage("iene");

workerIene.addEventListener("message", (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("iene", valor);
  adicionarDados(graficoParaIene, tempo, valor);
});

const graficoPesoARG = document.getElementById("graficoPesoARG");
const graficoParaPesoARG = new Chart(graficoPesoARG, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Peso ARG",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

let workerPesoARG = new Worker("./script/worker/workerPesoAR.js");

workerPesoARG.postMessage("peso");

workerPesoARG.addEventListener("message", (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("ars", valor);
  adicionarDados(graficoParaPesoARG, tempo, valor);
});
