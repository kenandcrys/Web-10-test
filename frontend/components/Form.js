import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

const onChange = evt => {
  props.inputChange(evt.target.id, evt.target.value)
}


const onSubmit = (evt) => {
  evt.preventDefault()
  props.setQuiz(props.form)
}

const setDisabled = () => {
  if (props.form.newQuestion.trim().length > 1 && props.form.newTrueAnswer.trim().length > 1 && props.form.newFalseAnswer.trim().length > 1) {
    return false; 
  } else {
    return true;
  }

}

return (
  <form id="form" onSubmit={onSubmit}>
    <h2>Create New Quiz</h2>
    <input value={props.form.newQuestion} minLength={2} maxLength={50} onChange={(evt) => onChange(evt)} id="newQuestion" placeholder="Enter question" />
    <input value={props.form.newTrueAnswer} minLength={2} maxLength={50} onChange={(evt) => onChange(evt)} id="newTrueAnswer" placeholder="Enter true answer" />
    <input value={props.form.newFalseAnswer} minLength={2} maxLength={50} onChange={(evt) => onChange(evt)} id="newFalseAnswer" placeholder="Enter false answer" />
    <button disabled={setDisabled()} onClick={(evt) => onSubmit(evt)} id="submitNewQuizBtn">Submit new quiz</button>
  </form>
)
}

export default connect(st => st, actionCreators)(Form)