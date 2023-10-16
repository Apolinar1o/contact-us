const $stepOne= $('.step.one')
const $stepTwo= $('.step.two')
const $stepThree= $('.step.three')
const $stepText = $("#step-text")
const $stepDescription = $("#step-description")
const $inputNome = $("#nome")
const $inputsobrenome = $("#sobrenome")
const $inputemail = $("#email")
const $inputDataNasc = $("#dataNascimento")

function init() {
    $stepText.text("passo 1 de 3 - Dados pessoas")
    $stepDescription.text("Forneça seus dados para te conhecermos melhor!")
    $stepTwo.hide()
    $stepThree.hide()

    $inputNome.keyup(function() {
        if(!this.value || this.value.trim().length < 2) {
            //invalido
            return $inputNome.parents().addClass("error")

        } 
        else {
             return $inputNome.parents().removeClass("error")

        }
    })
    
    $inputemail.keyup(function() {
        if(!this.value && this.value.trim().length < 2 || !this.value.includes(".") || !this.value.includes("@")  ) {
            //invalido
            return $inputemail.parents().addClass("error")

        } 
        else {
             return $inputemail.parents().removeClass("error")

        }
    })
    $inputsobrenome.keyup(function() {
        if(!this.value || this.value.trim().length < 2) {
            //invalido
            return $inputsobrenome.parents().addClass("error")

        } 
        else {
             return $inputsobrenome.parents().removeClass("error")

        }
    })

}
init()