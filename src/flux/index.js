// import addQuestionStore from './stores/addQuestionStore'
// import addQuestionActions from './actions/addQuestionActions'
import quizActions from './actions/quizActions'
import quizStore from './stores/quizStore'

let quizData = {
    actions : quizActions,
    store : quizStore
  }


const fluxObj = {
  quizData
};

window.flux = fluxObj;

export default flux;
