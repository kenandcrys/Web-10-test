import React from 'react'
import { useSelector } from 'react-redux'

export default function Message(props) {
  const message = useSelector(state => state.infoMessage)

  return <div id="message">{message}</div>
}
