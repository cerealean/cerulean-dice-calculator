import * as abilityScoreModifiers from './../resources/abilityScoreModifiers.json';
import { AbilityScoreName } from '../enums/ability-score-name';

export class AbilityScore {
    public hasProficiencySavingThrow: boolean;

    constructor(public name: AbilityScoreName, public value: number, hasProficiencySavingThrow = false){
        this.hasProficiencySavingThrow = hasProficiencySavingThrow;
    }

    get modifier(){
        return abilityScoreModifiers[this.value];
    }

    get savingThrow(){
        return this.hasProficiencySavingThrow ? this.value + this.modifier : this.value;
    }
}