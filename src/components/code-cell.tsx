import Bundler from '../bundler'
import Preview from './preview'
import CodeEditor from './code-editor'
import { useState, useEffect } from 'react'
import Resizable from './resizable'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const { updateCell } = useActions()

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await Bundler(cell.content)
      setCode(output.code)
      setErr(output.error)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return <div>
    <Resizable direction='vertical'>
      <div style={ {
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
      } }>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={ cell.content }
            onChange={ value => updateCell(cell.id, value) }
          />
        </Resizable>
        <Preview code={ code } error={ err } />
      </div>
    </Resizable>
  </div>
}

export default CodeCell