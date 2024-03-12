import mongoose, {Schema} from "mongoose";

const schema = new Schema({
 question: String,
 number: Number
});

const questions = mongoose.model('question', schema);
export default questions;
