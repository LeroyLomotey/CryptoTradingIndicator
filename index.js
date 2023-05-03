const config = require('./configuration')
const coins = require('./coins.json')
const metrics = require('./metrics.js')
const data = require('./data.js')
const trades = require('./trade.js')

const main = async () => {
    //Trade Ethereum
    const pair = coins.ETHEREUM

    var cash = data.getCash()
    const newTrade = new trades(pair, cash)


    var daily = async () => {
        return await data.historicDaily(pair)
    }

    var sixHourly = async () => {
        return await data.historic6hourly(pair)
    }

    var hourly = async () => {
        return await data.historicHourly(pair)
    }

    //A trade is attempted every 15 minutes
    var trade = async () => {
        currently = await data.get24hrStats(pair)
        let price = currently[1]
        console.log(currently);
        var signal = 0

        //Making sure we have data before doing any calculations
        Promise.all([daily(), sixHourly(), hourly()]).then(data => {
            console.log("Data aqcuired")
            signal = metrics.buyOrSellSignal(data)
        })

        //x < 0 = sell, x >= 2 = strong buy, 1 > x < 2 = weak buy
        if (signal = 2 && newTrade.cash >= 1 && newTrade.positions < 2) {
            console.log("Opening a strong trade")
            let amount = newTrade.cash / price
            newTrade.openPosition({ pair, amount, price })
            const cash = data.getCash()
            newTrade.updateCash(cash)
        }

        if (signal = 1 && newTrade.cash >= 1 && newTrade.positions < 2) {
            console.log("Opening a weak trade")
            let amount = newTrade.cash / 2 / price
            newTrade.openPosition({ pair, amount, price })
            cash = data.getCash()
            newTrade.updateCash(cash)
        }

        if (signal < 0 && newTrade.positions) {
            console.log("Closing all trade")
            newTrade.closePositions(newTrade)
            const cash = data.getCash()
            newTrade.updateCash(cash)
        }
    }
    daily()
    sixHourly()
    hourly()
    trade()
    setInterval(daily, 86400000) // 1day
    setInterval(sixHourly, 21600000) // 6hours
    setInterval(hourly, 3600000) // 1hr
    setInterval(trade, 300000) // 15min
}
main()