import express from "express"
import fs from "fs/promises"
import path from "path"

interface Cell {
  id: string
  content: string
  type: "text" | "code"
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()

  router.get("/cells", async (req, res) => {
    res.send("List of Cells")
  })

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body

    await fs.writeFile(path.join(dir, filename), JSON.stringify(cells), "utf-8")

    res.send({ status: "ok" })
  })

  return router
}
