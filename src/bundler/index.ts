import * as esbuild from "esbuild-wasm"
import { fetchPlugin } from "./plugins/fetch-plugin"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"

let service: esbuild.Service

const Bundler = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    })
  }

  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window"
      }
    })

    return {
      code: result.outputFiles[0].text,
      error: ""
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        error: err.message
      }
    } else {
      throw err
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default Bundler
