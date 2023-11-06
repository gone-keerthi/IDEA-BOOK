// import React, { useState } from 'react';

// const QuizForm = () => {
//   const [questionsData, setQuestionsData] = useState([{
//     question: '',
//     options: ['', ''], // Initialize with two empty options
//     correctOption: '',
//     order: 1,
//     optionType: 'text',
//   }]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const handleQuestionChange = (event) => {
//     const updatedQuestionsData = [...questionsData];
//     updatedQuestionsData[currentQuestionIndex].question = event.target.value;
//     setQuestionsData(updatedQuestionsData);
//   };

//   const handleOptionChange = (event, optionIndex) => {
//     const updatedQuestionsData = [...questionsData];
//     updatedQuestionsData[currentQuestionIndex].options[optionIndex] = event.target.value;
//     setQuestionsData(updatedQuestionsData);
//   };

//   const handleAddQuestion = () => {
//     if (questionsData.length < 4) {
//       setQuestionsData([...questionsData, {
//         question: '',
//         options: ['', ''],
//         correctOption: '',
//         order: questionsData.length + 1,
//         optionType: 'text',
//       }]);
//     }
//   };

//   const handleAddOption = () => {
//     if (questionsData[currentQuestionIndex].options.length < 4) {
//       const updatedQuestionsData = [...questionsData];
//       updatedQuestionsData[currentQuestionIndex].options.push('');
//       setQuestionsData(updatedQuestionsData);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questionsData.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   return (
//     <div>
//       {questionsData.map((questionData, index) => (
//         <div key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
//           <textarea
//             placeholder="Enter your question"
//             value={questionData.question}
//             onChange={handleQuestionChange}
//           />
//           {questionData.options.map((option, optionIndex) => (
//             <input
//               key={optionIndex}
//               type="text"
//               placeholder={`Option ${optionIndex + 1}`}
//               value={option}
//               onChange={(e) => handleOptionChange(e, optionIndex)}
//             />
//           ))}
//           <button onClick={handleAddOption}>Add option</button>
//         </div>
//       ))}
//       <button onClick={handleAddQuestion}>Add Question</button>
//       <button onClick={handlePreviousQuestion}>Previous</button>
//       <button onClick={handleNextQuestion}>Next</button>
//     </div>
//   );
// };

// export default QuizForm;


import React, { useState } from 'react';

const QuestionForm = () => {
  const [questionsData, setQuestionsData] = useState([
    {
      question: '',
      options: [],
      correctOption: '',
      order: 1,
      optionType: 'text', // Default option type
    },
  ]);

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      options: [],
      correctOption: '',
      order: questionsData.length + 1,
      optionType: 'text', // Default option type
    };
    setQuestionsData([...questionsData, newQuestion]);
  };

  const addOption = (questionIndex) => {
    const question = questionsData[questionIndex];
    if (question.options.length < 4) {
      const newOptions = [...questionsData];
      if (question.optionType === 'imgUrl') {
        newOptions[questionIndex].options.push({ type: 'imgUrl', value: '' });
      } else {
        newOptions[questionIndex].options.push({ type: 'text', value: '' });
      }
      setQuestionsData(newOptions);
    }
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions[questionIndex].question = value;
    setQuestionsData(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions[questionIndex].options[optionIndex].value = value;
    setQuestionsData(updatedQuestions);
  };

  const handleOptionTypeChange = (questionIndex, optionIndex, optionType) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions[questionIndex].options[optionIndex].type = optionType;
    setQuestionsData(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions[questionIndex].correctOption = value;
    setQuestionsData(updatedQuestions);
  };

  const handleNavigation = (direction) => {
    // Implement logic to navigate through questions
  };

  return (
    <div>
      {questionsData.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            placeholder="Enter the question"
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder={`Enter option ${optionIndex + 1}`}
                value={option.value}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              />
              <select
                value={option.type}
                onChange={(e) => handleOptionTypeChange(questionIndex, optionIndex, e.target.value)}
              >
                <option value="text">Text</option>
                <option value="imgUrl">Image URL</option>
              </select>
            </div>
          ))}
          <select
            value={question.correctOption}
            onChange={(e) => handleCorrectOptionChange(questionIndex, e.target.value)}
          >
            {question.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <button onClick={() => addOption(questionIndex)}>Add Option</button>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={() => handleNavigation('previous')}>Previous</button>
      <button onClick={() => handleNavigation('next')}>Next</button>
    </div>
  );
};

export default QuestionForm;
