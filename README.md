This CLI let you manipulate json files.

Usage: json-edit-cli [options] [command]

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  set [options]        set string or number value to specific key in json file
  set-array [options]  set array value to specific key in json file
  unset [options]      unset value of specific key in json file
  help [command]       display help for command

Examples:
    json-edit-cli set -f './file.json' -k 'name' -v 'Joe Doe'
    json-edit-cli set -f './file.json' -k 'personal.firstName' -v 'Doe'
    json-edit-cli set -f './file.json' -k 'age' -v 30
    json-edit-cli set-array -f './file.json' -k 'interests' -v 'bicycle,football'
    json-edit-cli unset -f 'file.json' -k 'interests'