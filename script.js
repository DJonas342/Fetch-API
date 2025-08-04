//1. Buscar dados e carrega-los nos campos para os campos de endereço
document.addEventListener('DOMContentLoaded', () => {
  const campos = ["cep", "logradouro", "bairro", "cidade", "estado"];

  campos.forEach(campo => {
    const valor = sessionStorage.getItem(campo);
    if (valor) {
      const input = document.getElementById(campo);
      if (input) {
        input.value = valor;
      }
    }
  });
});

//2. Pegar valor do campo CEP e adicionar ouvinte 
document.getElementById("cep").addEventListener("blur", (evento) => {
  const cepInformado = evento.target.value.trim();
//3. Validação do CEP
  if (cepInformado.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(response => response.json())
    .then(data => {
      if (!data.erro) {
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

        //Salvando os dados dos campos 
        
        sessionStorage.setItem("cep", cepInformado);
        sessionStorage.setItem("logradouro", data.logradouro);
        sessionStorage.setItem("bairro", data.bairro);
        sessionStorage.setItem("cidade", data.localidade);
        sessionStorage.setItem("estado", data.uf);
      } else {
        alert("CEP não encontrado");
      }
    })
    .catch(error => {
      console.error("Erro ao buscar o CEP", error);
    });
});
