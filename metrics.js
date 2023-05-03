class metrics {
    //(RSI - Lowest Low RSI) / (Highest High RSI - Lowest Low RSI)
    static stochRSI(data, period) {
        let result = (this.RSI(data, period, 4) - this.RSI(data, period, 1)) /
            (this.RSI(data, period, 2) - this.RSI(data, period, 1))
        return result;
    }

    //x < 0 = sell, x >= 2 = strong buy, 1 > x < 2 = weak buy
    static buyOrSellSignal(data) {
        var signal = 0;

        //daily
        let dailyRSI = this.RSI(data[0], 14, 4)
        let dailyStochRSI = this.stochRSI(data[0], 14)

        if (dailyStochRSI < 20)
            signal -= 0.5
        if (dailyStochRSI > 80)
            signal += 0.5
        if (dailyRSI < 32)
            signal += 0.5
        if (dailyRSI > 65)
            signal -= 0

        //sixHourly
        let sixHourlyRSI = this.RSI(data[1], 14, 4)
        let sixHourlyStochRSI = this.stochRSI(data[1], 14)

        if (sixHourlyStochRSI < 20)
            signal -= 0.5;
        if (sixHourlyStochRSI > 80)
            signal += 0.5;
        if (sixHourlyRSI < 32)
            signal += 0.5;
        if (sixHourlyRSI > 65)
            signal -= 0.5;

        //hourly
        let hourlyRSI = this.RSI(data[2], 14, 4)
        let hourlyStochRSI = this.stochRSI(data[2], 14)

        if (hourlyStochRSI < 20)
            signal -= 0.5;
        if (hourlyStochRSI > 80)
            signal += 0.5;
        if (hourlyRSI < 32)
            signal += 0.5;
        if (hourlyRSI > 65)
            signal -= 0.5;
        return signal
    }

    //RSI 20 = buy RSI 80 = sell
    //datapoint 3 = open, 4 = close, 5 = high, 6 = low
    static RSI(data, period, dataPoint) {
        let avgG = 0;
        for (var i = period; i > 0; i--) {
            let change = data[i][dataPoint] - data[i - 1][dataPoint];
            avgG += change >= 0 ? change : 0
        }
        let avgL = 0;
        for (var i = period; i > 0; i--) {
            let change = data[i][dataPoint] - data[i - 1][dataPoint];
            avgL += change < 0 ? (-1) * change : 0
        }
        let rs = avgG / avgL;
        let result = 100 - 100 / (1 + rs);
        return result;
    }
}
module.exports = metrics;