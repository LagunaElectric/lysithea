export type CellTypes = "text" | "code"

export interface Cell {
  id: string
  type: CellTypes
  content: string
}
export type Direction = "up" | "down"

export interface CellsState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}
