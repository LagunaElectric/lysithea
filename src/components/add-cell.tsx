import './add-cell.css'
import { useActions } from '../hooks/use-actions'

interface AddCellProps {
  nextCellId: string | null
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCell } = useActions()

  return (
    <div className='add-cell' >
      <div className="add-buttons">
        <button className="button is-rounded is-primary is-small" onClick={ () => insertCell(nextCellId, "code", "up") }>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={ () => insertCell(nextCellId, "text", "up") }>
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