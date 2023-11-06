import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import "./dashboard.css";
import CreateQuiz from "../CreateQuizPage/CreateQuiz";
import Analytics from "../AnalyticsPage/Analytics";
// import Dummy from '../CreateQuizPage/Dummy'
import axios from 'axios';
// import Questionnaire from "../CreateQuizPage/Quesstionaire";


const DashBoard = () => {
  // const date = new Date();
  // const options = { year: "numeric", month: "long", day: "numeric" };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [QuizLength, setQuizLength] = useState(0);
  const [QuestionsLength, setQuestionsLength] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const handleCreateQuiz = () => {
    setActiveComponent("createQuiz");
  };

  const handleShowAnalytics = () => {
    setActiveComponent("analytics");
  };

  const handleDashboard = () => {
    setActiveComponent("dashboard");
  };
  
  // const handleQuizView = (quizId) => {
  //   axios.post(`/quiz/increment-impression/${quizId}`)
  //     .then(response => {
  //       // Handle success, you can refresh the data if needed.
  //     })
  //     .catch(error => {
  //       console.error('Error incrementing quiz impression:', error);
  //     });
  // };

  useEffect(() => {
    axios.get('http://localhost:5000/quiz/length')
      .then(response => {
        setQuizLength(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });

      axios.get('http://localhost:5000/questions/length') 
      .then(response => {
        setQuestionsLength(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching questions length:', error);
      });

      axios.get('http://localhost:5000/quiz') 
      .then(response => {
        setQuizData(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  return (
    // <div className="container">
      <div className="dashboard-container">
        <div className="left-container">
          <div className="left-container-header">
            <p>QUIZZIE</p>
          </div>
          <div className="left-container-mid">
            <button id="dashboard-btn" onClick={handleDashboard} >
              Dashboard
            </button>
            <button id="analytics-btn" onClick={handleShowAnalytics} >
              Analytics
            </button>
            <button id="create-quiz-btn" onClick={handleCreateQuiz} >
              Create Quiz
            </button>
          </div>
          <div className="left-container-footer">
            <hr />
            <button id="logout-btn">Log Out</button>
          </div>
        </div>

        {activeComponent === "dashboard" && (
          <div className="right-container">
            <div className="right-container-header">
              <card id="created-quiz">
                <span> {QuizLength} Quiz Created</span>
              </card>
              <card id="questions-created">
                <span> {QuestionsLength} Questions Created</span>
              </card>
              <card id="total-impressions">
                <span> 900 Total Impressions</span>
              </card>
            </div>

            <div className="right-container-body">
            
              <p>Trending Quizes</p>
              <div className="right-container-body-cards">
                {quizData.map((el, ind) => (
                <div className="card-1" key={el._id}>
                <span>{el.quizName}</span>
                <span> {<FiEye className="eye-icon" />} {el.impressions} </span>
                <span>Created On: {formatDate(el.createdAt)} </span>
              </div>
                ))}
                {/* <div className="card-1">
                  <span>Quiz 1</span>
                  <span> {<FiEye className="eye-icon" />} </span>
                  <span>Created On: {dateString(quizData[2].createdAt)} </span>
                </div> */}
              </div>
            </div>
          </div>
        )}

        <div className="create-Quiz-container">
          {activeComponent === "createQuiz" && <CreateQuiz />}
        </div>
        <div className="analytics-container">
          {activeComponent === "analytics" && <Analytics />}    
        </div>

        {/* <Questionnaire/> */}
      </div>
    // </div>
  );
};

export default DashBoard;
