const config = require('./configuration');
const coinbasePro = require('coinbase-pro');

//const SandboxEndPoint = "https://api-public.sandbox.exchange.coinbase.com";
const endPoint = 'https://api.pro.coinbase.com';
const key = config.get('Coinbase_KEY');
const apiSecret = config.get('Coinbase_SECRET');
const passphrase = config.get('Coinbase_PASSPHRASE');

const publicClient = new coinbasePro.PublicClient();
const client = new coinbasePro.AuthenticatedClient(
    key,
    apiSecret,
    passphrase,
    endPoint
);

/* (error, response, data) => {
            if (error)
                console.log("Cannot find 24hr stats for " + pair, error);
            else {
                console.log(data);
                return data;
            } */
const myCallback = (error, response, data) => {
    console.log("You have a balance of :")
    console.log(data)
    return data;
};
class Data {
    static getCash() {
        let result = client.getFundings({}).then(data => {
            return data;
        })
            .catch(err => {
                return "0"
            });
        return result
    }

    static buyOrder(pair, amount, price,) {
        const params = {
            price: price,
            size: amount,
            product_id: pair,
            cancel_after: "min",
        }
        let result = client.buy(params).then(data => {
            console.log(pair + " buy order placed for : " + price + " x " + amount)
            console.log(data)
            return data;
        })
            .catch(error => {
                // console.log(error)
                return null;
            })
        return result;
    }

    static sellOrder(pair) {
        const params = {
            type: "market",
            product_id: pair,
            cancel_after: "min",
        }
        let result = client.sell(params).then(data => {
            console.log(pair + " sell order placed for : " + price + " x " + amount)
            console.log(data);
            return data;
        })
            .catch(error => {
                // console.log(error)
                return null;
            })
        return result;
    }

    //Get my accounts
    static getAccounts() {
        let result = client.getAccounts().then(data => {
            return data;
        })
            .catch(error => {
                return null;
            })
        return result;
    }

    //Get the current time from coinbase
    static getTime() {
        let result = publicClient.getTime().then(data => {
            return data;
        })
            .catch(error => {
                return error;
            })
        return result;
    }

    //Get 24 hour open, high, low, trading volume, current and 30day volume
    static get24hrStats(pair) {
        let result = publicClient.getProduct24HrStats(pair).then(data => {
            return data;
        })
            .catch(error => {
                // console.log(error);
                return null;
            })
        return result;
    }

    //Get current price
    static getCurrentPrice(pair) {
        let result = publicClient.getProduct24HrStats(pair).then(data => {
            return data.last;
        })
            .catch(error => {
                // console.log(error);
                return null;
            })
        return result;
    }

    //get order bid and asking price of the given pair
    static getOrders(pair) {
        let result = publicClient.getProductOrderBook(pair).then(data => {
            return data;
        })
            .catch(error => {
                //  console.log(error + "\n");
                return null;
            })
        return result;
    }
    //-------------------------Get Historic data-----------------------------------------

    //get historic data granulated weekly
    static historic6hourly(pair) {
        //3600 seconds = 1 hour * 6 hours
        let result = publicClient.getProductHistoricRates(
            pair,
            { granularity: 3600 * 6 }
        ).then(data => {
            return data;
        })
            .catch(error => {
                console.log("no 6hr");
                return null;
            })
        return result;
    }

    //get historic data granulated daily
    static historicDaily(pair) {
        //3600 seconds = 1 hour * 24 = 1 day
        let result = publicClient.getProductHistoricRates(
            pair,
            { granularity: 3600 * 24 }
        ).then(data => {
            // console.log(data)
            return data;
        })
            .catch(error => {
                console.log("no daily")
                return null;
            })
        return result;
    }

    //get historic data granulated hourly

    static historicHourly(pair) {
        //3600 seconds = 1 hour
        let result = publicClient.getProductHistoricRates(
            pair,
            { granularity: 3600 }
        ).then(data => {
            return data;
        })
            .catch(error => {
                console.log("no hourly");
                return null;
            })
        return result;
    }
}

// Export this module
module.exports = Data