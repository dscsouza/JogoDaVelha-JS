
//ideia implementar uma variável na função estaParaGanhar(X ou O), para saber qual player está para ganhar
//a máquina mesmo podendo ganhar, não ganha, prefere se defender


//implementar uma variável também para saber se o jogo já terminou. a máquina está jogando mesmo depois do player ganhar

var jogarContraMaquina = true; //por padrão o jogo será contra a máquina. Implementar um radio onde o usuário escolhe
var gameover = false;
var jogador = true;
var mensagem = "";
var qtd_jogadas = 0; //controla a quantidade de jogadas da máquina, nesse projeto usaremos para definir que no nível médio, algumas jogadas sejam aleatórias, ou seja, não passam pela IA.
var facil_aleatorio = ""; // variável que armazena a posição que será feita uma jogada aleatória
var win_p1 = 0;
var win_p2 = 0;
var empate = 0;


var tabuleiro = [
    ["" ,"", ""], 
    ["", "", ""], 
    ["", "", ""]
    ];


var tabMaquina = {
    "0,0":"p1",
    "0,1":"p2",
    "0,2":"p3",
    "1,0":"p4",
    "1,1":"p5",
    "1,2":"p6",
    "2,0":"p7",
    "2,1":"p8",
    "2,2":"p9"   
}

//apagar esse objeto ao final, usei só para testes
var indicesClass = [{
    "2,0":"p1",
    "0,1":"p2",
    "0,2":"p3",
    "1,0":"p4",
    "1,1":"p5",
    "1,2":"p6",
    "2,0":"p7",
    "2,1":"p8",
    "2,2":"p9"   
},{ 

    "p1":"2,0",
    "p2":"0,1",
    "p3":"0,2",
    "p4":"1,0",
    "p5":"1,1",
    "p6":"1,2",
    "p7":"2,0",
    "p8":"2,1",
    "p9":"2,2"
}]


setTimeout(() => {
    maquina = document.getElementById("contra_maquina").checked;

    console.log(maquina);

    humano = document.getElementById("contra_player").checked;

    console.log(humano);

    facil = document.getElementById("facil").checked;

    console.log(facil);

    medio = document.getElementById("medio").checked;

    console.log(medio);

    dificil = document.getElementById("dificil").checked;

    console.log(dificil);


    
}, 15);



var aleatoria = [];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





function jogadaAleatoria(){
    aleatoria = [];
    for (var k=0;k<3;k++){
        for (var w=0; w<3; w++){
            if (tabuleiro[k][w] == ""){
                aleatoria.push([k,w]);
            }
        }
    }
    if (aleatoria.length==0){
        return "";
    }
    console.log("matriz aleatoria")
    console.log(aleatoria);

    var random = getRandomIntInclusive(0,(aleatoria.length -1));
    console.log("número aleatório sorteado: " + random );
    
    return tabMaquina[aleatoria[random]];
    
}






vertical = 0;

function atualizaPlacar(a){
    console.log(" atualiza placar: " + a);
    
    placar_1 = document.getElementById("jogador1");
    placar_2 = document.getElementById("jogador2");
    empates = document.getElementById("empate");

    if (a=="Player 1"){
        win_p1++;
        placar_1.innerHTML = win_p1;
    } else if (a=="Player 2" || a=="Máquina"){
        win_p2++;
        placar_2.innerHTML = win_p2;
    }else if (a=="empate"){
        empate++;
        empates.innerHTML = empate;
    }

    //reseta(0); 
    //se argumento 0 : novo jogo, se for 1: reinicia tudo

}


function verificaJogada(p){
    console.log(p);

    // verifica se há um vencedor na 1a diagonal
    if (tabuleiro[0][0] != "" &&
        tabuleiro[0][0] == tabuleiro[1][1] && 
        tabuleiro[2][2] == tabuleiro[1][1]){
        console.log(`${p} venceu!!!`);
        mensagem = `${p} venceu!!!`;
        gameover = true;
        atualizaPlacar(p);
        return;
    }

    // verifica se há um vencedor na 2a diagonal
    if (tabuleiro[0][2] != "" &&
        tabuleiro[0][2] == tabuleiro[1][1] && 
        tabuleiro[2][0] == tabuleiro[1][1]){
        console.log(`${p} venceu!!!`);
        mensagem = `${p} venceu!!!`;
        gameover = true;
        atualizaPlacar(p);
        return;
    }

    // verifica se há um vencedor nas colunas e linhas
    for (var i=0;i<3;i++){

        // verifica se há um vencedor nas colunas
        if (tabuleiro[i][0] != "" &&
            tabuleiro[i][0]==tabuleiro[i][1] && 
            tabuleiro[i][1]==tabuleiro[i][2]){
            console.log(`${p} venceu!!!`);
            mensagem = `${p} venceu!!!`;
            gameover = true;
            atualizaPlacar(p);
            return;
        }

        // verifica se há um vencedor nas linhas
        if (tabuleiro[0][i] != "" &&
            tabuleiro[0][i]==tabuleiro[1][i] && 
            tabuleiro[1][i]==tabuleiro[2][i]){
            console.log(`${p} venceu!!!`);
            mensagem = `${p} venceu!!!`;
            gameover = true;
            atualizaPlacar(p);
            return;
        }
    }


    //verifica se todas as jogadas já foram feitas, ou seja, se velhou, empatou
    var controle = 0;
    for (var z=0; z<3; z++){
        for (var s=0; s<3; s++){
            if (tabuleiro[z][s] == ""){
                controle++;
            }
        }
    }
    if (controle == 0){
        console.log(`EMPATE !!!`);
        mensagem = `Empatou!!!`;
        gameover = true;
        atualizaPlacar("empate");
        return;
    }
    console.log("espaços vazios: " + controle);

}


