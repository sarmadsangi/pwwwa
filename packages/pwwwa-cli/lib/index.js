#!/usr/bin/env node
'use strict'

import 'babel-polyfill'

import fs from 'fs-extra'
import ora from 'ora'
import chalk from 'chalk'
import meow from 'meow'
import execa from 'execa'
import sysPath from 'path'
import hostedGitInfo from 'hosted-git-info'

import { clone, install } from './utils'

const repoPath = 'sarmadsangi/pwwwa-starter'
const hostedInfo = hostedGitInfo.fromUrl(repoPath)
const spinner = ora()

const cli = meow(`
	Usage
	  $ pwwwa <action> <dir> <options>

	Options
	  --ssr, -s 

	Examples
	  $ pwwwa new my-app
`, {
	flags: {
		ssr: {
			type: 'boolean',
			alias: 's',
			default: true
		}
	}
})

const [ action, dir ] = cli.input

const bootstrap = async () => {
	const appPath = `${process.cwd()}/${dir}`
	const appDirBold = chalk.blue.underline.bold(`/${dir}`)

	spinner.start(`Cloning starter app at ${appDirBold}`)
	await clone(hostedInfo, appPath)
	spinner.succeed(`Cloned starter app at ${appDirBold}`)

	spinner.start(`Installing dependencies at ${appDirBold}`)
	await install(appPath)
	spinner.succeed(`Installed dependencies at ${appDirBold}`)


console.info(`
🚀  Your pwwwa app is successfully created at ${appDirBold}
🚀  Run your app now by executing this:

   ${chalk.magenta.bold(`cd ${dir};`)}
   ${chalk.magenta.bold(`npm run dev;`)}
`)

}

switch (action) {
	case 'new':
		bootstrap()
		break
	default:
		console.log(`Wrong action ${action}`)
		break
	}

