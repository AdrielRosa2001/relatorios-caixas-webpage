var caixasDict = new Map();
var valorsomacaixas = 0.00;

var despesasDict = new Map();
var valorsomadespesas = 0.00;

var valorPrintado = 0.00;

var soma = 0.00;

idDeElementos = [];

/* Cria o popup de relatorio a ser impresso */
function newPopup(){
    printarCaixasRelatorio()
    
    var windowsVar = window.open('', 'popup', "width=760 height=560");
    var extracao_html = '<link rel="stylesheet" href="./styles.css">' + (document.getElementById('relatorio_layout').innerHTML);
    windowsVar.document.write(extracao_html);
    windowsVar.document.getElementById('body_main').style.backgroundColor = "#fff";

    /* windowsVar.document.getElementsByTagName('div').style.backgroundColor = "#fff"; */

    /* alert(extracao_html); */
    
}

/* funções de crição e verificação de array */
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

/* Calcula as cedulas no caixa */
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

    soma = cinco_cents + dez_cents + vintecinco_cents + cinquenta_cents + um_real + 
    dois_reais + cinco_reais + dez_reais + vinte_reais + cinquenta_reais + cem_reais + duzentos_reais;

    document.getElementById('valor_somado').innerHTML = `${converteEmReal(soma)}`;

    baterCaixas();
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
    calcular();
    
}

function adicionandoCaixa(idspan, caixa, exibicao_lista_valores){
    /* Adicionando o objeto de caixa a coleção chaveada de caixas (id, objeto caixa)*/
    caixasDict.set(`${idspan}`, caixa);

    extract = caixasDict.get(`${idspan}`);
    /* Printando na tela  */
    valorsomacaixas = valorsomacaixas + extract["valor"];
    /* document.getElementById("valores_somados_caixas").innerHTML = 
    `Valores dos caixas: R$ ${(valorsomacaixas.toFixed(2)).replace(".", ",")}`;*/

    document.getElementById("listavalores").innerHTML = 
    exibicao_lista_valores + `<span id="${idspan}" style="display: block"><li style="display: flex; flex-direction: row; justify-content: space-between;">
    <div>${extract["data"]} - R$ ${((extract["valor"]).toFixed(2)).replace(".", ",")}</div> 
    <button onclick="removerValor('${idspan}')" style=" font-family: cursive; background: none; 
    border: none; color: red; width: 20px; height: 11px; cursor: pointer; display: flex; 
    justify-content: center; align-items: center; align-content: center; ">x</button> </li>`;

    printValoresDosCaixas(valorsomacaixas, valorsomadespesas);
}

function removerValor(idelemento){
    extracao = caixasDict.get(idelemento)
    valorsomacaixas = valorsomacaixas - extracao["valor"];
    document.getElementById(idelemento).innerHTML = "";
    caixasDict.delete(idelemento);
    printValoresDosCaixas(valorsomacaixas, valorsomadespesas);
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
    calcular();
}

function adicionandoDespesa(idspanDesp, despesas, exibicao_lista_despesas){
    /* Adicionando o objeto de caixa a coleção chaveada de caixas (id, objeto caixa)*/
    despesasDict.set(`${idspanDesp}`, despesas);

    extract = despesasDict.get(`${idspanDesp}`);
    /* Printando na tela */
    valorsomadespesas = valorsomadespesas + extract["valor"];
    
    document.getElementById("listadespesas").innerHTML = 
    exibicao_lista_despesas + `<span id="${idspanDesp}"><li style="display: flex; flex-direction: row; justify-content: space-between;">
    <div>${extract["descricao"]} - R$ ${((extract["valor"]).toFixed(2)).replace(".", ",")}</div> 
    <button onclick="removerDespesa('${idspanDesp}')" style=" font-family: cursive; background: none; 
    border: none; color: red; width: 20px; height: 11px; cursor: pointer; display: flex; 
    justify-content: center; align-items: center; align-content: center; ">x</button> </li>`;

    printValoresDosCaixas(valorsomacaixas, valorsomadespesas);
}

