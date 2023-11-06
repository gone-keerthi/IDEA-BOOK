const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Types;

const Quiz = require ('./quiz');
const User = require ('./user');

const answerSchema = new mongoose.Schema({
    quizId:{
        type: ObjectId,
        ref: Quiz,
        required: true
    },
    userId:{
        type: ObjectId,
        ref: User,
        required: true
    },
    answers:{
        quizId:ObjectId,
        answer:String
    },
});

module.exports = mongoose.model('Answer', answerSchema);