import * as d3 from 'd3-random';
export class DiceRoller {
    minimumDiceRoll:number = 1;

    public rollDie(numberOfSides:number):number {
        const uniformRandomizer = d3.randomUniform(this.minimumDiceRoll, numberOfSides + 1);

        return parseInt(uniformRandomizer());
    }

    public rollDice(numberOfSides:number, numberOfTimesToRoll:number):number[] {
        const uniformRandomizer = d3.randomUniform(this.minimumDiceRoll, numberOfSides + 1);
        let numberTotals = [];

        for(let index = 0; index < numberOfTimesToRoll; index++){
            const rolledValue = parseInt(uniformRandomizer());
            numberTotals.push(rolledValue);
        }

        return numberTotals;
    }
}
