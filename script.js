function Roulette (playerName, playerMoney) {
    this._player = playerName;
    this._moneyAmount = playerMoney;
}

Roulette.prototype = {
    get moneyAmount () {
        return this._moneyAmount;
    },

    set moneyAmount (value) {
        this._moneyAmount = value;
    }
}

Roulette.prototype.winBet = function (money) {
    this.moneyAmount += money;
}

Roulette.prototype.loseBet = function (money) {
    this.moneyAmount -= money;
}

Roulette.prototype.spin = function (userBet, betMoney) {
    switch (true) {
        case (userBet > 0 && userBet < 36) :
            let currentSpin = Math.floor(Math.random() * 37);
            ()
    }
}

Roulette.prototype.buyIn = function (money) {
   if (money.constructor === Number) {
       this._moneyAmount += money;
   } else {
       return "You cannot take this!";
   }
}

var game = new Roulette("Pawel", 100);

var spin = Math.floor(Math.random() * 36);

while (true) {
    var spin = Math.round(Math.random() * 36);
    if (spin === 36) {
        console.log(spin);
        break;
    }
}