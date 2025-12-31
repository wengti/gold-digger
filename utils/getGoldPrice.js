
let goldPrice = 1000

export const getGoldPrice = function(min=500, max=1500){
    const change = Math.round((Math.random() * 10000))/ 100
    const changeDir = Math.random() > 0.5 ? 1 : -1 
    goldPrice += change * changeDir
    goldPrice = Number(Math.min(Math.max(goldPrice, min), max).toFixed(2))
    return goldPrice
}