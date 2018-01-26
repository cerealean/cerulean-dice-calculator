export class DiceRoller {
    minimumDiceRoll:number = 1;

    public rollDice(numberOfSides:number) {
        return this.getRandomIntInclusive(this.minimumDiceRoll, numberOfSides);
    }

    private getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
