import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = hideBin(process.argv);

export default yargs(argv)
  .option('properties', {
    alias: 'p',
    type: 'array',
    describe: 'Name of the properties',
  })
  .option('value', {
    alias: 'v',
    type: 'string',
    describe: 'Value of the property',
  })
  // actions
  .option('add', {
    alias: 'a',
    type: 'boolean',
    describe: 'type of locale action',
  })
  .option('remove', {
    alias: 'r',
    type: 'boolean',
    describe: 'type of locale action',
  })
  .option('update', {
    alias: 'u',
    type: 'boolean',
    describe: 'type of locale action',
  })
  .option('move', {
    alias: 'm',
    type: 'array',
    describe: 'Name of the properties',
  })
  .parseSync();
