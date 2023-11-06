import React from "react";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiShare2 } from "react-icons/fi";
import "./analytics.css";
import axios from 'axios'

const Analytics = () => {
  const [quizData, setQuizData] = useState([]);
  const [Delete, setDelete] = useState(false);

  const handleDelete =(quizId) => {
    axios.delete(`http://localhost:5000/quiz/${quizId}`)
    .then(() => {
      setQuizData((prevData) => prevData.filter((quiz) => quiz._id !== quizId));
    })
    .catch((error) => {
      console.error("Error deleting quiz:", error);
    });
  };

  

  useEffect (() => {
    axios.get('http://localhost:5000/quiz') 
      .then(response => {
        setQuizData(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, [])
  return (
    <div className="analytics-container">
      <p>Quiz Analysis</p>
      <div className="analysis-table">
        <table>
          <thead>
            <tr>
              <th> S.No </th>
              <th> Quiz Name </th>
              <th> Created On </th>
              <th> Impression </th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((quiz, ind) => (
                <tr key={quiz._id}>
                <td> {ind +1} </td>
                <td> {quiz.quizName} </td>
                <td> created on: {quiz.createdAt} </td>
                <td> Impressions {quiz.impressions} </td>
                <td>
                  <FiEdit id = "edit-icon" />
                </td> 
                <td>
                  <FiTrash2 id = "delete-icon" 
                  onClick={() => handleDelete(quiz._id)}
                  />
                </td>
                <td>
                  <FiShare2 id = "share-icon"
                  //  onClick={Copy}
                    />
                </td>
                <td> Question wise Analysis </td>
                <td></td>
              </tr>
            ))}
            {/* <tr>
              <td> 1 </td>
              <td> Quiz 1 </td>
              <td> created on: </td>
              <td> Impressions </td>
              <td>
                <FiEdit id = "edit-icon" />
              </td> 
              <td>
                <FiTrash2 id = "delete-icon"/>
              </td>
              <td>
                <FiShare2 id = "share-icon"
                //  onClick={Copy}
                  />
              </td>
              <td> Question wise Analysis </td>
              <td></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
