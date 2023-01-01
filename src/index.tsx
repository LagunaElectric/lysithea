import Bundler from './bundler'
import Preview from './components/preview'
import { createRoot } from 'react-dom/client'
import CodeEditor from './components/code-editor'
import { useState } from 'react'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async () => {
    const output = await Bundler(input)
    setCode(output)
  }


  return <div>
    <CodeEditor
      initialValue='// code'
      onChange={ value => setInput(value) }
    />
    <div>
      <button onClick={ onClick }>submit</button>
    </div>
    <Preview code={ code } />
  </div>
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)