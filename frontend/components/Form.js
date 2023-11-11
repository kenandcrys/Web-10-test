import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer, inputChange, postQuiz } = props

  const onChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)

  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz({ question: newQuestion, true_answer: newTrueAnswer, false_answer: newFalseAnswer })
  }

  return (
    <form id='form' onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50}
      onChange={onChange}
      id="newQuestion"
      value={newQuestion}
      placeholder="Enter question"
       />

      <input maxLength={50}
      onChange={onChange}
      id="newTrueAnswer"
      value={newTrueAnswer}
      placeholder="Enter true answer"
       />

      <input maxLength={50}
      onChange={onChange}
      id="newFalseAnswer"
      value={newFalseAnswer}
      placeholder="Enter false answer"
       />

      <button id="submitNewQuizBtn" >
        Submit new quiz
      </button>
    </form>
  )
}


export default connect(st => st, actionCreators)(Form)
