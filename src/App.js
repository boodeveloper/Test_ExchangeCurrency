import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function toFixedTrunc(value, n) {
    const f = Math.pow(10, n);
    return (Math.trunc(value * f) / f).toFixed(n);
}

class App extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            currency: "",
            exchangeRes: ""
        };
    }

    onCurrencyChange = e => {
        this.setState({
            currency: e.target.value
        });
    };

    onClickCalculate = money => {
        const arrMoneyCurrency = [
            {
                name: "100 dollar bill",
                nameMoreOne: "100 dollar bills",
                value: 10000
            },
            {
                name: "50 dollar bill",
                nameMoreOne: "50 dollar bills",
                value: 5000
            },
            {
                name: "20 dollar bill",
                nameMoreOne: "20 dollar bills",
                value: 2000
            },
            {
                name: "10 dollar bill",
                nameMoreOne: "10 dollar bills",
                value: 1000
            },
            {
                name: "5 dollar bill",
                nameMoreOne: "5 dollar bills",
                value: 500
            },
            {
                name: "1 dollar bill",
                nameMoreOne: "1 dollar bills",
                value: 100
            },
            {
                name: "quarter",
                nameMoreOne: "quarters",
                value: 25
            },
            {
                name: "dime",
                nameMoreOne: "dimes",
                value: 10
            },
            {
                name: "nickel",
                nameMoreOne: "nickels",
                value: 5
            },
            {
                name: "penny",
                nameMoreOne: "pennies",
                value: 1
            }
        ];

        money = toFixedTrunc(money, 2) * 100;
        let remain = money;

        let arrResponse = [];

        arrMoneyCurrency.forEach(item => {
            if (remain >= item.value) {
                const countBill = parseInt(remain / item.value);
                remain = remain % item.value;
                if (countBill > 1) {
                    const strCountBill = `${countBill} ${item.nameMoreOne}`;
                    arrResponse.push(strCountBill);
                } else {
                    const strCountBill = `${countBill} ${item.name}`;
                    arrResponse.push(strCountBill);
                }
            }
        });

        let strResponse = "Your change is ";

        if (strResponse.length > 1) {
            arrResponse.forEach((item, index) => {
                if (index + 1 == arrResponse.length) {
                    const strEnd = `and ${item}.`;
                    strResponse = strResponse.concat(strEnd);
                } else {
                    const strBill = `${item}, `;
                    strResponse = strResponse.concat(strBill);
                }
            });
        } else if (strResponse.length == 1) {
            const strOne = `${arrResponse[0]}.`;
            strResponse = strResponse.concat(strOne);
        } else {
            return this.setState({ exchangeRes: "" });
        }

        return this.setState({ exchangeRes: strResponse });
    };
    render() {
        return (
            <div className="App">
                <input
                    value={this.state.currency}
                    onChange={this.onCurrencyChange}
                    type="number"
                    min="0.00"
                    step="0.01"
                />
                <button
                    type="button"
                    onClick={() =>
                        this.onClickCalculate(parseFloat(this.state.currency))
                    }
                >
                    Calculate currency
                </button>
                <h1>Response: {this.state.exchangeRes}</h1>
            </div>
        );
    }
}

export default App;
