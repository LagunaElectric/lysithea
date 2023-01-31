export interface BundlesState {
  [key: string]:
    | {
        loading: boolean
        code: string
        error: string
      }
    | undefined
}
