import mongoose, { Schema } from "mongoose";
import './question.js'


const { ObjectId } = Schema.Types;

const schema = new Schema({
    questionId: { type: ObjectId, ref: 'question' },
    answer: {type: String}
});

const answers = mongoose.model('answer', schema);
export default answers;
        