function incluiJogada(pos, player){
    //inclui a jogada na matriz 3x3    
    
    if (pos == p1){
        tabuleiro[0][0] = player;
    }
    if (pos == p2){
        tabuleiro[0][1] = player;
    }
    if (pos == p3){
        tabuleiro[0][2] = player;
    }

    if (pos == p4){
        tabuleiro[1][0] = player;
    }
    if (pos == p5){
        tabuleiro[1][1] = player;
    }
    if (pos == p6){
        tabuleiro[1][2] = player;
    }

    if (pos == p7){
        tabuleiro[2][0] = player;
    }
    if (pos == p8){
        tabuleiro[2][1] = player;
    }
    if (pos == p9){
        tabuleiro[2][2] = player;
    }
}


//função que verifica se falta uma jogada para o jogador ganhar

function estaParaGanhar(player){
// verifica se o player está para vencer nas colunas e linhas
    for (var i=0;i<3;i++){

        // verifica se falta somente uma jogada para vencer, na última coluna de cada linha
        if (tabuleiro[i][0]==player && tabuleiro[i][1] == player && tabuleiro[i][2]==""){

            switch (i){
                case 0:
                    return "p3";
                case 1:
                    return "p6";
                case 2:
                    return "p9";
            }
        } 

        // verifica se falta somente uma jogada para vencer, na primeira coluna de cada linha
        if (tabuleiro[i][2]==player && tabuleiro[i][1] == player && tabuleiro[i][0]==""){

            switch (i){
                case 0:
                    return "p1";
                case 1:
                    return "p4";
                case 2:
                    return "p7";
            }
        } 


        // verifica se falta somente uma jogada para vencer, na última linha de cada coluna
        if (tabuleiro[0][i]==player && tabuleiro[1][i] == player && tabuleiro[2][i]==""){

            switch (i){
                case 0:
                    return "p7";
                case 1:
                    return "p8";
                case 2:
                    return "p9";
            }
        } 

        // verifica se falta somente uma jogada para vencer, na primeira linha de cada coluna
        if (tabuleiro[2][i]==player && tabuleiro[1][i] == player && tabuleiro[0][i]==""){

            switch (i){
                case 0:
                    return "p1";
                case 1:
                    return "p2";
                case 2:
                    return "p3";
            }
        } 
    }

        //verifica se falta apenas uma jogada nas bordas para finalizar o jogo
        if (tabuleiro[0][0]==player &&
            tabuleiro[1][1]==player &&
            tabuleiro[2][2]==""){
                return "p9";
        }

        if (tabuleiro[0][2]==player &&
            tabuleiro[1][1]==player &&
            tabuleiro[2][0]==""){
                return "p7";
        }

        if (tabuleiro[2][0]==player &&
            tabuleiro[1][1]==player &&
            tabuleiro[0][2]==""){
                return "p3";
        }

        if (tabuleiro[2][2]==player &&
            tabuleiro[1][1]==player &&
            tabuleiro[0][0]==""){
                return "p1";
        }

        //verifica se falta apenas uma jogada no meio das linhas e colunas para finalizar o jogo

        if (tabuleiro[0][0]==player &&
            tabuleiro[0][2]==player &&
            tabuleiro[0][1]==""){
                return "p2";
        }

        if (tabuleiro[0][0]==player &&
            tabuleiro[2][0]==player &&
            tabuleiro[1][0]==""){
                return "p4";
        }

        if (tabuleiro[0][2]==player &&
            tabuleiro[2][2]==player &&
            tabuleiro[1][2]==""){
                return "p6";
        }

        if (tabuleiro[2][0]==player &&
            tabuleiro[2][2]==player &&
            tabuleiro[2][1]==""){
                return "p8";
        }


    return " ";

}


