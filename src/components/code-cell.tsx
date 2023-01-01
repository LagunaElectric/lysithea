import Bundler from '../bundler'
import Preview from './preview'
import CodeEditor from './code-editor'
import { useState } from 'react'

const CodeCell = () => {
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

export default CodeCell