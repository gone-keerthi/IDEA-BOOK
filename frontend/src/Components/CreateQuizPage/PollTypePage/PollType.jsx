import React, { useState } from "react";
import "./create-quiz.css";
import { FiX, FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Success from "./SuccessPage/Success";
import Timer from './TimerComponent/Timer';

const CreateQuiz = () => {
  const [form, setForm] = useState(true);
  const [questions, setQuestions] = useState([
    {
      question: "What are closures?",
      options: ["Option 1", "Option 2"],
      correctOption: "",
      order: 1,
      optionType: "text",
    }
  ]);
  const [slipData, setSlipData] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      options: ["", ""],
      correctOption: "",
      order: questions.length + 1,
      optionType: "text",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuizData = async () => {
    try {
      // Add your API call here to save the quiz data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="quiz-form">
      {form && (
        <div className="form">
          <input
            type="text"
            placeholder="Quiz name"
            required
            onClick={(e) => handleInputChange(0, "question", e.target.value)}
          />
          <label for="quizType"> Quiz Type </label>
          <input type="radio" id="Q-A" name="type" value="Q-A"></input>
          <label for="Q-A"> Q & A </label>
          <input type="radio" id="poll-type" name="type" value="poll-type" />
          <label for="poll-type">Poll Type</label>
          <button type="button">Cancel</button>
          <button type="button" onClick={handleQuizData}>
            Continue
          </button>
        </div>
      )}

      <div className="QNA">
        {questions.map((question, index) => (
          <div className="QNA-form" key={index}>
            <div className="QNA-header">
              <span>{index + 1}</span>
              <FiTrash2 onClick={() => removeQuestion(index)} />
            </div>
            <div className="QNA-form-question">
              <input
                type="text"
                placeholder="Poll Question"
                value={question.question}
                onChange={(e) =>
                  handleInputChange(index, "question", e.target.value)
                }
                required
              />
              {/* Rest of the question form fields */}
            </div>
          </div>
        ))}
        <div className="QNA-header">
          <FiPlus onClick={addQuestion} />
          <span> Max 5 questions </span>
        </div>
      </div>

      {showSuccess ? (
        <div className="success-message">
          <Success />
        </div>
      ) : null}
    </div>
  );
};

export default CreateQuiz;
