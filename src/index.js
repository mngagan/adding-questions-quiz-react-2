import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateQuestion } from "./utils/validateQuestion";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddQuestions from "./components/addQuestions";
import flux from "./flux/index.js";
import GetQuestions from "./components/getQuestions";
import PreviewQuestions from './components/previewQuestions'
import Quiz from './components/quiz'
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import ViewResult from './components/viewResults'

const getFlux = () => {
  console.log(flux);
};

export default function App1() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container-fluid">
          <nav id = 'navIdIndex' className = 'q-nav'>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/addQuestions">Add Questions</Link>
              </li>
              <li>
                <Link to="/getQuestions">Get questions</Link>
              </li>
              <li>
                <Link to="/viewResult">view results</Link>
              </li>
              <li>
                <Link to="/quiz/:id">Quiz</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about">
              <h2>About</h2>
            </Route>
            <Route path="/addQuestions">
              <AddQuestions />
            </Route>
            <Route path="/getQuestions" component = {GetQuestions}></Route>
            <Route path="/quiz/:id" component={(props) => <Quiz {...props}/>}></Route>
            <Route path="/viewResult" component={(props) => <ViewResult {...props}/>}></Route>

            <Route path="/">
              <h2>Home</h2>
            </Route>
          </Switch>
        </div>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

render(<App1 />, document.getElementById("root"));
