const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Types;
const Question = require('./questions')
const User = require('./user')

const quizSchema = new mongoose.Schema ({
    quizName:{
        type:String,
        required:true
    },
    qnaType:{
      type: String,
      required: true,  
    },
    userId: {
        type: ObjectId,
        ref: User,
        required:false
    },
    questions:{
        type:[Question],
        required: false
    },
    link:{
        type: String,
        required: false
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    impressions: {
        type: Number,
        default: 0,
      },
});

module.exports = mongoose.model ('Quiz', quizSchema );