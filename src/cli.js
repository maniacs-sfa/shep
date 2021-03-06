import loudRejection from 'loud-rejection'
import yargs from 'yargs'

export default function cli () {
  loudRejection()

  yargs
    .wrap(120)
    .usage('Usage: $0 <command> [options]')
    .demand(1)
    .commandDir('./commands')
    .version()
    .help()
    .strict()
    .argv
}
