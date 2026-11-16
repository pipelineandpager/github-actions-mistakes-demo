// Tiny demo app — it just prints a line. The point of this repo is the workflow file.
const _ = require('lodash');

const message = _.capitalize('hello from the demo app.');
console.log(message);
console.log('Nothing to see here — the mistakes are in .github/workflows/demo.yml.');