//inclui a jogada da máquina
function incluiJogadaMaquina(joga){
    console.log("posição que será jogada: " + joga);
    jogada_maquina = document.getElementById(joga);
    jogada_maquina.innerHTML = `<img src="./assets/bola.png">`;
    jogador = true;
    mensagem = "JOGADOR: Player 1";
    incluiJogada(jogada_maquina, "O");
    verificaJogada("Máquina");
    vezDeJogar.innerHTML = mensagem;

    console.log(tabuleiro);
}

function IA(){

    console.log(tabuleiro);

    umaJogadaMaquinaVencer = estaParaGanhar("O"); // verifica se falta apenas uma jogada para máquina vencer
    console.log(umaJogadaMaquinaVencer);

    //se não faltar apenas uma jogada para maquina vencer, então verifica se o player está para ganhar
    if (umaJogadaMaquinaVencer == " "){
        
        resultado = estaParaGanhar("X");
        console.log(resultado);

        if (resultado == " "){
            // no level difícil, se o espaço central estiver vazio, ele inicia sempre por ele    
            if (tabuleiro[1][1] == "" && dificil){
                incluiJogadaMaquina("p5");
            }else{
                var ale = jogadaAleatoria();
                setTimeout(() =>{
                    if (ale != ""){
                        incluiJogadaMaquina(ale);
                    }
                },15);          
                
            }
        } else{
            incluiJogadaMaquina(estaParaGanhar("X"));
        }
    }else{
        incluiJogadaMaquina(umaJogadaMaquinaVencer);
    }
    
    
}

function playAleatoria(){
    facil_aleatorio = jogadaAleatoria();                           incluiJogadaMaquina(facil_aleatorio);
    return;
}


function jogada(j){
    console.log("função jogada");

    jogada_atual = document.getElementById(j.id); //seleciona o elemento clicado
    vezDeJogar = document.getElementById("jogador_atual"); // caixa de texto onde é informado qual jogador esta na vez

    if (!gameover){ //se n
        if (jogador){
            jogada_atual.innerHTML = `<img src="./assets/x.png">`;
            jogador = false;
            mensagem = "JOGADOR: Player 2";
            incluiJogada(jogada_atual, "X"); // inclui a jogada na posição "jogada_atual", que retorna o ID onde a peça deverá ser colocada

            verificaJogada("Player 1");

            vezDeJogar.innerHTML = mensagem;


            if (maquina && !gameover){

                if (dificil){
                    setTimeout(()=>{
                        IA(); //chama a IA
                    },500); //dá um pequeno intervalo antes de chamar a função IA, pois estavam ocorrendo erros de a IA tentar jogar antes da jogada do player ser registrada

                }
                if (medio){

                    if (qtd_jogadas == 0){
                        playAleatoria();
                        qtd_jogadas++;
                        return
                    }else if (qtd_jogadas == 1){
                        setTimeout(()=>{
                            IA(); //chama a IA
                        },15);
                        qtd_jogadas++;
                        return;
                    }else if (qtd_jogadas == 2){
                        playAleatoria();
                        qtd_jogadas++;
                        return
                    }else if (qtd_jogadas == 3){
                        setTimeout(()=>{
                            IA(); //chama a IA
                        },15);
                        qtd_jogadas = 0;
                    }
                }
                if (facil){
                    playAleatoria();
                }    
            }
   
        }else{
            jogada_atual.innerHTML = `<img src="./assets/bola.png">`;
            jogador = true;
            mensagem = "JOGADOR: Player 1";
            incluiJogada(jogada_atual, "O");
            verificaJogada("Player 2");
            vezDeJogar.innerHTML = mensagem;
        }
    }
}

//reseta o game. falta implementar o front end
//criar alguns levels: yancha, curirim, e goku instinto superior


function reseta(a){
    //limpa a matriz tabuleiro
    for (var k=0;k<3;k++){
        for (var w=0; w<3; w++){
            tabuleiro[k][w] = "";
        }
    }

    //limpa as imagens
    for (i in tabMaquina){
        document.getElementById(tabMaquina[i]).innerHTML = ``;
    }
    gameover=false;
    jogador = true;
    document.getElementById("jogador_atual").innerHTML = "JOGADOR: Player 1";
    qtd_jogadas = 0; //reseta a quantidade de jogadas

    //se o argumento for igual a 1, então zera o placar
    if (a==1){
        win_p1 = 0;
        win_p2 = 0;
        empate = 0;
        document.getElementById("jogador1").innerHTML = win_p1;
        document.getElementById("jogador2").innerHTML = win_p2;
        document.getElementById("empate").innerHTML = empate;
    }

}