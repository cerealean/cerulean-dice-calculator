import * as randomjs from 'random-js';
export class DiceRoller {
    minimumDiceRoll:number = 1;
    private engine = randomjs.Random.engines.mt19937().autoSeed();

    public rollDie(numberOfSides:number):number {
        return randomjs.Random.die(numberOfSides)(this.engine);
    }

    public rollDice(numberOfSides:number, numberOfTimesToRoll:number):number[] {
        return randomjs.Random.dice(numberOfSides, numberOfTimesToRoll)(this.engine);
    }
}
