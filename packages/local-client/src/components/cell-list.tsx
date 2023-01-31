import CellListItem from "./cell-list-item"
import AddCell from "./add-cell"
import { Fragment, useEffect } from "react"
import './cell-list.css'
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { fetchCells } from "../redux/slices/cellsSlice/cellsSlice"

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cells: { order, data } }) => order.map((id) => data[id]))
  // const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]))
  // const dispatch = useAppDispatch()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCells())
  }, [])

  const renderedCells = cells.map((cell) => (
    <Fragment key={ cell.id }>
      <CellListItem cell={ cell } />
      <AddCell prevCellId={ cell.id } />
    </Fragment>
  ))

  return <div className="cell-list">
    <AddCell prevCellId={ null } />
    { renderedCells }
  </div>
}

export default CellList