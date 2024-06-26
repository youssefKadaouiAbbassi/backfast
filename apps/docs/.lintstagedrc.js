const path = require('path')
const base = require('@repo/lint-staged-config/base.js')

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    ...base
}