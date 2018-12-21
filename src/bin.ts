require('yargs') // eslint-disable-line
  .command('serve [port]', 'start the server', (yargs: any) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv: any) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv