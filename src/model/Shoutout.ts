import { ObjectId } from "mongodb";

export default interface Shoutout {
    title: string;
    description: string;
    priority: number;
    _id?: ObjectId;
}