function removerDespesa(idelemento){
    extracao = despesasDict.get(idelemento)
    valorsomadespesas = valorsomadespesas - extracao["valor"];
    document.getElementById(idelemento).innerHTML = "";
    caixasDict.delete(idelemento);
    printValoresDosCaixas(valorsomacaixas, valorsomadespesas);
}

function printValoresDosCaixas(somaValores, somaDespesas){

    if (somaValores >= 0){
        document.getElementById("valores_somados_caixas").innerHTML = converteEmReal(somaValores);
    }else {
        document.getElementById("valores_somados_caixas").innerHTML = `<span style="color: red;"> - ${converteEmReal(somaValores)}</span>`;
    }
    if (somaDespesas >= 0){
        document.getElementById("valores_despesas_caixas").innerHTML = " - " + converteEmReal(somaDespesas);
    }else {
        document.getElementById("valores_despesas_caixas").innerHTML = `<span style="color: red;"> - ${converteEmReal(somaDespesas)}</span>`;
    }
    
}

function printarCaixasRelatorio(){
    document.getElementById("listaRelatorioCaixas").innerHTML = "";
    var listaAntigaCaixas = "";
    var arrayDeCaixas = [];

    for (var [key, values] of caixasDict){
        listaAntigaCaixas = listaAntigaCaixas + `<li id="${key}">${values["data"]}: R$ ${((values["valor"]).toFixed(2)).replace(".", ",")}</li>`;
        arrayDeCaixas.push(`${values["data"]}`);
    }
    /* Titulo do relatorio: */

    document.getElementById('titulo_relatorio').innerHTML = `Caixas ${arrayDeCaixas[0]} ~ ${arrayDeCaixas[arrayDeCaixas.length - 1]}`;

    /* Printando lista de caixas no relatorio */

    document.getElementById("listaRelatorioCaixas").innerHTML = listaAntigaCaixas;

    /* divisão ---------------------------- */

    document.getElementById("listaRelatorioDespesas").innerHTML = "";
    var listaAntigaDespesas = "";

    for (var [key, values] of despesasDict){
        listaAntigaDespesas = listaAntigaDespesas + `<li id="${key}">${values["descricao"]}: - R$ ${((values["valor"]).toFixed(2)).replace(".", ",")}</li>`;
    }
    document.getElementById("listaRelatorioDespesas").innerHTML = listaAntigaDespesas;

    document.getElementById("totalcaixas").innerHTML = `<span>R$ ${((valorsomacaixas).toFixed(2)).replace(".", ",")}</span>`;
    document.getElementById("totaldespesas").innerHTML = `<span style="color: red;"> - R$ ${((valorsomadespesas).toFixed(2)).replace(".", ",")}</span>`;

    var totaltotal = valorsomacaixas - valorsomadespesas;
    if (totaltotal < 0){
        document.getElementById("totaltotal").innerHTML = `<span style="color: red;"> - R$ ${((totaltotal * (-1)).toFixed(2)).replace(".", ",")}</span>`;
    } else {
        document.getElementById("totaltotal").innerHTML = `<span>R$ ${((totaltotal).toFixed(2)).replace(".", ",")}</span>`;
    }
    
}
function baterCaixas(){
    var fundoDeCaixa = Number(document.getElementById('fundo_de_caixa').value);
    soma = soma - fundoDeCaixa + valorsomadespesas;


    if( soma == valorsomacaixas){
        document.getElementById('resultadoCaixas').innerHTML = "Resultado: Caixa Batendo!";
    } else if (soma > valorsomacaixas) {
        document.getElementById('resultadoCaixas').innerHTML = `Resultado: Sobrando ${converteEmReal(soma - valorsomacaixas)} !`;
    } else if(soma < valorsomacaixas) {
        document.getElementById('resultadoCaixas').innerHTML = `Resultado: Está faltando <span style="color: red;">${converteEmReal(soma - valorsomacaixas)}</span> !`;
    }
}
function converteEmReal(valor){
    const retorno = "R$ "+(valor.toFixed(2)).replace(".", ",");
    return retorno;
}