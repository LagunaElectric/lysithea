import './add-cell.css'
import { useActions } from '../hooks/use-actions'

interface AddCellProps {
  prevCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId }) => {
  const { insertCell } = useActions()

  return (
    <div className='add-cell' >
      <div className="add-buttons">
        <button className="button is-rounded is-primary is-small" onClick={ () => insertCell(prevCellId, "code", "down") }>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={ () => insertCell(prevCellId, "text", "down") }>
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