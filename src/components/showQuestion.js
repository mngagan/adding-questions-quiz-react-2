import React, { Component , useState, useEffect} from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import _ from 'underscore'
import { Form, Radio } from 'semantic-ui-react'

function ShowQuestion({ ...props} ) {
  let {quizIndex, currentQues, updateUserAnswer} = props
  const updateAnswer = (e, { value }) => {
    updateUserAnswer({value})
  }

  return (
    <div>
      <h4>{currentQues.name}</h4>
      <Form>
      {Object.values(currentQues.options).map((opt, index)=> {
        return <Form.Field>
          <Radio
            label={opt}
            name='radioGroup'
            value={(index + 1) + ''}
            checked={currentQues.userAnswer === (index + 1) + ''}
            onChange={updateAnswer}
          />
        </Form.Field>
      })}
      </Form>
    </div>
  );
}
const mapStateToProps = state => ({ storeState : state,  store });

export default connect(
  mapStateToProps,
  { }
)(ShowQuestion);
