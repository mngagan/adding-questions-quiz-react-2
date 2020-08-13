import { SET_TOPICS, SET_QUESTIONS, ADD_CURRENT_QUESTION } from "./actionTypes";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const intialState = () => ({
  quizTopic: "",
  questionsAnswers: [],
  quizInfo: {
    topic: "",
    questions: [],
    activeIndex: 0
  },
  currentQuestion: {
    question: "",
    options: [],
    anwser: 0
  },
  prevQuizInfo: {
    fetched: false,
    topics: {},
    questions: []
  }
});

let rootReducer = (state = intialState(), action) => {
  switch (action.type) {
    case SET_TOPICS:
      let { prevQuizInfo } = state;
      prevQuizInfo.topics = action.payload;
      return state;
      break;
    case ADD_CURRENT_QUESTION:
      let { questionsAnswers } = state;
      questionsAnswers.push(action.payload);
      return state;
      break;
    case "ADD_QUIZINFO":
      return { ...state, quizInfo: { ...state.quizInfo, ...action.payload } };
      break;
    case "UPDATE_USER_ANSWER":
      let { quizInfo } = state;
      quizInfo.questions[action.payload.quizIndex].userAnswer =
        action.payload.value;
      return state;
      break;
    default:
      return state;
  }
};

let store = createStore(rootReducer);
window.store = store;
export default store;
