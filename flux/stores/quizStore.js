/* eslint-disable dot-notation, camelcase */
"use strict";
import { createStore } from "alt-utils/lib/decorators";
import alt from "../alt";
import _ from "underscore";
import objectPath from "object-path";
import quizActions from "../actions/quizActions";

function getInitState() {
  return {
    quizTopic : '',
    QuestionsAnswers : [],
    quizInfo : [],
    currentQuestion : {
      question : '',
      options : [],
      anwser : 0
    },
    prevQuizInfo:{
      fetched : false,
      topics : {},
      questions : []
    }
  };
}

class quizStore {
  constructor() {
    this.bindActions(quizActions);
    this.state = getInitState();
  }
  onUpdateState = obj => {
    this.setState(obj);
  };
}

quizStore.displayName = "quizStore";

export default createStore(alt)(quizStore);
