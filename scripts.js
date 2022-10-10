var caixasDict = new Map();
var valorsomacaixas = 0.00;

var despesasDict = new Map();
var valorsomadespesas = 0.00;

idDeElementos = [];

function verificarArray(valor, array_){
    if (array_.indexOf(valor) != -1){
        return true
    }else{
        return false
    }
}

function gerarId(tipo, arrayl){
    var id_elemento = 0.00;
    var saida = false;
    if(arrayl.length == 0){
        id_elemento = ((Math.random())*10000000).toFixed(0);
            if(tipo === "valor"){
                id_elemento = "v"+id_elemento;
            } else if (tipo === "despesa"){
                id_elemento = "d"+id_elemento;
            }
    }else{
        while (saida == false){
            id_elemento = ((Math.random())*10000000).toFixed(0);
            if(tipo === "valor"){
                id_elemento = "v"+id_elemento;
                saida = verificarArray(id_elemento, arrayl);
            } else if (tipo === "despesa"){
                id_elemento = "d"+id_elemento;
                saida = verificarArray(id_elemento, arrayl);
            }
        }
    }
    return id_elemento;
}

function calcular(){
    var cinco_cents = Number(document.getElementById("5cents").value) * 0.05;
    var dez_cents = Number(document.getElementById("10cents").value) * 0.10;
    var vintecinco_cents = Number(document.getElementById("25cents").value) * 0.25;
    var cinquenta_cents = Number(document.getElementById("50cents").value) * 0.50;
    var um_real = Number(document.getElementById("1real").value) * 1;
    var dois_reais = Number(document.getElementById("2reais").value) * 2;
    var cinco_reais = Number(document.getElementById("5reais").value) * 5;
    var dez_reais = Number(document.getElementById("10reais").value) * 10;
    var vinte_reais = Number(document.getElementById("20reais").value) * 20;
    var cinquenta_reais = Number(document.getElementById("50reais").value) * 50;
    var cem_reais = Number(document.getElementById("100reais").value) * 100;
    var duzentos_reais = Number(document.getElementById("200reais").value) * 200;

    var soma = cinco_cents + dez_cents + vintecinco_cents + cinquenta_cents + um_real + 
    dois_reais + cinco_reais + dez_reais + vinte_reais + cinquenta_reais + cem_reais + duzentos_reais;

    document.getElementById('valor_somado').innerHTML = (`Total em Espécie: R$ ${soma.toFixed(2)}`).replace(".", ",")
}
function adicionar(){
 
    var exibicao_lista_valores = document.getElementById("listavalores").innerHTML;
    var caixa = new Object();
    caixa.data = document.getElementById("inputs_datas").value;
    caixa.valor = Number(document.getElementById("inputs_values").value);
    var idspan = (caixa["data"].replace("/", "")).replace("/", "");
    
    if (caixasDict.size == 0){

        adicionandoCaixa(idspan, caixa, exibicao_lista_valores);

    } else {
        if ((caixasDict.has(idspan)) != true){
            
            adicionandoCaixa(idspan, caixa, exibicao_lista_valores);

        } else {
            alert("O caixa informado ja foi adicionado! Para modificar o valor, remova o caixa e adicione novamente!");
        }
        
    }
    
}

function adicionandoCaixa(idspan, caixa, exibicao_lista_valores){
    /* Adicionando o objeto de caixa a coleção chaveada de caixas (id, objeto caixa)*/
    caixasDict.set(`${idspan}`, caixa);

    extract = caixasDict.get(`${idspan}`);
    /* Printando na tela */
    valorsomacaixas = valorsomacaixas + extract["valor"];
    document.getElementById("valores_somados_caixas").innerHTML = 
    `Valores dos caixas: R$ ${(valorsomacaixas.toFixed(2)).replace(".", ",")}`;

    document.getElementById("listavalores").innerHTML = 
    exibicao_lista_valores + `<span id="${idspan}"><li style="display: flex; flex-direction: row; justify-content: space-between;">
    <div>${extract["data"]} - R$ ${((extract["valor"]).toFixed(2)).replace(".", ",")}</div> 
    <button onclick="removervalor('${idspan}')" style=" font-family: cursive; background: none; 
    border: none; color: red; width: 20px; height: 11px; cursor: pointer; display: flex; 
    justify-content: center; align-items: center; align-content: center; ">x</button> </li>`;
}

function removervalor(idelemento){
    extracao = caixasDict.get(idelemento)
    valorsomacaixas = valorsomacaixas - extracao["valor"];
    document.getElementById(idelemento).innerHTML = "";
    caixasDict.delete(idelemento);
    document.getElementById("valores_somados_caixas").innerHTML = 
    `Valores dos caixas: R$ ${(valorsomacaixas.toFixed(2)).replace(".", ",")}`;
}

function adicionar_despesas(){
    var exibicao_lista_despesas = document.getElementById("listadespesas").innerHTML;
    var despesas = new Object();
    despesas.descricao = document.getElementById("inputdescricao_desp").value;
    despesas.valor = Number(document.getElementById("inputvalor_desp").value);
    var idspanDesp = gerarId("despesa", idDeElementos);
    
    if (despesasDict.size == 0){

        adicionandoDespesa(idspanDesp, despesas, exibicao_lista_despesas);

    } else {
        if ((despesasDict.has(idspanDesp)) != true){
            
            adicionandoDespesa(idspanDesp, despesas, exibicao_lista_despesas);

        } else {
            alert("A despesa informada ja foi adicionada! Para modificar o valor, remova a despesa e adicione novamente!");
        }
        
    }
}

function adicionandoDespesa(idspanDesp, despesas, exibicao_lista_despesas){
    /* Adicionando o objeto de caixa a coleção chaveada de caixas (id, objeto caixa)*/
    despesasDict.set(`${idspanDesp}`, despesas);

    extract = despesasDict.get(`${idspanDesp}`);
    /* Printando na tela */
    valorsomadespesas = valorsomadespesas + extract["valor"];
    valorsomacaixas = valorsomacaixas - valorsomadespesas;
    
    document.getElementById("valores_somados_caixas").innerHTML = 
    `Valores dos caixas: R$ ${(valorsomadespesas.toFixed(2)).replace(".", ",")}`;

    document.getElementById("listadespesas").innerHTML = 
    exibicao_lista_despesas + `<span id="${idspanDesp}"><li style="display: flex; flex-direction: row; justify-content: space-between;">
    <div>${extract["descricao"]} - R$ ${((extract["valor"]).toFixed(2)).replace(".", ",")}</div> 
    <button onclick="removervalor('${idspanDesp}')" style=" font-family: cursive; background: none; 
    border: none; color: red; width: 20px; height: 11px; cursor: pointer; display: flex; 
    justify-content: center; align-items: center; align-content: center; ">x</button> </li>`;
}