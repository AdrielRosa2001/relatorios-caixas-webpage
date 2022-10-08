var caixasDict = new Map()
var valorsomacaixas = 0.00;

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
    var idspan = caixa["data"].replace("/", "");
    
    if (caixasDict.size == 0){

        /* Adicionando o objeto de caixa a coleção chaveada de caixas (id, objeto caixa)*/
        caixasDict.set(`${idspan}`, caixa);

        extract = caixasDict.get(`${idspan}`);
        /* Printando na tela */
        valorsomacaixas = valorsomacaixas + extract["valor"];
        document.getElementById("valores_somados_caixas").innerHTML = 
        `Valores dos caixas: R$ ${(valorsomacaixas.toFixed(2)).replace(".", ",")}`;

        document.getElementById("listavalores").innerHTML = 
        exibicao_lista_valores + `<span id="${idspan}"><li>${extract["data"]} - R$ ${((extract["valor"]).toFixed(2)).replace(".", ",")} <button onclick="removervalor('${idspan}')">Remover</button> </li>`;

    } else {
        if ((caixasDict.has(idspan)) != true){
            /* Adicionando o objeto de caixa a coleção chaveada de caixas (id, objeto caixa)*/
            caixasDict.set(`${idspan}`, caixa);

            extract = caixasDict.get(`${idspan}`);
            /* Printando na tela */
            valorsomacaixas = valorsomacaixas + extract["valor"];
            document.getElementById("valores_somados_caixas").innerHTML = 
            `Valores dos caixas: R$ ${(valorsomacaixas.toFixed(2)).replace(".", ",")}`;

            document.getElementById("listavalores").innerHTML = 
            exibicao_lista_valores + `<span id="${idspan}"><li>${extract["data"]} - R$ ${((extract["valor"]).toFixed(2)).replace(".", ",")} <button onclick="removervalor('${idspan}')">Remover</button> </li>`;

        } else {
            alert("O caixa informado ja foi adicionado! Para modificar o valor, remova o caixa e adicione novamente!");
        }
        
    }
    
}
function removervalor(idelemento){
    extracao = caixasDict.get(idelemento)
    valorsomacaixas = valorsomacaixas - extracao["valor"];
    document.getElementById(idelemento).innerHTML = "";
    caixasDict.delete(idelemento)
    document.getElementById("valores_somados_caixas").innerHTML = 
    `Valores dos caixas: R$ ${(valorsomacaixas.toFixed(2)).replace(".", ",")}`;
}