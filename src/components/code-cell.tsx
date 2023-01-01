import Bundler from '../bundler'
import Preview from './preview'
import CodeEditor from './code-editor'
import { useState } from 'react'
import Resizable from './resizable'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async () => {
    const output = await Bundler(input)
    setCode(output)
  }


  return <div>
    <Resizable direction='vertical'>
      <CodeEditor
        initialValue='// code'
        onChange={ value => setInput(value) }
      />
      <div>
        <button onClick={ onClick }>submit</button>
      </div>
      <Preview code={ code } />
    </Resizable>
  </div>
}

export default CodeCell