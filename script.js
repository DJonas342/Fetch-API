//1. Buscar dados e carrega-los nos campos para os campos de endereço
document.addEventListener('DOMContentLoad', ()=> {
    const adress = ["cep", "logradouro", "bairro", "cidade", "estado"];

    adress.forEach(campos => {
        const valor = sessionStorage.getItem(campos);
        if (valor) {
            document.getElementById(campos).value = valor;
        }
    });
});

//2. Pegar valor do campo CEP e adicionar ouvinte 
document.getElementById("cep").addEventListener("blur", (evento) => {
        const cepInformado = evento.target.value.trim();
        sessionStorage.setItem("cep", cepInformado);
//3.Validação do CEP 
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
            
            //Salvando os dados dos campos 
                sessionStorage.setItem("logradouro", data.logradouro);
                sessionStorage.setItem("bairro", data.bairro);
                sessionStorage.setItem("cidade", data.localidade);
                sessionStorage.setItem("estado", data.uf);
            } else {
                alert("CEP não encontrado");
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP", error));
    }
})
