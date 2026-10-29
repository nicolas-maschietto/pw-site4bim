

   //Nicolas, tem código solto aq acho q n vai estar funcionandp ainda, vou tentar arrumar antes da etapa 3

    //OK

const botaoQuiz = document.getElementById("corrigir-quiz");

const resultadoQuiz = document.getElementById("resultado-quiz");

if (botaoQuiz && resultadoQuiz) {
    botaoQuiz.addEventListener("click", function() {
        const respostas = [
            document.querySelector('input[name="pergunta1"]:checked'),
            document.querySelector('input[name="pergunta2"]:checked'),
            document.querySelector('input[name="pergunta3"]:checked')
        ];
        const corretas = ["a", "b", "c"];

        if (respostas.some(function(resposta) {
            return !resposta;
        })) {
            resultadoQuiz.textContent = "Responda às três perguntas antes de conferir.";
            return;
        }

        let pontos = 0;

        for (let i = 0; i < respostas.length; i++) {
            if (respostas[i].value === corretas[i]) {
                pontos++;
            }
        }

        resultadoQuiz.textContent = "Você acertou " + pontos + " de 3 perguntas!" +
            (pontos === 3
                ? " Excelente trabalho!"
                : " Revise os tópicos e tente novamente.");
    });
}

let codigo = document.getElementById("codigo");
let atualizar = document.getElementById("atualizar");


let resultado = document.getElementById("resultado");

atualizar.addEventListener("click", function() {
    resultado.innerHTML = codigo.value;
});

let contador = 0;
        const valorContador = document.getElementById("valor-contador");
        const atualizarContador = function() {
            valorContador.textContent = contador;
        };

        document.getElementById("aumentar-contador").addEventListener("click", function() {
            contador++;
            atualizarContador();
        });

        document.getElementById("diminuir-contador").addEventListener("click", function() {
            contador--;
            atualizarContador();
        });

        document.getElementById("zerar-contador").addEventListener("click", function() {
            contador = 0;
            atualizarContador();
        });


executarCodigo();
