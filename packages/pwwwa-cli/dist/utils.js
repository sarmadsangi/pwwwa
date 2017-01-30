'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.clone = exports.install = undefined;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hostedGitInfo = require('hosted-git-info');

var _hostedGitInfo2 = _interopRequireDefault(_hostedGitInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var spawn = function spawn(cmd) {
	var _cmd$split = cmd.split(/\s+/),
	    _cmd$split2 = _toArray(_cmd$split),
	    binary = _cmd$split2[0],
	    args = _cmd$split2.slice(1);

	return (0, _execa2.default)(binary, args);
};

var install = exports.install = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(appPath) {
		var prevDir, cmd;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						prevDir = process.cwd();

						process.chdir(appPath);

						_context.prev = 2;
						cmd = spawn('npm install --loglevel warn --no-summary --no-progress');
						_context.next = 6;
						return cmd;

					case 6:
						_context.prev = 6;

						process.chdir(prevDir);
						return _context.finish(6);

					case 9:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[2,, 6, 9]]);
	}));

	return function install(_x) {
		return _ref.apply(this, arguments);
	};
}();

var clone = exports.clone = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(hostInfo, appPath) {
		var url;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						url = hostInfo.git({ noCommittish: true });
						_context2.next = 3;
						return spawn('git clone ' + url + ' ' + appPath + ' --single-branch --q');

					case 3:
						_context2.next = 5;
						return _fsExtra2.default.remove(_path2.default.join(appPath, '.git'));

					case 5:
						_context2.next = 7;
						return install(appPath);

					case 7:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function clone(_x2, _x3) {
		return _ref2.apply(this, arguments);
	};
}();