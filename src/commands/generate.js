export const command = 'generate'
export const desc = 'Run `shep generate --help` for additional information'
export function builder (yargs) {
  return yargs
  .commandDir('./generate')
  .demand(1)
  .strict()
}

export function handler (args) {
  // inquirer.prompt([{
  //   type: 'list',
  //   name: 'generator',
  //   message: 'Select generator',
  //   choices: ['endpoint', 'function']
  // }])
}
