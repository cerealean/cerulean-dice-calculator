import * as proficiencyBonuses from './../resources/proficiencyBonuses.json';
import { AbilityScore } from './ability-score';
import { AbilityScoreName } from '../enums/ability-score-name';
import { SkillName } from '../enums/skill-name';
import { Skill } from './skill';
import { AlignmentName } from '../enums/alignment-name';

export class Character {
    name: string;
    playerName: string;
    race: string;
    class: string;
    alignment: AlignmentName;
    experience: number;
    level: number;
    isInspired: boolean;

    currentHealth: number;
    maxHealth: number;
    temporaryHealth: number;

    private abilityScores: Map<AbilityScoreName, AbilityScore>;
    private skills: Map<SkillName, Skill>;

    get proficiencyBonus(): number {
        return proficiencyBonuses[this.level];
    }

    get passivePerception(): number {
        return 10 + this.getSkillValue(SkillName.Perception);
    }

    get initiative(): number {
        return this.getAbilityScoreModifier(AbilityScoreName.Dexterity);
    }

    constructor() {
        this.abilityScores = new Map<AbilityScoreName, AbilityScore>([
            [AbilityScoreName.Strength, new AbilityScore(AbilityScoreName.Strength, 0)],
            [AbilityScoreName.Dexterity, new AbilityScore(AbilityScoreName.Dexterity, 0)],
            [AbilityScoreName.Constitution, new AbilityScore(AbilityScoreName.Constitution, 0)],
            [AbilityScoreName.Intelligence, new AbilityScore(AbilityScoreName.Intelligence, 0)],
            [AbilityScoreName.Wisdom, new AbilityScore(AbilityScoreName.Wisdom, 0)],
            [AbilityScoreName.Charisma, new AbilityScore(AbilityScoreName.Charisma, 0)]
        ]);

        this.skills = new Map<SkillName, Skill>([
            [SkillName.Athletics, new Skill(SkillName.Athletics, this.getAbilityScore(AbilityScoreName.Strength))],
            [SkillName.Acrobatics, new Skill(SkillName.Acrobatics, this.getAbilityScore(AbilityScoreName.Dexterity))],
            [SkillName.SleightOfHand, new Skill(SkillName.SleightOfHand, this.getAbilityScore(AbilityScoreName.Dexterity))],
            [SkillName.Stealth, new Skill(SkillName.Stealth, this.getAbilityScore(AbilityScoreName.Dexterity))],
            [SkillName.Arcana, new Skill(SkillName.Arcana, this.getAbilityScore(AbilityScoreName.Intelligence))],
            [SkillName.History, new Skill(SkillName.History, this.getAbilityScore(AbilityScoreName.Intelligence))],
            [SkillName.Investigation, new Skill(SkillName.Investigation, this.getAbilityScore(AbilityScoreName.Intelligence))],
            [SkillName.Nature, new Skill(SkillName.Nature, this.getAbilityScore(AbilityScoreName.Intelligence))],
            [SkillName.Religion, new Skill(SkillName.Religion, this.getAbilityScore(AbilityScoreName.Intelligence))],
            [SkillName.AnimalHandling, new Skill(SkillName.AnimalHandling, this.getAbilityScore(AbilityScoreName.Wisdom))],
            [SkillName.Insight, new Skill(SkillName.Insight, this.getAbilityScore(AbilityScoreName.Wisdom))],
            [SkillName.Medicine, new Skill(SkillName.Medicine, this.getAbilityScore(AbilityScoreName.Wisdom))],
            [SkillName.Perception, new Skill(SkillName.Perception, this.getAbilityScore(AbilityScoreName.Wisdom))],
            [SkillName.Survival, new Skill(SkillName.Survival, this.getAbilityScore(AbilityScoreName.Wisdom))],
            [SkillName.Deception, new Skill(SkillName.Deception, this.getAbilityScore(AbilityScoreName.Charisma))],
            [SkillName.Intimidation, new Skill(SkillName.Intimidation, this.getAbilityScore(AbilityScoreName.Charisma))],
            [SkillName.Performance, new Skill(SkillName.Performance, this.getAbilityScore(AbilityScoreName.Charisma))],
            [SkillName.Persuasion, new Skill(SkillName.Persuasion, this.getAbilityScore(AbilityScoreName.Charisma))],
        ]);
    }

    public getAbilityScoreValue(name: AbilityScoreName): number {
        return this.getAbilityScore(name).value;
    }

    public getAbilityScoreModifier(name: AbilityScoreName): number {
        return this.getAbilityScore(name).modifier;
    }

    public getSkillValue(name: SkillName): number {
        return this.getSkill(name).getValue(this.proficiencyBonus);
    }

    private getAbilityScore(name: AbilityScoreName): AbilityScore {
        return this.abilityScores.get(name);
    }

    private getSkill(name: SkillName): Skill {
        return this.skills.get(name);
    }
}