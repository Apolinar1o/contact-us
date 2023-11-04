const $stepOne= $('.step.one')
const $stepTwo= $('.step.two')
const $stepThree= $('.step.three')
const $stepText = $("#step-text")
const $stepDescription = $("#step-description")
const $inputNome = $("#nome")
const $inputsobrenome = $("#sobrenome")
const $inputemail = $("#email")
const $inputDataNasc = $("#dataNascimento")
const $inputBio = $("#minibio")
const $complemento = $("#complemento")
const $cidade = $("#cidade")
const $endereco = $("#endereco")
const $cep = $("#cep")
const $containerBtnFormTwo = $("#containerBtnFormTwo")
const $btnFormTwo = $("#btnFormTwo")
const $containerFormOne = $("#containerBtnFormOne")
const $btoFormOne = $("#btnFormOne")
const $containerBtnFormThree = $("#containerBtnFormThree")
const $btnFormThree = $("#btnFormThree")
const $pontosForte = $("#pontosForte")
const $habilidades = $("#habilidades")
const $title = $("#title")


let nomeValido = false;
let sobrenomeValido = false;
let emailValido = false;
let dataValido = false;

let minLengthText = 2;
let minLengthTextArea = 10;
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;


function init() {
    $stepText.text("passo 1 de 3 - Dados pessoas")
    $stepDescription.text("Forneça seus dados para te conhecermos melhor!")
    $stepTwo.hide()
    $stepThree.hide()
    
    function validarinput(elemento, textLength, regex) {
        const closest =  $(elemento).closest(".input-data")
        //verifica se tem regex ou não
        if(regex) {
            if(!elemento.value || elemento.value.trim().length < 2 || !elemento.value.toLowerCase().match(regex) ) {
                //invalido
                 closest.addClass("error")
                 return false
            } 
                  closest.removeClass("error")
                  return true
        } else {

            if(!elemento.value || (elemento.value.trim().length < textLength)) {
                //invalido
                 closest.addClass("error")
                 return false
    
            }
                  closest.removeClass("error")
                  return true
        }
        }
       
    $inputNome.keyup(function() {
        nomeValido = validarinput(this, minLengthText)
        validaFormularioUm()
    })
    
    $inputemail.keyup(function() {
        emailValido = validarinput(this, minLengthText, emailRegex)
        validaFormularioUm()
    })
    $inputsobrenome.keyup(function() {
       sobrenomeValido =  validarinput(this, minLengthText)
       validaFormularioUm()

    })
    $inputDataNasc.focus(function() {
        $inputDataNasc.attr("type", "date")
    })
    $inputDataNasc.keyup(function() {

        dataValido = validarinput(this, minLengthText)
        validaFormularioUm()
    })
    $inputDataNasc.blur(function() {
        if(!this.value) {
            this.type = "text"
        }
        
    })

    function validaFormularioUm() {
        if(nomeValido && sobrenomeValido && emailValido && dataValido ) {
            $containerFormOne.removeClass("disabled")
            $btoFormOne.removeClass("disabled")
            $btoFormOne.off("click").on("click", iniciarForm2)
           
        } else {
            $containerFormOne.addClass("disabled")
            $btoFormOne.addClass("disabled")
            $btoFormOne.off("click")

        }
    }
    function iniciarForm2() {
        $stepText.text("passo 2 de 3 - Dados de correspondência")
        $stepDescription.text("Precisamos desses dados para que possamos entrar em contato caso necessário")
        $stepTwo.show()
        $stepOne.hide()


        let complementoValido = false;
        let cidadeValido = false;
        let enderecoValido = false;
        let cepValido = false; 

        validarForm2()
        $complemento.keyup(function() {
            complementoValido = validarinput(this, minLengthText)
            validarForm2()
        }) 
        $cep.keyup(function() {
            this.value = this.value.replace(/[^0-9]+/g, '')
            cepValido = validarinput(this,minLengthText ,cepRegex)
            if(cepValido) {
                this.value = this.value.replace(cepRegex, " $1.$2-$3")
            }
            validarForm2()

        })
        $endereco.keyup(function() {
            enderecoValido = validarinput(this, minLengthTextArea)
            validarForm2()

        }) 
        $cidade.keyup(function() {
            cidadeValido = validarinput(this, minLengthText)
            validarForm2()

        }) 

        function validarForm2() {
            if(cidadeValido && cepValido && enderecoValido ) {
                $containerBtnFormTwo.removeClass("disabled")
                $btnFormTwo.removeClass("disabled")
                $btnFormTwo.off("click").on("click", iniciarForm3)
               
            } else {
                $containerBtnFormTwo.addClass("disabled")
                $btnFormTwo.addClass("disabled")
                $btnFormTwo.off("click")
    
            }
            function iniciarForm3() {

                let validarHabilidades = false
                let validarPontosFortes = false
                $stepText.text("passo 3 de 3 - fale sobre você")
                $stepDescription.text("para que possamos filtrar você melhor no processo, conte-nos um pouco mais mais sobre suas habilidades e pontos!")
                $stepThree.show()
                $stepTwo.hide()
                
                $habilidades.keyup(function() {
                    validarHabilidades = validarinput(this, minLengthTextArea)
                    validarForm3()
                })
                $pontosForte.keyup(function() {
                    validarPontosFortes = validarinput(this, minLengthTextArea)
                    validarForm3()
                })

                function finalizarFormulario() {
                    $stepThree.hide()
                    $stepDescription.hide()
                    $title.text("Inscrição realizado com sucesso")
                    $stepText.text("Agredecemos sua inscrição, entraremos em contato assim que possivel, nosso prazo de analálise é de cinco dias úteis")
                }

                function validarForm3() {
                    if(validarHabilidades && validarPontosFortes) {
                        $containerBtnFormThree.removeClass("disabled")
                        $btnFormThree.removeClass("disabled")
                        $btnFormThree.off("click").on("click", finalizarFormulario)
                       
                    } else {
                        $containerBtnFormThree.addClass("disabled")
                        $btnFormThree.addClass("disabled")
                        $btnFormThree.off("click")
            
                    }
                    }
                }
            }
        }

        
    }
   
init()