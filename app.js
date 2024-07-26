let currentNumber = '0'
let previousNumber = '0'
let operator

const calculatorContainer = document.querySelector('.calculatorContainer')
const displayText = document.querySelector('#displayContainerText')
const orangeButtons = document.querySelectorAll('.buttonContainer:last-child')

calculatorContainer.addEventListener('click', (event) => {
    const target = event.target

    if(target.tagName === 'BUTTON') {
        switch(target.id) {
            case 'clearButton': 
                currentNumber = '0'
                previousNumber = '0'
                operator = null
                displayText.textContent = currentNumber
                break
            case 'divideButton': 
                setOperator('divideButton')
                break
            case 'multiplyButton': 
                setOperator('multiplyButton')
                break
            case 'subtractButton': 
                setOperator('subtractButton')
                break
            case 'additionButton':
                setOperator('additionButton') 
                break
            case 'equalButton': 
                equateValue(Number(previousNumber), Number(currentNumber))
                break
            case 'decimalButton':
                if(currentNumber.includes(".")){
                    break
                }
                setCurrentInput(target.textContent.replace( /\s/g, ''))
                break
            default:
                setCurrentInput(target.textContent.replace( /\s/g, ''))
                break
        }
    }
})

const setCurrentOperatorBackground = (input) => {
    calculatorContainer.querySelector(`#${input}`).style.background = 'rgb(233, 153, 6)'
    calculatorContainer.querySelector(`#${input}`).style.color = 'rgb(46, 46, 46)'
}

const clearAllButtonBackground = () => {
    for ( i = 0; i < orangeButtons.length; i++) {
        orangeButtons[i].style.background = 'orange'
        orangeButtons[i].style.color = 'white'
    };
}

const setCurrentInput = (input) => {
    if(currentNumber === '0') {
        currentNumber = input
    } else if (currentNumber === previousNumber) {
        currentNumber = input
    } else {
        currentNumber = currentNumber + input
    }
    displayText.textContent = currentNumber
}

const setOperator = (input) => {
    clearAllButtonBackground()
    setCurrentOperatorBackground(input)

    if (operator && previousNumber) {
        currentNumber = '0'
        operator = input
        return
    }

    operator = input
    if(currentNumber != '0' && previousNumber != '0') {
        equateValue(Number(previousNumber), Number(currentNumber))
    } else if (previousNumber != '0' ) {
        equateValue(Number(currentNumber), Number(currentNumber))
    } else {
        previousNumber = currentNumber
    }
}

const equateValue = (numberOne, numberTwo) => {
    let result
    clearAllButtonBackground()
    switch(operator) {
        case 'additionButton':
            result = String(add(numberOne, numberTwo))
            break
        case 'subtractButton':
            result = String(subtract(numberOne, numberTwo))
            break
        case 'multiplyButton':
            result = String(multiply(numberOne, numberTwo))
            break
        case 'divideButton':
            result = String(divide(numberOne, numberTwo))
            break
    }

    if (!result) {
        displayText.textContent = currentNumber
        return 
    }

    console.log(`Result: ${result}`)
    previousNumber = result
    displayText.textContent = result
}

const add = (numberOne, numberTwo) => numberOne + numberTwo


const subtract = (numberOne, numberTwo) => numberOne - numberTwo


const multiply = (numberOne, numberTwo) => numberOne * numberTwo


const divide = (numberOne, numberTwo) => numberOne / numberTwo

