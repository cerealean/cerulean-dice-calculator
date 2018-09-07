import { AbilityScore } from "./ability-score";
import { SkillName } from "../enums/skill-name";

export class Skill {
    hasProficiency: boolean;

    constructor(public name: SkillName, public abilityScore: AbilityScore, hasProficiency = false){
        this.hasProficiency = hasProficiency;
    }

    public getValue(proficiencyBonus: number): number {
        return this.hasProficiency ? this.abilityScore.modifier + proficiencyBonus : this.abilityScore.modifier;
    }
}