const Position = require('./position.js')
const Data = require('./data.js')

class trade {
    constructor(coin, cash) {
        this.coin = coin
        this.cash = cash
        this.positions = {}
    }

    async openPosition({ pair, amount, price}) {
        let order = await Data.buyOrder(pair, amount, price)
        let id = order[id]
        const position = new Position({ pair, amount, price, id })
        
        this.positions[id] = position
    }

    async closePositions(pair) {
        let order = await Data.sellOrder(pair)
        this.positions = {}

    }

    updateCash(cash) {{
        this.cash = cash;
    }}
}

module.exports = trade