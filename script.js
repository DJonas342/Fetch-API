document.addEventListener('DOMContentLoaded', ()=> {
    const cep = sessionStorage.getItem("cep");
    if(cep && cep.length === 8){
        document.getElementById("cep").value = cep;
    }
})
//1. Pegar valor do campo CEP e adicionar ouvinte 
document.getElementById("cep").addEventListener("blur", (evento) => {
        const elemento = evento.target;
        const cepInformado = elemento.value;
        sessionStorage.setItem("cep", cepInformado);
//2.Validação do CEP 
    if(!(cepInformado.length === 8)){
        return;
    }else{

        fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro
                document.getElementById('cidade').value = data.localidade
                document.getElementById('estado').value = data.uf
            } else {
                alert("CEP não encontrado");
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP", error));
    }
})
