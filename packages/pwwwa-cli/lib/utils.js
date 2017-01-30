'use strict'

import fs from 'fs-extra'
import execa from 'execa'
import sysPath from 'path'
import hostedGitInfo from 'hosted-git-info'

const spawn = (cmd) => {
	const [binary, ...args] = cmd.split(/\s+/)
	return execa(binary, args)
}

export const install = async appPath => {
	const prevDir = process.cwd()
	process.chdir(appPath)

	try {
		let cmd = spawn('npm install --loglevel warn --no-summary --no-progress')
		await cmd
	} finally {
		process.chdir(prevDir)
	}
}

export const clone = async (hostInfo, appPath) => {
	const url = hostInfo.git({ noCommittish: true })

	await spawn(`git clone ${url} ${appPath} --single-branch --q`)
	await fs.remove(sysPath.join(appPath, '.git'))
	await install(appPath)
}

