function Roulette (playerName, playerMoney) {
    this._player = playerName;
    this._moneyAmount = playerMoney;
    this._currentBet = null;
    this._currentSpin = null;
    
    this._specialNumbers = ["0", "00"];
    this._normalNumbers = (function() {
        
        function isNumEvenOrOdd (number) {
            return (number % 2 === 0) ? "even" : "odd";
        }
        function whichColor (number) {
            var isNumberRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].filter((element) => {
                return element === number;
            })
        
            return (isNumberRed[0]) ? "red" : "black";
        }
        function belongsToWhichHalf (number) {
            return (number < 19) ? "first" : "second";
        }
        function belongsToWhichTwelve (number) {
            return (number < 13) ? "first" :
                   (number < 25) ? "second" : "third";
        }
        var arr = [];
    
        for (i = 1; i <= 36; i++) {
            arr.push(i);
        }   
        return arr.map((element, index, array) => {
            return {
                number: array[index],
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
    get specialNumbers () {
        return this._specialNumbers;
    },
    get normalNumbers () {
        return this._normalNumbers;
    },
    get moneyAmount () {
        return this._moneyAmount;
    },
    set moneyAmount (value) {
        this._moneyAmount = value;
    }
}

Roulette.prototype.winBet = function (money, checkedValue) {
    this.moneyAmount += money;
    console.log(`Your bet: ${this._currentBet}, Current spin: ${checkedValue} - you've won $${money}`);
}

Roulette.prototype.loseBet = function (money, checkedValue) {
    this.moneyAmount -= money;
    console.log(`Your bet: ${this._currentBet}, Current spin: ${checkedValue} - you've lose $${money}`);
}

Roulette.prototype.spin = function () {
    let spinResult = Math.floor(Math.random() * 38);
    
    return (spinResult === 0) ? this._specialNumbers[0] :
           (spinResult === 37) ? this._specialNumbers[1] : this._normalNumbers[spinResult - 1];
}

Roulette.prototype.bet = function (userBet, betMoney) {
    this._currentSpin = this.spin();
    this._currentBet = userBet;

    let checkedValue = null;

    switch (true) {
        case (userBet > 0 && userBet < 36):
            checkedValue = this._currentSpin.number;
            (userBet == checkedValue) ? this.winBet(betMoney * 35, checkedValue) : this.loseBet(betMoney, checkedValue);
            break;
        case (userBet.toLowerCase() == "odd" || userBet.toLowerCase() == "even"):
        checkedValue = this._currentSpin.evenOrOdd;
        (userBet.toLowerCase() == checkedValue) ? this.winBet(betMoney, checkedValue) : this.loseBet(betMoney, checkedValue);
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

let game = new Roulette("Pawel", 1000);