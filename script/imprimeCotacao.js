const lista = document.querySelectorAll("[data-lista]");

function selecionaCotacao(nome, valor) {
  lista.forEach((listaEscolhida) => {
    if (listaEscolhida.id == nome) {
      imprimeCotacao(listaEscolhida, nome, valor);
    }
  });
}

function imprimeCotacao(lista, nome, valor) {
  lista.innerHTML = "";
  const plurais = {
    dolar: "dolares",
    iene: "ienes",
  };

  for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
    const listaItem = document.createElement("li");
    listaItem.innerHTML = `${multiplicador} ${
      multiplicador == 1 ? nome : plurais[nome]
    }: R$${(valor * multiplicador).toFixed(2)}`;
    lista.appendChild(listaItem);
  }
}

export default selecionaCotacao;

// Inicialmente, pegamos a lista e tiramos tudo o que há dentro para evitarmos a impressão da cotação constante e o crescimento exagerado da lista, pois não tem limites.

// Depois, aplicamos o for () com a repetição que começa em 1 e, a cada vez que entrar no laço, irá aumentar a multiplicação do valor de antes por dez, até o multiplicador ter um valor igual a mil.

// Observando o Figma, os valores da moeda que precisamos é um dólar, dez dólares, cem dólares e mil dólares, que no caso todos seriam multiplicados por dez.

// Dentro dessa lógica, já conseguiremos fazer os valores que estão dentro da repetição para os imprimirmos na tela. Para isso, vamos manipular o DOM.
// Com isso, criamos um elemento 'li' na variável listaItem e, dentro dele, colocamos uma string de HTML.

// Pegamos o multiplicador que seria de um, dez, cem e mil, e depois colocamos o nome da moeda, em que cada vez terá um valor de um dólar, dez dólares, cem dólares e mil dólares, e depois colocamos o valor em si com R$, onde fizemos o cálculo pegando o valor da moeda vezes o multiplicador que escolhemos.

// Por exemplo, se o valor for 5.20, faremos vezes dez, cem, mil e assim por diante. Provavelmente teremos um número gigante, e para nos garantirmos, pegaremos apenas os dois números antes da casa decimal. Por isso usamos o .toFixed(2).
