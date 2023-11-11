import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  // const { newQuestion, newTrueAnswer, newFalseAnswer, inputChange, postQuiz } = props
  const [newQuestion, setNewQuestion] = useState('');
  const [trueAnswer, setTrueAnswer] = useState('');
  const [falseAnswer, setFalseAnswer] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (newQuestion && trueAnswer && falseAnswer && newQuestion.trim().length >= 1 && trueAnswer.trim().length >= 1 && falseAnswer.trim().length >= 1) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [newQuestion, trueAnswer, falseAnswer, disabled])


  const onSubmit = evt => {
    evt.preventDefault()
    actionCreators.postQuiz({ question_text: newQuestion, true_answer_text: trueAnswer, false_answer_text: falseAnswer })
  }

  return (
    <form id='form' onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50}
      onChange={(e) => setNewQuestion(e.target.value)}
      id="newQuestion"
      value={newQuestion}
      placeholder="Enter question"
       />

      <input maxLength={50}
      onChange={(e) => setTrueAnswer(e.target.value)}
      id="newTrueAnswer"
      value={trueAnswer}
      placeholder="Enter true answer"
       />

      <input maxLength={50}
      onChange={(e) => setFalseAnswer(e.target.value)}
      id="newFalseAnswer"
      value={falseAnswer}
      placeholder="Enter false answer"
       />

      <button id="submitNewQuizBtn" disabled={disabled}>
        Submit new quiz
      </button>
    </form>
  )
}


export default connect(st => st, actionCreators)(Form)
