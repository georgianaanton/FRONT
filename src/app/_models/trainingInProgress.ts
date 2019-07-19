
import { Training } from './training';
export interface TrainingInProgress {
    
    id: string;
    userId: number;
    description: string;
    mentorName: string;
    mentorId : number;
    // startDate: Date;
    // endDate: Date;
    userRating : number;
    status: string;
    progress?: number;
    

}