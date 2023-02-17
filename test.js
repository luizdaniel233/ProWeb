function promessa (valor) {
  return new Promise ( function (sucesso, erro) {
    setTimeout( function () {
      sucesso(valor);
    }, 1000);
  });
}

async function pegaValor () {
  console.log(1);
  var valor = await promessa(100);
  console.log(valor);
};

pegaValor();
console.log(2);