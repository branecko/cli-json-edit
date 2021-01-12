#!/usr/bin/env node

const VERSION = '0.0.14';

const { program } = require('commander');
const editJsonFile = require('edit-json-file');

const set = (env) => {
    const filename = env.filename || undefined;
    const key = env.key || undefined;
    const value = env.value || undefined;
    if (filename && key && value) {
        const file = editJsonFile(`${__dirname}/${filename}`);
        // string
        let parsedValue = value;
        if (!isNaN(value)) {
            // number
            parsedValue = parseInt(value);
        }
        file.set(key, parsedValue);
        file.save();

        console.log(`Value ${value} added for key ${key} in ${filename}.`)
    }
}

const setArray = (env) => {
    const filename = env.filename || undefined;
    const key = env.key || undefined;
    const values = env.values || undefined;
    if (filename && key && values) {
        const file = editJsonFile(filename, { ignore_dots: true });
        // array
        const parsedValue = values
            .split(',')
            .map(item => item.trim());
        console.log('parsedValue', parsedValue);
        file.set(key, parsedValue);
        file.save();
        console.log(`Array ${values} added for key ${key} in ${filename}.`)
    }
}

const unset = (env) => {
    const filename = env.filename || undefined;
    const key = env.key || undefined;
    if (filename && key) {
        const file = editJsonFile(`${__dirname}/${filename}`);
        file.unset(key);
        file.save();

        console.log(`Key ${key} removed from ${__dirname}/${filename}.`)
    }
}

program.version(VERSION);

program
  .command('set')
  .description('set string or number value to specific key in json file')
  .requiredOption("-f, --filename [string]", "path to json file")
  .requiredOption("-k, --key [string]", "key to set")
  .requiredOption("-v, --value [string]", "new value to set")
  .action(set);

program
  .command('set-array')
  .description('set array value to specific key in json file')
  .requiredOption("-f, --filename [string]", "path to json file")
  .requiredOption("-k, --key [string]", "key to set")
  .requiredOption("-v, --values [string]", "new value as comma separated list")
  .action(setArray);

program
  .command('unset')
  .description('unset value of specific key in json file')
  .requiredOption("-f, --filename [string]", "path to json file")
  .requiredOption("-k, --key [string]", "key in object")
  .action(unset);

program.parse(process.argv);
