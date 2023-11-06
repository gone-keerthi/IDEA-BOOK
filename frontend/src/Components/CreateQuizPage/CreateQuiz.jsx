import React, { useState } from "react";
import "./create-quiz.css";
import { FiX, FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Success from "./SuccessPage/Success";
import Timer from "./TimerComponent/Timer";
import QuestionForm from "./Quesstionaire";

const CreateQuiz = () => {
  const [form, setForm] = useState(true);
  const [slipData, setSlipData] = useState("");
  const [slip, setSlip] = useState([]);

  const [questionsData, setQuestionsData] = useState([{
    question: "",
    options: [],
    correctOption: "",
    order: 1,
    optionType: "",
  }]);

  const handleQuestionFieldInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionsData({ ...questionsData, [name]: value })
  };
 
  const [QAform, setQAForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [displayValue, setDisplayValue] = useState();
  const [displayOptionType, setDisplayOptionType] = useState("");
  const [optionType, setOptionType] = useState("");
  const [showInputFormContainer, setShowInputContainer] = useState([]);

  const [showQuizForm, setShowQuizForm] = useState(false);
  const handleShowQuizForm = () => {
    setShowQuizForm(true)
  };

  const handleAddOption = () => {
    const newOption = {
      id: showInputFormContainer.length + 1,
      type: "text",
      value: "",
      displayOptionType: "",
    };

    setShowInputContainer([...showInputFormContainer, newOption]);
  };
  const addSlip = () => {
    const newSlip = [slipData];
    setSlip([...slip, newSlip]);
    setSlipData("");
  };

  const handleSetInputChange = (el) => {
    const value = el.target.value;
    setSlipData(value);
    // quizData.quizName = value;
    // setQuizData(quizData)
  };

  const handleQAform = () => {
    setQAForm(true);
    setForm(false);
  };

  const handleShowSuccess = () => {
    setShowSuccess(true);
    setQAForm(false);
  };

  // const [showTrial, setShowTrial] = useState(false);
  // const handleSetShowTrial = () => {
  //   setShowTrial(true);
  // };

  const handleSetDisplayValue = () => {
    const slipDataValue = [slipData];
    setDisplayValue(slipDataValue);
  };

  const handleDisplayOptionType = () => {
    setDisplayOptionType(true);
  };

  const handlesetOptionType = () => {
    setOptionType(optionType);
  };

  const [quizData, setQuizData] = useState({
    quizName: "",
    qnaType: "",
  });

  const handleQuizInputNameChange = (el) => {
    const value = el.target.value;
    quizData.quizName = value;
    // console.log(quizData)
    setQuizData(quizData);
  };

  const handleQuizInputTypeChange = (el) => {
    const value = el.target.value;
    quizData.qnaType = value;
    setQuizData(quizData);
  };

  const handleQuizData = async () => {
    try{
    const QuestionResponse = await fetch ('http://localhost:5000/question',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({...questionsData,id:'6545e61407234833c852bf12'}),
    });
    if (QuestionResponse.status === 201) {
      const newQuestion = await QuestionResponse.json();
      setQuizData({
        ...quizData,
        questions: [...(quizData.questions || []), newQuestion._id],
      });
  
      const QuizResponse = await fetch("http://localhost:5000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      if (QuizResponse.status === 201){
        console.log("quiz data added Successfully")
      }
      else{
        console.log("failed to add quiz data")
      }
    }
    } catch(err){
      console.log(err)
  }};
  

  // const handleQuizData = async() => {
  //   try{
  //     const QuizResponse = await fetch("http://localhost:5000/quiz", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(quizData),
  //     });
  //   }catch(err) {
  //     console.log(ErrorEvent)
  //   }
  // }

  return (
    <div className="quiz-form">
      {form && (
        <div className="form">
          <input
            type="text"
            placeholder="Quiz name"
            // onChange={handleQuizInputNameChange}
            // value={quizData.quizName}
            required
            onChange={handleQuizInputNameChange}
          />
          <label for="quizType"> Quiz Type </label>
          <input
            type="radio"
            id="Q-A"
            name="type"
            value="Q-A"
            onClick={handleQuizInputTypeChange}
          ></input>
          <label for="Q-A"> Q & A </label>
          <input
            type="radio"
            id="poll-type"
            name="type"
            value="poll-type"
            onClick={handleQuizInputTypeChange}
          />
          <label for="poll-type">Poll Type</label>
          <button type="button">Cancel</button>
          <button
            type="button"
            onClick={() => {
              // handleQAform();
              handleShowQuizForm();
              handleQuizData();
            }}
          >
            Continue
          </button>
        </div>
      )}
      <div>

      {QAform ? (
        <div className="QNA">
          <div className="QNA-header">
            <span>
              {slip.map((el, ind) => (
                <button onClick={handleSetDisplayValue}> {ind + 1} </button>
              ))}
            </span>
            <FiPlus onClick={addSlip} />
            <span> Max 5 questions </span>
          </div>

          <div className="QNA-form">
            <div className="QNA-form-question">
              <input
                type="text"
                placeholder="Poll Question"
                // onChange={handleQuestionFieldInputChange}
                required
              />
              <label for="option-type">Option Type</label>
              <input
                type="radio"
                id="text"
                name="type"
                value="text"
                onClick={() => {
                  setDisplayOptionType("text");
                }}
                // onChange={handleQuestionInputChange}
              />
              <label for="text">Text</label>
              <input
                type="radio"
                id="image"
                name="type"
                value="imageURL"
                onClick={() => {
                  setDisplayOptionType("imgUrl");
                }}
              />
              <label for="image">Image URL</label>
              <input
                type="radio"
                id="text-image"
                name="type"
                value="text-image"
                onClick={() => {
                  setDisplayOptionType("textImgUrl");
                }}
              />
              <label htmlFor="text-image">Text & Image URL</label>
            </div>
            <div className="Text-type-component">
              {displayOptionType === "text" ? (
                <div className="option-container">
                  <button id="add-option-btn" onClick={handleAddOption}>
                    Add option
                  </button>
                  {showInputFormContainer ? (
                    <div className="form-text-container">
                      {showInputFormContainer.map((el) => (
                        <div className="form-input-text-data">
                          <input type="radio" />
                          <input
                            type=" text"
                            // value={el.value}
                            placeholder="Text"
                          />
                          <FiTrash2 className="delete-icon" />
                        </div>
                      ))}
                      <Timer />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="image-type-component">
              {displayOptionType === "imgUrl" ? (
                <div className="option-container">
                  <button id="add-option-btn" onClick={handleAddOption}>
                    Add option
                  </button>
                  {showInputFormContainer ? (
                    <div className="form-image-container">
                      {showInputFormContainer.map((el) => (
                        <div className="form-input-image-data">
                          <input type="radio" />
                          <input
                            type=" image"
                            // value={el.value}
                            placeholder="image URL"
                          />
                          <FiTrash2 />
                        </div>
                      ))}
                      <Timer />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="text-image-type-component">
              {displayOptionType === "textImgUrl" ? (
                <div className="option-container">
                  <button id="add-option-btn" onClick={handleAddOption}>
                    Add option
                  </button>
                  {showInputFormContainer ? (
                    <div className="form-text-container">
                      {showInputFormContainer.map((el) => (
                        <div className="form-input-text-data">
                          <input type="radio" 
                          // value={questionsData.optionType}
                          // onChange={handleQuestionFieldInputChange}
                          />
                          <input
                            type="text"
                            // value={questionsData.options}
                            // onChange={handleQuestionFieldInputChange}
                            placeholder="Text"
                          />
                          {/* <input type= "image" value {el.value} placeholder="ImageURL" /> */}
                          <FiTrash2 className="delete-icon" />
                        </div>
                      ))}
                      <Timer />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            {displayValue ? (
              <div className="QNA-form-body">{displayValue}</div>
            ) : null}
          </div>
          <div className="QNA-form-footer">
            <button id="cancel-btn">Cancel</button>
            <button id=" create-quiz-btn"
            //  onClick={handleShowSuccess}
            onClick={() => {
              // handleQAform();
              // handleQuizData();
              handleShowSuccess();
            }}
            >
              Create Quiz
            </button>
          </div>
        </div>
      ) : null}

      {showSuccess ? (
        <div className="success-message">
          <Success />
        </div>
      ) : null}
      </div>
      {showQuizForm ? (
      <div >
        <QuestionForm/>
      </div>
      ):null }
    </div>
  );
};

export default CreateQuiz;
