function salvarDados() {
    var numero = document.getElementById("numero").value;
    var nome = document.getElementById("nome").value;
    const selectTurma = document.getElementById("turma");
    const outraTurmaInput = document.getElementById("outraTurma");
    
    let turmaSelecionada = "";
    if (selectTurma.value === "personalizada") {
      turmaSelecionada = outraTurmaInput.value;
    } else {
      turmaSelecionada = selectTurma.value;
    }
  
    var turma = turmaSelecionada;
    var email = document.getElementById("email").value;

    var dados = {
      numero: numero,
      nome: nome,
      email: email,
      turma: turma
    };
  
    var dadosAnteriores = sessionStorage.getItem("dadosFormulario");
    var listaDados = [];
  
    if (dadosAnteriores) {
      listaDados = JSON.parse(dadosAnteriores);
    }
  
    listaDados.unshift(dados);
  
    sessionStorage.setItem("dadosFormulario", JSON.stringify(listaDados));
  
    exibirPopup();
  
    document.getElementById("numero").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("turma").value = "";
    document.getElementById("email").value = "";
  
    exibirListaNaPagina();
  }
 
function exibirPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function fecharPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function exibirListaNaPagina() {
    var tabelaDados = document.getElementById("listaDados");

    tabelaDados.innerHTML = "";

    var dadosAnteriores = sessionStorage.getItem("dadosFormulario");
    var listaArmazenada = JSON.parse(dadosAnteriores);

    if (listaArmazenada) {
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var trHead = document.createElement("tr");
        var thNumero = document.createElement("th");
        var thNome = document.createElement("th");
        var thTurma = document.createElement("th"); 
        var thEmail = document.createElement("th");

        thNumero.textContent = "Número"; 
        thNome.textContent = "Nome";
        thTurma.textContent = "Turma"; 
        thEmail.textContent = "E-mail";

        trHead.appendChild(thNumero);
        trHead.appendChild(thNome);
        trHead.appendChild(thTurma); 
        trHead.appendChild(thEmail);
        thead.appendChild(trHead);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        listaArmazenada.forEach(function(dados) {
            var tr = document.createElement("tr");
            var tdNumero = document.createElement("td"); 
            var tdNome = document.createElement("td");
            var tdTurma = document.createElement("td");
            var tdEmail = document.createElement("td");

            tdNumero.textContent = dados.numero.toString().padStart(3, '0');
            tdNome.textContent = dados.nome;
            tdTurma.textContent = dados.turma;
            tdEmail.textContent = dados.email;

            tr.appendChild(tdNumero);
            tr.appendChild(tdNome);
            tr.appendChild(tdTurma);
            tr.appendChild(tdEmail);

            tbody.appendChild(tr);
        });
 var totalizacaoElement = document.createElement("p");
 totalizacaoElement.textContent = "Total de Dados: " + listaArmazenada.length;
 tabelaDados.appendChild(table);
 tabelaDados.appendChild(totalizacaoElement);
        table.appendChild(tbody);       
    }
}