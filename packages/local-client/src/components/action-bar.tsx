import { useAppDispatch } from "../redux/hooks";
import { deleteCell, moveCell } from "../redux/slices/cellsSlice/cellsSlice";
import './action-bar.css'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  // const { moveCell, deleteCell } = useActions()
  const dispatch = useAppDispatch();

  // TODO: refactor buttons to their own component
  return (
    <div className="action-bar">
      <button className="button is-primary is-small" onClick={ () => dispatch(moveCell({ id, direction: 'up' })) }>
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button className="button is-primary is-small" onClick={ () => dispatch(moveCell({ id, direction: 'down' })) } >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button className="button is-primary is-small" onClick={ () => dispatch(deleteCell(id)) } >
        <span className="icon">
          <i className="fas fa-trash" />
        </span>
      </button>
    </div>
  )
}

export default ActionBar