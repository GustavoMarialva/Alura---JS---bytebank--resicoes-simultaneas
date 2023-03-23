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
setInterval(() => conectaAPI(), 5000);
async function conectaAPI() {
  const conecta = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  );
  const conectaTraduzido = await conecta.json();
  let tempo = geraHorario();
  let valor = conectaTraduzido.USDBRL.ask;
  adicionarDados(graficoParaDOlar, tempo, valor);
  // Em nosso código, colocamos o setInterval() para que conecte a API e rode a cada cinco segundos. Depois fazemos a requisição e colocamos o valor final de conectaTraduzido.USDBRL.ask para acessarmos o valor dentro do objeto referente à .ask, colocando na variável valor.
}

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
