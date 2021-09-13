import { ObjectId } from "mongodb";

export default interface Project {
    name: string;
    description?: string;
    label?: string;
    category?: string;
    priority: number;
    _id?: ObjectId;
    completed?: boolean;
    username?: string;
}