const tsconfig = require('./tsconfig')
const baseConfig = require('@strider/utils-ts/jest.config.base')
const pkg = require('./package')

module.exports = {
	...baseConfig(tsconfig, pkg)
}
