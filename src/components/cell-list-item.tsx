import { Cell } from "../state"
import ActionBar from "./action-bar"
import CodeCell from "./code-cell"
import TextEditor from "./text-editor"

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element = cell.type === 'code' ? <CodeCell cell={ cell } /> : <TextEditor cell={ cell } />

  return (
    <div>
      <ActionBar id={ cell.id } />
      { child }
    </div>
  )
}

export default CellListItem