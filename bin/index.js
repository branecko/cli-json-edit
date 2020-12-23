#!/usr/bin/env node

const VERSION = '0.0.5';

const { program } = require('commander');
const editJsonFile = require('edit-json-file');

const isJsonString = (str) => {
    try {
        const res = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const set = (env) => {
    const filename = env.filename || undefined;
    const key = env.key || undefined;
    const value = env.value || undefined;
    if (filename && key && value) {
        const file = editJsonFile(filename);
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
        const file = editJsonFile(filename);
        // array
        const parsedValue = values
            .split(',')
            .map(item => item.trim());
        file.set(key, parsedValue);
        file.save();
        console.log(`Array ${values} added for key ${key} in ${filename}.`)
    }
}

const unset = (env) => {
    const filename = env.filename || undefined;
    const key = env.key || undefined;
    if (filename && key) {
        const file = editJsonFile(filename);
        file.unset(key);
        file.save();

        console.log(`Key ${key} removed from ${filename}.`)
    }
}

program.version(VERSION);

program
  .command('set')
  .description('set new value to json file')
  .requiredOption("-f, --filename [string]", "filename")
  .requiredOption("-k, --key [string]", "key in object")
  .requiredOption("-v, --value [string]", "new value")
  .action(set);

program
  .command('set-array')
  .description('set array as new value to json file')
  .requiredOption("-f, --filename [string]", "filename")
  .requiredOption("-k, --key [string]", "key in object")
  .requiredOption("-v, --values [string]", "comma separated list")
  .action(setArray);

program
  .command('unset')
  .description('unset prop in json file')
  .requiredOption("-f, --filename [string]", "filename")
  .requiredOption("-k, --key [string]", "key in object")
  .action(unset);

program.parse(process.argv);
