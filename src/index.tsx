import ReactDOM from 'react-dom'
import { useState } from 'react'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = () => {
    setCode(input)
  }

  return <div>
    <textarea value={ input } onChange={ e => setInput(e.currentTarget.value) }></textarea>
    <div>
      <button onClick={ onClick }>submit</button>
    </div>
    <pre>{ code }</pre>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))