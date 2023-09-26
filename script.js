async function buscaEndereco(cep) {
  var msgErro = document.getElementById("erro");
  msgErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPconvertida = await consultaCEP.json();
    if (consultaCEPconvertida.erro) {
      throw Error("CEP não existente!!");
    }
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");
    var bairro = document.getElementById("bairro");

    cidade.value = consultaCEPconvertida.localidade;
    logradouro.value = consultaCEPconvertida.logradouro;
    estado.value = consultaCEPconvertida.uf;
    bairro.value = consultaCEPconvertida.bairro;

    console.log(consultaCEPconvertida);
    return consultaCEPconvertida;
  } catch (erro) {
    msgErro.innerHTML = `<p> CEP inválido. Tente novamente! </p>`;
    console.log(erro);
  }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
