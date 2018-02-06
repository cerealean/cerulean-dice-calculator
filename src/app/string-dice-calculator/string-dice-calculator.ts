import { DiceRoller } from "../dice-roller";

export class StringDiceCalculator {
    diceCharacter: string = "D";
    diceRoller: DiceRoller = new DiceRoller();
    operators = new RegExp(/\+|-|\/|x/);

    public CalculateFromString(input: string): number {
        if (!input) {
            return 0;
        }
        let startsNegative = input.substr(0,1) === "-";
        if(startsNegative){
            input = input.substr(1);
        }
        this.ThrowErrorIfInvalidStartOrEndOfStringGiven(input);
        let numbersToCalculate = input.split(this.operators);
        const onlyOperators = input.match(this.operators);
        const convertedNumbers: number[] = this.ConvertDiceValuesToNumbers(numbersToCalculate);
        let convertedString = "";

        if (onlyOperators) {
            if(startsNegative)
            {
                convertedString += "-";
            }
            for (let index = 0; index < onlyOperators.length; index++) {
                convertedString += String(convertedNumbers[index]) + onlyOperators[index];
            }
            convertedString += convertedNumbers[convertedNumbers.length - 1];

            return eval(convertedString);
        }
        else {
            return startsNegative ? -convertedNumbers[0] : convertedNumbers[0];
        }
    }

    private ThrowErrorIfInvalidStartOrEndOfStringGiven(input: string) {
        const lastCharacter = input.slice(-1);
        const firstCharacter = input.slice(0,1);
        const disallowedFirstCharacters = new RegExp(/\/|x/);
        if (lastCharacter.match(this.operators) || lastCharacter == this.diceCharacter) {
            throw Error("Last character cannot be an operator or \"D\"");
        }
        if (firstCharacter.match(disallowedFirstCharacters) || firstCharacter == this.diceCharacter) {
            throw Error("First character cannot be an operator or \"D\"");
        }
    }

    private ConvertDiceValuesToNumbers(values: string[]): number[] {
        let convertedValues: number[] = [];

        for (let value of values) {
            let convertedValue: number;
            if (value.indexOf(this.diceCharacter) != -1) {
                const total = this.ConvertDiceValueToNumber(value);
                convertedValues.push(total);
            }
            else {
                convertedValues.push(Number(value));
            }
        }

        return convertedValues;
    }

    private ConvertDiceValueToNumber(value: string): number {
        let splitValue = value.split(this.diceCharacter);
        const numberOfDiceRolls = Number(splitValue[0]);
        const numberOfSides = Number(splitValue[1]);
        let total = 0;
        if (splitValue.length > 2) {
            throw Error(value + " is an invalid value");
        }
        for (let index = 0; index < numberOfDiceRolls; index++) {
            const rolledValue: number = this.diceRoller.rollDice(numberOfSides);
            total += rolledValue;
        }

        return total;
    }

}
