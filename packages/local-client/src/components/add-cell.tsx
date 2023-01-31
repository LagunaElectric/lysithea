import './add-cell.css'
import { useAppDispatch } from '../redux/hooks';
import { insertCell } from '../redux/slices/cellsSlice/cellsSlice';

interface AddCellProps {
  prevCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='add-cell' >
      <div className="add-buttons">
        <button className="button is-rounded is-primary is-small" onClick={ () => dispatch(insertCell({ id: prevCellId, type: "code", direction: "down" })) }>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={ () => dispatch(insertCell({ id: prevCellId, type: "text", direction: "down" })) }>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider" />
    </div>
  )
}

export default AddCell