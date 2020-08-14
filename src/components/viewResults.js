import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import _ from "underscore";
import { Form, Radio, Dropdown, Button } from "semantic-ui-react";
const axios = require("axios");

function ViewResult() {
  const [quizData, setQuizData] = useState({});
  const [options, setOptions] = useState([]);
  const [quizSelected, setQuizSelected] = useState("");
  useEffect(() => {
    axios
      .post(
        "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/",
        { type: "getQuizIds" }
      )
      .then(function(response) {
        if (response.data.success) {
          console.log("response -success", response.data.data);
          let { Items } = response.data.data;
          let newOptions = _.map(Items, (state, index) => ({
            key: state.quizId,
            text: `${state.topic}  (${new Date(
              +state.timeStamp
            ).toDateString()})`,
            value: state.quizId
          }));
          setOptions(newOptions);
        } else {
          console.log("response -- failed", response);
        }
      })
      .catch({

      });
  }, []);
  const handleFetch = () => {
    axios
      .post(
        "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/",
        { type: "getQuizAnswers", quizSelected : quizSelected  }
      )
      .then(function(response) {
        if (response.data.success) {
          console.log('in get answers get data',response.data)
        } else {
          console.log("response -- failed", response);
        }
      })
      .catch({
        
      });
  }
  return (
    <div>
      in view results - {quizSelected}
      <Dropdown
        placeholder="State"
        fluid
        search
        selection
        options={options}
        onChange={(e, { value }) => {
          setQuizSelected(value);
        }}
      />
      <Button primary onClick={() => handleFetch()} loading={false}>
        fetch
      </Button>
    </div>
  );
}

export default ViewResult;
