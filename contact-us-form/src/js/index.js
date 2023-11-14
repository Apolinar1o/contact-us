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
                    console.log("11111111")
                    $stepThree.hide()
                    $stepDescription.hide()
                    $title.text("Inscrição realizado com sucesso")
                    $stepText.text("Agredecemos sua inscrição, entraremos em contato assim que possivel, nosso prazo de analálise é de cinco dias úteis")
                }
                 async function salvarNoTrello() {
                        try {
                            console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨")

                            const nome = $inputNome.val()
                            const sobrenome = $inputsobrenome.val()
                            const email = $inputemail.val()
                            const miniBio = $inputBio.val()
                            const data = $inputDataNasc.val()
                            const complemento = $complemento.val()
                            const cidade = $cidade.val()
                            const endereco = $endereco.val()
                            const cep = $cep.val()
                            const pontosForte = $pontosForte.val()
                            const habilidades = $habilidades.val()
                            console.log(nome, sobrenome, email, miniBio, data)
                            if(!nome || !sobrenome || !email || !data || !complemento || !cidade || !endereco || !cep || !pontosForte || !habilidades) {
                                return alert("favor preencher todos os dados aleatórios ao prosseguir")
                            }
                            
                            const body = {
                                name: "Candidato - " + nome + " " + sobrenome,
                                desc: `
                                        Seguem dados do Candidato(a):

                                        ---------------- Dados Pessoas----------------
                                        Nome: ${nome}
                                        Sobrenome: ${sobrenome}
                                        Data de nascimento: ${data}
                                        Minibio: ${miniBio}

                                        ---------------- Dados de endereço----------------
                                        Endereço: ${endereco}
                                        Complemento: ${complemento}
                                        Cidade: ${cidade}
                                        Cep: ${cep}
                                        ---------------- Dados do Canditado(a)----------------
                                        Habildades: ${habilidades}
                                        Ponstos fortes: ${pontosForte}
                                   
                                       
                                `
                            }
                            await fetch("https://api.trello.com/1/cards/?idList=6546917754f6a85f5839bac3&key=e15907549de062419499efa42d971cff&token=ATTAd1e65dd97923fb46efe6a83a393b39c6bb873feec89e355b4baa73a494456505C02F53ED", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(body)
                            })
                            console.log("¨44444444$$$$$$$$$$$$$$$$$")

                             return finalizarFormulario();
                        } catch (e) {
                            console.log("ocorreu erro ao salvar no Trello")
                        }
                 }
                function validarForm3() {
                    if(validarHabilidades && validarPontosFortes) {
                        $containerBtnFormThree.removeClass("disabled")
                        $btnFormThree.removeClass("disabled")
                        $btnFormThree.off("click").on("click", salvarNoTrello)
                       
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