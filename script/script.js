const graficoDolar = document.getElementById("graficoDolar");

const graficoParaDOlar = new Chart(graficoDolar, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
  console.log(conectaTraduzido);
}

function geraHorario() {
  let data = new Date();
  let horario =
    data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  console.log(horario);
  return horario;
}

geraHorario();
// Em resumo, construímos uma requisição do tipo GET para uma API. Como não sabemos se o retorno será rápido ou demorado, transformamos essa função em assíncrona. Desse modo, conseguimos esperar o retorno sem travar o restante do código.

// Assim, temos uma conexão com uma biblioteca externa chamada Chart.js e uma requisição a uma API de cotação de moedas. Já conseguimos nos conectar com todos os recursos externos necessários para desenvolver nosso projeto.

// **********************
// Qual a função do setInterval()? Ele define um intervalo para algo acontecer, recebendo como parâmetro uma ação — neste caso, a chamada da API — junto ao tempo de duração de cada ciclo em milissegundos — neste caso, 5000 milissegundos que é equivalente à 5 segundos.
