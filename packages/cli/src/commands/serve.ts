import { Command } from "commander"

export const serveCommand = new Command()
  .command("serve")
  .description("open a file for editing")
  .action(() => {
    console.log("preparing to serve...")
  })
