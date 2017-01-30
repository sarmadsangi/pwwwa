#!/usr/bin/env node

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('babel-polyfill');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hostedGitInfo = require('hosted-git-info');

var _hostedGitInfo2 = _interopRequireDefault(_hostedGitInfo);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var repoPath = 'sarmadsangi/pwwwa-starter';
var hostedInfo = _hostedGitInfo2.default.fromUrl(repoPath);
var spinner = (0, _ora2.default)();

var cli = (0, _meow2.default)('\n\tUsage\n\t  $ pwwwa <action> <dir> <options>\n\n\tOptions\n\t  --ssr, -s \n\n\tExamples\n\t  $ pwwwa new my-app\n', {
	flags: {
		ssr: {
			type: 'boolean',
			alias: 's',
			default: true
		}
	}
});

var _cli$input = _slicedToArray(cli.input, 2),
    action = _cli$input[0],
    dir = _cli$input[1];

var bootstrap = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var appPath, appDirBold;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						appPath = process.cwd() + '/' + dir;
						appDirBold = _chalk2.default.blue.underline.bold('/' + dir);


						spinner.start('Cloning starter app at ' + appDirBold);
						_context.next = 5;
						return (0, _utils.clone)(hostedInfo, appPath);

					case 5:
						spinner.succeed('Cloned starter app at ' + appDirBold);

						spinner.start('Installing dependencies at ' + appDirBold);
						_context.next = 9;
						return (0, _utils.install)(appPath);

					case 9:
						spinner.succeed('Installed dependencies at ' + appDirBold);

						console.info('\n\uD83D\uDE80  Your pwwwa app is successfully created at ' + appDirBold + '\n\uD83D\uDE80  Run your app now by executing this:\n\n   ' + _chalk2.default.magenta.bold('cd ' + dir + ';') + '\n   ' + _chalk2.default.magenta.bold('npm run dev;') + '\n');

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function bootstrap() {
		return _ref.apply(this, arguments);
	};
}();

switch (action) {
	case 'new':
		bootstrap();
		break;
	default:
		console.log('Wrong action ' + action);
		break;
}