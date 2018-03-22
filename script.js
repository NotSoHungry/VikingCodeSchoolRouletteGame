function Roulette (playerName, playerMoney) {
    this._player = playerName;
    this._moneyAmount = playerMoney;
    this._currentBet = null;
    this._currentSpin = null;
    
    this._spinNumbers = (function() {
        
        function isNumEvenOrOdd (number) {
            if (number === "0" || number === "00") {
                return "Special"
            } else {
                return (number % 2 === 0) ? "Even" : "Odd";
            }
        }
        function whichColor (number) {
            if (number === "0" || number === "00") {
                return "Special"
            } else {
                var isNumberRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].filter((element) => {
                    return element === number;
                })
        
                return (isNumberRed[0]) ? "Red" : "Black";
            }
        }
        function belongsToWhichHalf (number) {
            if (number === "0" || number === "00") {
                return "Special"
            } else {
                return (number < 19) ? "firstHalf" : "secondHalf";
            }
        }
        function belongsToWhichTwelve (number) {
            if (number === "0" || number === "00") {
                return "Special"
            } else {
                return (number < 13) ? "firstTwelve" :
                       (number < 25) ? "secondTwelve" : "thirdTwelve";
            }
        }
        var arr = [];
    
        for (i = -1; i <= 36; i++) {
            let varToPush = (i === -1) ? "00" :
                            (i === 0) ? "0" : i;
            arr.push(varToPush);
        }   
        return arr.map((element, index, array) => {
            return {
                number: array[index].toString(),
                evenOrOdd: isNumEvenOrOdd(element),
                color: whichColor(element),
                whichHalf: belongsToWhichHalf(element),
                whichTwelve: belongsToWhichTwelve(element)
            }
        })
    
    })();

}

Roulette.prototype = {
    get player () {
        return this._player;
    },
    get spinNumbers () {
        return this._spinNumbers;
    },
    get moneyAmount () {
        return this._moneyAmount;
    },
    set moneyAmount (value) {
        this._moneyAmount = value;
    }
}

Roulette.prototype.winBet = function (money, ckeckedValue) {
    this.moneyAmount += money;
    console.log(`Your bet: ${this._currentBet}, Current spin: ${checkedValue} - you've won $${money}`);
}

Roulette.prototype.loseBet = function (money, checkedValue) {
    this.moneyAmount -= money;
    console.log(`Your bet: ${this._currentBet}, Current spin: ${checkedValue} - you've lose $${money}`);
}

Roulette.prototype.spin = function () {
    let spinResult = Math.floor(Math.random() * 37);
    
    return (spinResult === 0) ? this._spinNumbers[0] :
           (spinResult === 1) ? this._spinNumbers[1] : this._spinNumbers[spinResult];
}

Roulette.prototype.bet = function (userBet, betMoney) {
    this._currentSpin = this.spin();
    console.log(this._currentSpin);
    this._currentBet = userBet.toString();

    let checkedValue = null,
        prizeMultiplier = null;

    switch (true) {
        case (userBet == "0"):
            checkedValue = this._currentSpin.number;
            priceMultiplier = 35;
            break;
        case (userBet == "00"):
            checkedValue = this._currentSpin.number;
            priceMultiplier = 35;
            break;
        case (userBet > 0 && userBet < 36):
            checkedValue = this._currentSpin.number;
            priceMultiplier = 35;
            break;
        case (userBet.toLowerCase() == "odd" || userBet.toLowerCase() == "even"):
            checkedValue = this._currentSpin.evenOrOdd;
            priceMultiplier = 1;
            break;
        case (userBet.toLowerCase() == "red" || userBet.toLowerCase() == "black"):
            checkedValue = this._currentSpin.color;
            priceMultiplier = 1;
            break;
        case (userBet.toLowerCase() == "firsthalf" || userBet.toLowerCase() == "secondhalf"):
            checkedValue = this._currentSpin.whichHalf;
            priceMultiplier = 1;
            break;
        case (userBet.toLowerCase() == "firsttwelve" || userBet.toLowerCase() == "secondtwelve" || userBet.toLowerCase() == "thirdtwelve" ):
            checkedValue = this._currentSpin.whichTwelve;
            priceMultiplier = 1;
            break;
    }


        (String(userBet).toLowerCase() == String(checkedValue).toLowerCase()) ? this.winBet(betMoney * priceMultiplier, checkedValue) : this.loseBet(betMoney, checkedValue);
}

Roulette.prototype.buyIn = function (money) {
   if (money.constructor === Number) {
       this._moneyAmount += money;
   } else {
       return "You cannot take this!";
   }
}

Roulette.prototype.bankRoll = function () {
    return this.moneyAmount;
}

let game = new Roulette("Pawel", 1000);