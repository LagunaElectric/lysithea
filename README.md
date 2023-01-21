# Lysithea

A command line tool for serving a javascript file similar to Jupyter Notebooks.

## Usage

```powershell
npx lysithea serve [fileName] [options]
```

### Options

`-p`, `--port` : Specify a port number for the server to run on.

### Example

```powershell
npx lysithea serve notebook.js -p 3000
```

This will start a server that serves the `notebook.js` file on port 3000.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
