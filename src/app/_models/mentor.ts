import { User} from '../_models/user';
import { Skill } from '../_models/skill';
import { Training } from '../_models/training';

export interface Mentor extends User {

skills : Skill[];
trainings : Training[];
yearsOfExperience : number;
noTrainings : number;
fee: number;

}

export interface FormattedMentor extends Mentor {
    formattedName: string;
    formattedSkills : string
}