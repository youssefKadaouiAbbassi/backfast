const base = require('./base');

module.exports = {
    '{src,apps,libs,test}/**/*.ts': ["eslint --fix"],
    './**/*.{ts,js,json,*rc}': ["prettier --write"],
    ...base
}