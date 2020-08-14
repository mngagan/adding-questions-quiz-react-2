import { SET_TOPICS, SET_QUESTIONS, ADD_CURRENT_QUESTION, SET_QUIZINFO } from "./actionTypes";

export const setTopics = payload => ({
  type: SET_TOPICS,
  payload: payload
});

export const setQuestions = payload => {
  return {
    type: SET_QUESTIONS,
    payload: payload
  };
};

export const addCurrentQuestion = payload => {
  return {
    type: ADD_CURRENT_QUESTION,
    payload: payload
  };
};
// const getTopics = () => {
//   return dispatch => {
//     axios.get("https://jsonplaceholder.typicode.com/todos/1")
//       .then(response => response.json())
//       .then(json => console.log(json)
//       dispatch()
//       );
//   };
// };
