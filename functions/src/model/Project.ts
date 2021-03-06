import { ObjectId } from "mongodb";

export default interface Project {
    
    category?: string;
    name: string;
    description?: string;
    label?: string;
    priority?: number;
    _id?: ObjectId;
    completed?: boolean;
    user?: string;
    
}