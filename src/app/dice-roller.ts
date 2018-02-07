import * as Random from 'random-js';
export class DiceRoller {
    minimumDiceRoll:number = 1;
    randomGenerator:any = new Random(Random.engines.mt19937().autoSeed());

    public rollDice(numberOfSides:number):number {
        return this.getRandomIntInclusive(this.minimumDiceRoll, numberOfSides);
    }

    private getRandomIntInclusive(min, max):number {
        return this.randomGenerator.integer(min, max);
    }
}
