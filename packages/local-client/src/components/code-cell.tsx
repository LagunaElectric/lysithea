import Preview from './preview'
import CodeEditor from './code-editor'
import { useEffect } from 'react'
import Resizable from './resizable'
import { Cell } from '../redux/slices/cellsSlice/cells'
import { useCumulativeCode } from '../hooks/use-cumulative-code'
import './code-cell.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bundleStart } from '../redux/slices/bundlesSlice/bundlesSlice'
import { updateCell } from '../redux/slices/cellsSlice/cellsSlice'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  //const { updateCell, createBundle } = useActions()
  const dispatch = useAppDispatch();
  const bundle = useAppSelector(state => state.bundles[cell.id])
  //const bundle = useTypedSelector(state => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    if (!bundle) {
      dispatch(bundleStart({ cellId: cell.id, input: cumulativeCode }))
      return
    }

    const timer = setTimeout(async () => {
      dispatch(bundleStart({ cellId: cell.id, input: cumulativeCode }))
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, bundleStart])

  return <div>
    <Resizable direction='vertical'>
      <div style={ {
        height: 'calc(100% - 10px)',
        display: 'flex',
        flexDirection: 'row'
      } }>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={ cell.content }
            onChange={ value => dispatch(updateCell({ id: cell.id, content: value })) }
          />
        </Resizable>
        <div className="progress-wrapper">
          { !bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">Loading</progress>
            </div>
          ) : (
            <Preview code={ bundle.code } error={ bundle.error } />
          ) }
        </div>
      </div>
    </Resizable>
  </div>
}

export default CodeCell