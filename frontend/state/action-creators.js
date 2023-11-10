// ❗ You don't need to add extra action creators to achieve MVP
import { MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM } from "./action-types"
  import axios from "axios"

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE  }
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer}
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange(name, value) {
  return { type: INPUT_CHANGE, payload: { name, value }}
}

export function resetForm() {
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));

    axios.get('http://localhost:9000/api/quiz/next')
    .then(response => {

      dispatch(setQuiz(response.data))
    })
    .catch(err => {
      console.error('Error fetching quiz:', err)
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answerId) {
  return function (dispatch, getState) {

    const state = getState();

    if(state.selectedAnswer){
      dispatch(selectAnswer(null))

      dispatch(setMessage('Submitting answer...'))

      axios.post('http://localhost:9000/api/quiz/answer', {
        quiz_id: state.quiz.id,
        answer_id: answerId,
      })
      .then(() => {

        dispatch(setMessage(''))
        dispatch(fetchQuiz())
      })
      .catch(err => {
        console.error('Error submitting answer:', err)
      })

    }


    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {

    const state = getState();

    if(state.form.newQuestion.trim() && state.form.newTrueAnswer.trim() && state.form.newFalseAnswer.trim()){
      axios.post('http://localhost:9000/api/quiz/new', {
        question_text: state.form.newQuestion,
        true_answer_text: state.form.newTrueAnswer,
        false_answer_text: state.form.newFalseAnswer,
      })
      .then(() => {
        dispatch(setMessage("Quiz successfully added!"))
        dispatch(resetForm())
      })
      .catch(err => {
        console.error('Error submitting new quiz', err)
      })
    }
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
