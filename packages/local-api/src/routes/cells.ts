import express from "express"

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()

  router.get("/cells", (req, res) => {
    res.send("List of Cells")
  })

  router.post("/cells", (req, res) => {
    const {
      body: { content, type }
    } = req

    res.send(`Posting to Cells: ${content} ${type}`)
  })

  return router
}
