$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {



        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            $("#playButton").click(function () {

                var audio1 = new Audio('assets/INBOX.mp3');
                var audio2 = new Audio('assets/musica.mp3');
                var audio3 = new Audio('assets/Explodir.mp3');

                audio1.volume = 0.1;
                audio2.volume = 0.1;
                audio3.volume = 0.1;

                audio3.play();

                audio3.addEventListener('ended', function () {
                    // Quando o áudio3 terminar, reproduza o áudio1 automaticamente
                    audio1.play();
                });

                audio1.addEventListener('ended', function () {
                    // Quando o áudio1 terminar, reproduza o áudio2 automaticamente
                    audio2.play();
                });

                // Oculte o botão após iniciar a música
                // $("#playButton").hide();
            });
        }  
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "6/4": titulo = "06 de Abril de 2023"; mensagem = "<p>Esse foi o dia que nos conhecemos! Foi o dia que aquele match no tinder mudou tudo o que eu acreditava saber sobre amar alguém, o verdadeiro significado de amor é poder compartilhar a vida com você.</p>";break;
            case "13/4": titulo = "13 de Abril de 2023"; mensagem = "<p>Foi nesse dia que aconteceu nosso primeiro encontro, e sério eu tava muito ansioso. Era uma ansiedade boa. Eu fiz questão de deitar na sua barriga logo que você chegou, porque eu nunca me senti estranho perto de você... Sempre foi como voltar para casa. Bebemos mojitos e tivemos aquela interação fofa e estranha no trem. Você queria ter me beijado tanto quanto eu queria te beijar aquele dia?</p>";break;
            case "29/4": titulo = "29 de Abril de 2023"; mensagem = "<p>Nos beijamos pela primeira vez nesse dia. Você lembra como foi a sensação? Eu sinto a mesma sensação toda vez que te beijo, sempre me apaixono um pouco mais.</p>";break;
            case "4/6": titulo = "04 de Junho de 2023"; mensagem = "<p>No dia 04 você me pediu em namoro, me deu uma aliança e fizemos um piquenique lindo. Eu amei ter divido esse momento com você. Mesmo a gente quebrando o pau porque eu queria te pedir em namoro e te dar uma aliança, um dia antes e você estava quase me xingando. Sei que você me pediu em namoro a primeira vez no dia 15/05, e todos dizem que foi tudo muito rápido... Pois deixe-os falar. Não tenho dever nenhum para com os outros, apenas para com meu coração. </p>";break;
            case "04/10": titulo = "04 de Outubro de 2023"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está sendo escrito agora...</strong></p></section>";break;
            case "final": titulo = "04 de Outubro de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela me disse<br><span class='letra2 letra-vermelha'>SIM.</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}