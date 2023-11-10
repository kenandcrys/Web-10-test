import React, { useEffect } from 'react'
import { connect } from 'react-redux'
//import rootReducer from '../state/reducer'
import { postAnswer, fetchQuiz } from '../state/action-creators'

function Quiz(props) {
  const { quiz, selectedAnswer, postAnswer, fetchQuiz } = props

  useEffect(() => {
    // console.log('Quiz', quiz)
    // console.log('Selected Answer', selectedAnswer)

    if(!quiz){
      fetchQuiz();
    }
  }, [ quiz, fetchQuiz ])

  return (
    <div id="wrapper">
      { quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer) => (
                <div key={answer.id} className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}>
                  {answer.text}
                  <button onClick={() => postAnswer(answer.id)}>
                    {selectedAnswer === answer.id ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            <button id="submitAnswerBtn" disabled={props.infoMessage !== 'Submit answer'} onClick={() => postAnswer(selectedAnswer)}>
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    infoMessage: state.infoMessage
}
}

export default connect(mapStateToProps, { postAnswer, fetchQuiz })(Quiz)
