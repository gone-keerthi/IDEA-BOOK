const mongoose = require ('mongoose');

const questionSchema = new mongoose.Schema({
    questionNumber:{
        type:Number,
        required:false
    },
    question:{
        type: String,
    },
    optionType:{
        type: String,
        enum: ["text","imageURL","text_imageURL"],
        required: false
    },
    options:{
        type:[String],
        required: false,
    },
    correctOption:{
        type:String,
        // enum: ["text","imageURL","text_imageURL"],
        required:false
    },
    timer:{
        type: Number,
        required: false
    },
    impressions: {
        type: Number,
        default: 0,
      },
});

module.exports = questionSchema;