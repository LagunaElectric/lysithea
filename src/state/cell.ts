export type CellTypes = "text" | "code"

export default interface Cell {
  id: string
  type: CellTypes
  content: string
}
