import React, { Component } from "react";
import { render } from "react-dom";
const axios = require("axios");
import { connect } from "react-redux";
import { setTopics } from "../redux/actions";
import { SET_TOPICS, SET_QUESTIONS } from "../redux/actionTypes";

class GetQuestions extends Component {
  handleMock = () => {
    // console.log(SET_TOPICS,setTopics('test'))
    let that = this;
    // store.dispatch({
    //   type : 'SET_TOPICS', payload : 'payload'
    // })
// that.props.setTopics([1,2]);
    // console.log("in mock service called");
    // return dispatch => {
    //   console.log("in other function");
      axios
        .get(
          "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/topics"
        )
        .then(function(response) {
          // handle succs
          // console.log('success', response.data);
          // that.props.setTopics(response.data);
          store.dispatch(setTopics(response.data))
        })
        .catch(function(error) {
          // handle error
          console.log("error", error);
        });
    // };
  };
  handleMock_not = () => {
    let that = this;
    console.log("test");
    return dispatch => {
      setTimeout(() => {
        that.props.setTopics("test");
      }, 2000);
    };
  };

  getTopics = () => async (dispatch, getState) => {
    const data = [1, 2, 3];
    await setTimeout(() => {}, 2100);
  };

  render() {
    console.log("test", this.props, store);
    return (
      <div>
        from get questigdtbbbb fgons
        <hr />
        <button
          onClick={() => {
            this.handleMock();
            // store.dispatch(this.getTopics());
          }}
        >
          mock service
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  { setTopics }
)(GetQuestions);
