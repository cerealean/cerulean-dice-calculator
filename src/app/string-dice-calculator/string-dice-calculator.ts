import { DiceRoller } from "../dice-roller";

export class StringDiceCalculator {
    diceCharacter: string = "D";
    diceRoller: DiceRoller = new DiceRoller();
    operators = new RegExp(/\+|-|\/|\*/);

    public CalculateFromString(input: string): number {
        if (!input) {
            return 0;
        }
        let startsNegative = input.substr(0, 1) === "-";
        if (startsNegative) {
            input = input.substr(1);
        }
        this.ThrowErrorIfInvalidStartOrEndOfStringGiven(input);
        let numbersToCalculate = input.split(this.operators);
        const onlyOperators = input.match(this.operators);
        const convertedNumbers: number[][] = this.ConvertDiceValuesToNumbers(numbersToCalculate);
        console.debug("Converted numbers are ", convertedNumbers);
        let convertedString = "";

        if (onlyOperators) {
            if (startsNegative) {
                convertedString += "-";
            }
            for (let index = 0; index < onlyOperators.length; index++) {
                convertedString += String(this.SumNumbers(convertedNumbers[index])) + onlyOperators[index];
            }
            convertedString += this.SumNumbers(convertedNumbers[convertedNumbers.length - 1]);

            console.debug("Converted string before eval is " + convertedString);
            return eval(convertedString);
        }
        else {
            const total = this.SumNumbers(convertedNumbers[0]);
            return startsNegative ? -total : total;
        }
    }

    private SumNumbers(numbers:number[]):number{
        return numbers.reduce((a,b) => a+b, 0);
    }

    private ThrowErrorIfInvalidStartOrEndOfStringGiven(input: string) {
        const lastCharacter = input.slice(-1);
        const firstCharacter = input.slice(0, 1);
        const disallowedFirstCharacters = new RegExp(/\/|\*/);
        if (lastCharacter.match(this.operators) || lastCharacter == this.diceCharacter) {
            throw Error("Last character cannot be an operator or \"D\"");
        }
        if (firstCharacter.match(disallowedFirstCharacters) || firstCharacter == this.diceCharacter) {
            throw Error("First character cannot be an operator or \"D\"");
        }
    }

    private ConvertDiceValuesToNumbers(values: string[]): number[][] {
        let convertedValues:number[][] = [];

        for (let value of values) {
            let convertedValue: number;
            if (value.indexOf(this.diceCharacter) != -1) {
                const total = this.ConvertDiceValueToNumbers(value);
                convertedValues.push(total);
            }
            else {
                convertedValues.push([Number(value)]);
            }
        }

        console.log("Converted values:" + convertedValues.join(","))
        return convertedValues;
    }

    private ConvertDiceValueToNumbers(value: string): number[] {
        let splitValue = value.split(this.diceCharacter);
        const numberOfDiceRolls = Number(splitValue[0]);
        const numberOfSides = Number(splitValue[1]);
        if (splitValue.length > 2) {
            throw Error(value + " is an invalid value");
        }
        const diceRolls = this.diceRoller.rollDice(numberOfSides, numberOfDiceRolls);

        return diceRolls;
    }

}
