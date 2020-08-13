import React, { Component } from "react";
import { render } from "react-dom";
import flux from "../flux";

export default class PreviewQuestions extends Component{
  constructor(props) {
    super(props);

    console.log(this.props)
}
  

  render(){
    console.log('preview questions', this.props)
    return(
      <div>from preview Questions</div>
    )
  }
}