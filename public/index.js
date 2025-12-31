
const priceDisplay = document.getElementById('price-display')
const investBtn = document.getElementById('invest-btn')
const investForm = document.getElementById('invest-form')
const connectionStatus = document.getElementById('connection-status')
const outputs = document.getElementById('outputs')

// Prevent submission
investForm.addEventListener('submit', event => event.preventDefault())

// Update Gold Price
const eventSource = new EventSource('/event')

eventSource.onmessage = function (event) {
    priceDisplay.textContent = JSON.parse(event.data).goldPrice
    investForm.addEventListener('submit', handleSubmit)
    connectionStatus.textContent = `Live Price 🟢`
    investBtn.style.opacity = '1'
}

eventSource.onError = function (event) {
    console.error(`Error occured: ${event}`)
    priceDisplay.textContent = `----.--`
    investForm.removeEventListener('submit', handleSubmit)
    connectionStatus.textContent = `Disconnected 🔴`
    investBtn.style.opacity = '0.5'
}


async function handleSubmit() {

    const date = new Date()
    const currentGoldPrice = Number(priceDisplay.textContent)
    const investmentAmount = Number(document.getElementById('investment-amount').value)
    const investmentOz = Number((investmentAmount / currentGoldPrice).toFixed(2))

    const purchaseRecord = {
        investmentTime: date.toLocaleString(),
        currentGoldPrice,
        investmentAmount,
        investmentOz
    }


    outputs.style.display = 'block'
    outputs.innerHTML = `
        <h2>Processing Transaction...</h2>
        <p>Loading...<p>
    `

    const options = {
        method: 'POST',
        body: JSON.stringify(purchaseRecord),
        header: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch('/api', options)
    const data = await response.json()
    if (!response.ok){
        throw new Error(`${data.message}`)
    }

    outputs.innerHTML = `
        <h2>Summary</h2>
        <p id="investment-summary">You just bought ${investmentOz} ounces (ozt) for £${investmentAmount}. <br> You will receive documentation shortly.</p>
        <button id='return-btn' aria-label="Close dialog and return to main page">OK</button>
    `

    document.getElementById('return-btn').addEventListener('click', function () {
        outputs.style.display = 'none'
    })
}