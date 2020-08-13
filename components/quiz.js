import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { addCurrentQuestion } from "../redux/actions";
import { SET_TOPICS, SET_QUESTIONS } from "../redux/actionTypes";
import { setTopics } from "../redux/actions";
import ShowQuestion from "./showQuestion";
import { toast } from "../utils/toast";
import { Input, Modal, Button } from 'semantic-ui-react'
const axios = require("axios");

function Quiz({ ...props }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizInfo, setQuizInfo] = useState({ topic: "def", questions: [] });
  const [isFetched, setIsFetched] = useState(false);
  const [userName, setUserName] = useState('');
  const [open, setOpen] = React.useState(false)
  let quizId = props.match.params.id == ':id' ? '7647dcd7-95ae-4e66-ae53-8ca2a6729da9' : props.match.params.id

  useEffect(() => {
    console.log("in comp did mount", props);
    axios
      .get(
        "https://hwjiaglg1m.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/" + quizId
      )
      .then(function(response) {
        console.log('in get quiz info', response.data);
        if(!response.data.success){
          toast.error('quiz error')
          return
        }
        setQuizInfo(response.data.data);

        props.store.dispatch(
          {
            type: "ADD_QUIZINFO",
            payload: response.data.data
          },
          setQuizIndex(0),
          setIsFetched(true)
        );
      })
      .catch(function(error) {
        // handle error
        console.log("error---", error);
      });
  }, []);

  const handleChangeQuestion = arg => {
    console.log("in quiz.js", quizInfo);
    if (arg == "prev" && quizIndex - 1 >= 0) {
      setQuizIndex(quizIndex - 1);
    } else if (arg == "next" && quizIndex + 1 < quizInfo.questions.length) {
      setQuizIndex(quizIndex + 1);
    }
  };
  const updateUserAnswer = arg => {
    let result = { ...quizInfo };
    result.questions[quizIndex].userAnswer = arg.value;
    setQuizInfo(result);
  };
  
  const handleSubmit = () => {
    if(userName.length < 3){
      toast.error('Please enter username. It should have atleast 3 charecters', userName)
      return
    }
    let correctAnswers = 0
    quizInfo.questions.map((q, index) => {
      console.log(q.answer, q.userAnswer)
      if(q.answer == q.userAnswer){
        ++correctAnswers
      }
    })
    let percentage = (correctAnswers > 0 && quizInfo.questions.length > 0) ? (correctAnswers/quizInfo.questions.length) * 100 : 0.00
    percentage = percentage.toFixed(2)
    let param = {
      correctAnswers, 
      type : 'submitAnswers',
      currentQuizId:quizId,
      userName,
      percentage
    };
    let that = this;
    axios
      .post(
        // " https://hwjiaglg1m.execute-api.ap-south-1.amazonaws.com/dev/quiz-1",
        "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/",
        param
      )
      .then((response) => {
        if(!response.data.success){
          toast.error('failed')
          return
        }
        toast.success('uploaded succesfuly')
      })
      .catch(() => {
        toast.error('submit failed')
      })
    // toast.success(correctAnswers)
  }
  return (
    <div>
    {isFetched &&  <div>
      <Button primary onClick={() => handleChangeQuestion("prev")}>
        Previous question
      </Button>
      {quizInfo.topic}
      <Button primary onClick={() => handleChangeQuestion("next")}>
        Next question
      </Button>
      <Button primary onClick={() => handleSubmit()}>
        Submit
      </Button>
      user name : <Input placeholder='your name here..' value = {userName} onChange = {(e, {value}) => {setUserName(value)}} />
      
      <div>question {quizIndex + 1} of {quizInfo.questions.length}</div>
        <ShowQuestion
          quizIndex={quizIndex}
          updateUserAnswer={updateUserAnswer}
          currentQues={quizInfo.questions[quizIndex]}
        />
      </div>}
      {
        !isFetched && <div>Loading...</div>
      }
      
    </div>
  );
}
const mapStateToProps = state => ({ storeState: state, store });

export default connect(
  mapStateToProps,
  { setTopics }
)(Quiz);
