const abas = document.querySelectorAll(".editorabas button");
const paineis = document.querySelectorAll(".editor-painel");

const campoHTML = document.getElementById("codigo-html");
const campoCSS = document.getElementById("codigo-css");
const campoJS = document.getElementById("codigo-js");

const botaoExecutar = document.getElementById("executar-codigo");
const botaoLimpar = document.getElementById("limpar-codigo");
const botaoRestaurar = document.getElementById("restaurar-codigo");

const previa = document.getElementById("resultado-codigo");

const htmlInicial = campoHTML ? campoHTML.value : "";
const cssInicial = campoCSS ? campoCSS.value : "";
const jsInicial = campoJS ? campoJS.value : "";

function abrirAba(nome) {
    for (let i = 0; i < abas.length; i++) {
        abas[i].classList.remove("ativa");
        paineis[i].hidden = true;
    }

    const abaEscolhida = document.querySelector(
        '.editor-abas button[data-aba="' + nome + '"]'
    );

    const painelEscolhido = document.getElementById(
        "painel-" + nome
    );

    if (abaEscolhida && painelEscolhido) {
        abaEscolhida.classList.add("ativa");
        painelEscolhido.hidden = false;
    }
}

for (let i = 0; i < abas.length; i++) {
    abas[i].addEventListener("click", function() {
        const nome = abas[i].getAttribute("data-aba");
        abrirAba(nome);
    });
}

function executarCodigo() {
    if (!campoHTML || !campoCSS || !campoJS || !previa) {
        return;
    }

    const codigoHTML = campoHTML.value;
    const codigoCSS = campoCSS.value;
    const codigoJS = campoJS.value;

    const pagina = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                ${codigoCSS}
            </style>
        </head>
        <body>
            ${codigoHTML}

            <script>
                try {
                    ${codigoJS}
                } catch (erro) {
                    document.body.insertAdjacentHTML(
                        "beforeend",
                        "<p>Ocorreu um erro no JavaScript.</p>"
                    );
                }
            </script>
        </body>
        </html>
    `;

    previa.srcdoc = pagina;
}

if (botaoExecutar) {
    botaoExecutar.addEventListener("click", executarCodigo);
}

if (botaoLimpar) {
    botaoLimpar.addEventListener("click", function() {
        campoHTML.value = "";
        campoCSS.value = "";
        campoJS.value = "";

        executarCodigo();
    });
}

if (botaoRestaurar) {
    botaoRestaurar.addEventListener("click", function() {
        campoHTML.value = htmlInicial;
        campoCSS.value = cssInicial;
        campoJS.value = jsInicial;

        executarCodigo();
    });
}

function configurarEditor(campo) {
    if (!campo) {
        return;
    }

    campo.addEventListener("keydown", function(evento) {
        if (evento.key === "Tab") {
            evento.preventDefault();

            const inicio = campo.selectionStart;
            const fim = campo.selectionEnd;

            campo.value =
                campo.value.substring(0, inicio) +
                "    " +
                campo.value.substring(fim);

            campo.selectionStart = inicio + 4;
            campo.selectionEnd = inicio + 4;
        }

        if (
            evento.key === "Enter" &&
            (evento.ctrlKey || evento.metaKey)
        ) {
            executarCodigo();
        }
    });
}
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

configurarEditor(campoHTML);
configurarEditor(campoCSS);
configurarEditor(campoJS);

executarCodigo();