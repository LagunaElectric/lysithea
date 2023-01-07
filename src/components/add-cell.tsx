import './add-cell.css'
import { useActions } from '../hooks/use-actions'

interface AddCellProps {
  nextCellId: string | null
  forceVisible?: boolean
  isBottom?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible, isBottom }) => {
  const { insertCell } = useActions()

  return (
    <div>
      <button onClick={ () => insertCell(nextCellId, "code", "up") }>Code</button>
      <button onClick={ () => insertCell(nextCellId, "text", "up") }>Text</button>
    </div>
  )
}

export default AddCell