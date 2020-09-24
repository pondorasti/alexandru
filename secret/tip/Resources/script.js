const billInput = document.querySelector("#bill")
const tipInput = document.querySelector("#tip")
const peopleInput = document.querySelector("#people")

const displayTip = document.querySelector("#display-tip")
const displayTotal = document.querySelector("#display-total")

function calculateTip() {
    const billValue = parseInt(billInput.value)
    const tipValue = parseInt(tipInput.value)
    const peopleValue = parseInt(peopleInput.value)

    if (Number.isNaN(billValue) || Number.isNaN(tipValue) || Number.isNaN(peopleValue)) {
        alert('Please enter a valid number')

    } else {
        console.log(billValue)
    }

    const tipAmount = billValue * tipValue / 100 / peopleValue
    const total = (billValue + tipAmount ) / peopleValue
    
    displayTip.innerHTML = `Tip per person: ${tipAmount.toFixed(2)}`
    displayTotal.innerHTML = `Total per person: ${total.toFixed(2)}`
}

billInput.addEventListener('input', calculateTip)
tipInput.addEventListener('input', calculateTip)
peopleInput.addEventListener('input', calculateTip)

calculateTip()

const plusButtons = Array.from(document.getElementsByClassName('plus'))
plusButtons.forEach(function(item, index) {
    item.onclick = function(event) {
        const input = item.parentNode.querySelector('input[type=number]')
        input.value = parseInt(input.value) + 1
        
        calculateTip()
    }
})

const minusButtons = Array.from(document.getElementsByClassName('minus'))
minusButtons.forEach(function(item, index) {
    item.onclick = function(event) {
        const input = item.parentNode.querySelector('input[type=number]')
        input.value = parseInt(input.value) - 1
        
        calculateTip()
    }
})