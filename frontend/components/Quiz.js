import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { postAnswer, fetchQuiz, selectAnswer } from '../state/action-creators'

function Quiz(props) {
  const { quiz, selectedAnswer, postAnswer, fetchQuiz, selectAnswer } = props

  useEffect(() => {
    // console.log('Quiz', quiz)
    // console.log('Selected Answer', selectedAnswer)

    if(!quiz){
      fetchQuiz();
    }
  }, [ quiz, fetchQuiz ])

  const isAnswerSelected = answer_id => {
    selectedAnswer === answer_id;
  }

  return (
    <div id="wrapper">
      { quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">

                <div className={`answer${isAnswerSelected(quiz.answers[0].answer_id) ? ' selected' : ''}`}
                onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                {quiz.answers[0].text}
                <button>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer${selectedAnswer === quiz.answers[1].answer_id ? ' selected' : ''}`}
                onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                {quiz.answers[1].text}
                <button>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>


            </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer || selectedAnswer.length === 0} onClick={() => postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })}>
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

export default connect(mapStateToProps, { postAnswer, fetchQuiz, selectAnswer })(Quiz)
