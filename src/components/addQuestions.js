import React, { Component } from "react";
import { render } from "react-dom";
import "../style.css";
import "react-toastify/dist/ReactToastify.css";
import { validateQuestion } from "../utils/validateQuestion";
const axios = require("axios");
import { toast } from "../utils/toast";
import { Button } from "semantic-ui-react";
import { Form, TextArea, Select, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { addCurrentQuestion } from "../redux/actions";
import { SET_TOPICS, SET_QUESTIONS } from "../redux/actionTypes";

const getInitialCurrentQuestion = () => {
  return {
    name: "",
    options: { o1: "", o2: "", o3: "", o4: "" },
    answer: 0
  };
};

class AddQuestions extends Component {
  constructor(props) {
    super(props)
    this.questionNameRef = false;
    super();
    this.state = {
      name: "React",
      questions: [],
      quizTopic: "",
      isUploading: false,
      currentQuestion: getInitialCurrentQuestion()
    };
  }
  componentWillUnmount = () => {
  };
  componentDidMount = ()=>{
    store.subscribe(()=>this.handleUpdateFromStore())
  }
  handleUpdateFromStore = () => {
      if(this.props.questionsAnswers.length !== this.state.questions.length){
        this.setState({
          questions : this.props.questionsAnswers
        })
      }
  }

  handleToast = arg => {
    toast(arg);
  };

  handleAddQuestion = () => {
    let { currentQuestion, questions } = this.state;
    questions.push(currentQuestion);
    currentQuestion = getInitialCurrentQuestion();
    this.setState({ questions, currentQuestion }, () => {
      store.dispatch(addCurrentQuestion(currentQuestion))
    });
  };

  handleUploadQuestion = () => {
    this.setState({
      isUploading: true
    });
    let param = {
      questions: this.state.questions,
      topic: this.state.quizTopic
    };
    let that = this;

    axios
      .post(
        // " https://hwjiaglg1m.execute-api.ap-south-1.amazonaws.com/dev/quiz-1",
        "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/",
        param
      )
      .then(function(response) {
        if (response.data.success) {
          toast.success("Questions added succesfully");
          that.setState({
            isUploading: false
          });
        } else {
          toast.error("Problem while adding your questions. Please try again");
          that.setState({
            isUploading: false
          });
        }
      })
      .catch(function(error) {
        // handle error
        that.setState({
          isUploading: false
        });
      });
  };

  handleOnChange = arg => {
    let { type, value } = arg;
    let { currentQuestion } = this.state;
    this.setState(
      state => {
        switch (type) {
          case "quesName":
            currentQuestion.name = value;
            break;
          case "o1" || "o3" || "o4":
            currentQuestion.options[type] = value;
            break;
          case "o2":
            currentQuestion.options[type] = value;
            break;
          case "o3":
            currentQuestion.options[type] = value;
            break;
          case "o4":
            currentQuestion.options[type] = value;
            break;
          case "answer":
            currentQuestion.answer = value;
        }
        return currentQuestion;
      }
    );
  };

  render() {
    window.state = this.state;
    let { currentQuestion } = this.state;
    return (
      <div>
        <Input
          size="huge"
          fluid
          transparent
          placeholder="Topic name here"
          value={this.state.quizTopic}
          onChange={(e, { value }) => {
            this.setState({
              quizTopic : value
            })
          }}
        />
        <br />
        total questions added - {this.state.questions.length}
        <hr />
        <Form>
          <Form.Field inline>
            <label>Question : </label>
            <TextArea
              placeholder="Write Question"
              value={currentQuestion.name}
              onChange={e =>
                this.handleOnChange({ type: "quesName", value: e.target.value })
              }
            />
          </Form.Field>
          <Form.Group>
            <Form.Input
              label="1."
              placeholder="1st option"
              value={currentQuestion.options.o1}
              width={8}
              onChange={e =>
                this.handleOnChange({ type: "o1", value: e.target.value })
              }
            />
            <Form.Input
              label="2."
              placeholder="2nd option"
              value={currentQuestion.options.o2}
              width={8}
              onChange={e =>
                this.handleOnChange({ type: "o2", value: e.target.value })
              }
            />
            <Form.Input
              label="3."
              placeholder="3rd option"
              value={currentQuestion.options.o3}
              width={8}
              onChange={e =>
                this.handleOnChange({ type: "o3", value: e.target.value })
              }
            />
            <Form.Input
              label="4."
              placeholder="4th option"
              value={currentQuestion.options.o4}
              width={8}
              onChange={e =>
                this.handleOnChange({ type: "o4", value: e.target.value })
              }
            />
          </Form.Group>
          <Form.Field>
            <label>Answer : </label>
            <Select
              placeholder="Select answer"
              value={this.state.currentQuestion.answer}
              width={4}
              onChange={(e, { value }) => {
                this.handleOnChange({ type: "answer", value });
              }}
              options={[
                { key: "1", value: "1", text: "1" },
                { key: "2", value: "2", text: "2" },
                { key: "3", value: "3", text: "3" },
                { key: "4", value: "4", text: "4" }
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Button primary onClick={() => this.handleAddQuestion()}>
              Add question
            </Button>
          </Form.Field>
        </Form>
        <hr />
        <hr />
        <hr />
        <Button
          primary={!this.state.isUploading}
          secondary={this.state.isUploading}
          onClick={() => this.handleUploadQuestion()}
          loading={this.state.isUploading}
        >
          upload question
        </Button>
        <Button primary>Secondary</Button>
        
      </div>
    );
  }
}
const mapStateToProps = state => ({ storeState : state, questionsAnswers : state.questionsAnswers });

export default connect(
  mapStateToProps,
  { addCurrentQuestion }
)(AddQuestions);
// export default AddQuestions;
