function Roulette (playerName, playerMoney) {
    this._player = playerName;
    this._moneyAmount = playerMoney;
    this._currentBet = null;
    this._currentSpin = null;
    
    this._specialNumbers = ["0", "00"];
    this._normalNumbers = (function() {
        
        function isNumEvenOrOdd (number) {
            return (number % 2 === 0) ? "Even" : "Odd";
        }
        function whichColor (number) {
            var isNumberRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].filter((element) => {
                return element === number;
            })
        
            return (isNumberRed[0]) ? "Red" : "Black";
        }
        function belongsToWhichHalf (number) {
            return (number < 19) ? "firstHalf" : "secondHalf";
        }
        function belongsToWhichTwelve (number) {
            return (number < 13) ? "firstTwelve" :
                   (number < 25) ? "secondTwelve" : "thirdTwelve";
        }
        var arr = [];
    
        for (i = 1; i <= 36; i++) {
            arr.push(String(i));
        }   
        return arr.map((element, index, array) => {
            return {
                number: array[index],
                evenOrOdd: isNumEvenOrOdd(Number(element)),
                color: whichColor(Number(element)),
                whichHalf: belongsToWhichHalf(Number(element)),
                whichTwelve: belongsToWhichTwelve(Number(element))
            }
        })
    
    })();

}

Roulette.prototype.isNumberEven = function() {
    return "Even";
}

Roulette.prototype = {
    get player () {
        return this._player;
    },
    get specialNumbers () {
        return this._specialNumbers;
    },
    get normalNumbers () {
        return this_.normalNumbers;
    },
    get moneyAmount () {
        return this._moneyAmount;
    },
    set moneyAmount (value) {
        this._moneyAmount = value;
    }
}

Roulette.prototype.winBet = function (money) {
    this.moneyAmount += money;
    console.log(`Your bet: ${this._currentBet}, Current spin: ${this._currentSpin} - you've won $${money}`);
}

Roulette.prototype.loseBet = function (money) {
    this.moneyAmount -= money;
    console.log(`Your bet: ${this._currentBet}, Current spin: ${this._currentSpin} - you've lose $${money}`);
}

Roulette.prototype.spin = function () {
    return Math.floor(Math.random() * 38);
}

Roulette.prototype.checkBet = function (userBet, betMoney, singleSpin) {
    this._currentSpin = singleSpin();
    this._currentBet = userBet;

    switch (true) {
        case (userBet > 0 && userBet < 36):
            (userBet == this._currentSpin) ? this.winBet(betMoney * 35) : this.loseBet(betMoney);
            break;

    }
}

Roulette.prototype.buyIn = function (money) {
   if (money.constructor === Number) {
       this._moneyAmount += money;
   } else {
       return "You cannot take this!";
   }
}