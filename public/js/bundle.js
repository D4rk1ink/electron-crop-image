var EntryPoint =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Escape the given shell `arg`.
 *
 * @param {String} arg
 * @return {String}
 * @api public
 */

exports.escape = function escape(arg) {
  return '"' + String(arg).trim().replace(/"/g, '\\"') + '"';
};

exports.unescape = function escape(arg) {
  return String(arg).trim().replace(/"/g, "");
};

exports.argsToArray = function (args) {
  var arr = [];

  for (var i = 0; i <= arguments.length; i++) {
    if ('undefined' != typeof arguments[i]) arr.push(arguments[i]);
  }

  return arr;
};

exports.isUtil = function (v) {
  var ty = 'object';
  switch (Object.prototype.toString.call(v)) {
    case '[object String]':
      ty = 'String';
      break;
    case '[object Array]':
      ty = 'Array';
      break;
    case '[object Boolean]':
      ty = 'Boolean';
      break;
  }
  return ty;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// compare

var spawn = __webpack_require__(6);

/**
 * Compare two images uses graphicsmagicks `compare` command.
 *
 * gm.compare(img1, img2, 0.4, function (err, equal, equality) {
 *   if (err) return handle(err);
 *   console.log('The images are equal: %s', equal);
 *   console.log('There equality was %d', equality);
 * });
 *
 * @param {String} orig Path to an image.
 * @param {String} compareTo Path to another image to compare to `orig`.
 * @param {Number|Object} [options] Options object or the amount of difference to tolerate before failing - defaults to 0.4
 * @param {Function} cb(err, Boolean, equality, rawOutput)
 */

module.exports = exports = function exports(proto) {
  function compare(orig, compareTo, options, cb) {

    var isImageMagick = this._options && this._options.imageMagick;
    var appPath = this._options && this._options.appPath || '';
    var bin = isImageMagick ? appPath + 'compare' : appPath + 'gm';
    var args = ['-metric', 'mse', orig, compareTo];
    if (!isImageMagick) {
      args.unshift('compare');
    }
    var tolerance = 0.4;
    // outputting the diff image
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {

      if (options.highlightColor && options.highlightColor.indexOf('"') < 0) {
        options.highlightColor = '"' + options.highlightColor + '"';
      }

      if (options.file) {
        if (typeof options.file !== 'string') {
          throw new TypeError('The path for the diff output is invalid');
        }
        // graphicsmagick defaults to red
        if (options.highlightColor) {
          args.push('-highlight-color');
          args.push(options.highlightColor);
        }
        if (options.highlightStyle) {
          args.push('-highlight-style');
          args.push(options.highlightStyle);
        }
        // For IM, filename is the last argument. For GM it's `-file <filename>`
        if (!isImageMagick) {
          args.push('-file');
        }
        args.push(options.file);
      }

      if (typeof options.tolerance != 'undefined') {
        if (typeof options.tolerance !== 'number') {
          throw new TypeError('The tolerance value should be a number');
        }
        tolerance = options.tolerance;
      }
    } else {
      // For ImageMagick diff file is required but we don't care about it, so null it out
      if (isImageMagick) {
        args.push('null:');
      }

      if (typeof options == 'function') {
        cb = options; // tolerance value not provided, flip the cb place
      } else {
        tolerance = options;
      }
    }

    var proc = spawn(bin, args);
    var stdout = '';
    var stderr = '';
    proc.stdout.on('data', function (data) {
      stdout += data;
    });
    proc.stderr.on('data', function (data) {
      stderr += data;
    });
    proc.on('close', function (code) {
      // ImageMagick returns err code 2 if err, 0 if similar, 1 if dissimilar
      if (isImageMagick) {
        if (code === 0) {
          return cb(null, 0 <= tolerance, 0, stdout);
        } else if (code === 1) {
          err = null;
          stdout = stderr;
        } else {
          return cb(stderr);
        }
      } else {
        if (code !== 0) {
          return cb(stderr);
        }
      }
      // Since ImageMagick similar gives err code 0 and no stdout, there's really no matching
      // Otherwise, output format for IM is `12.00 (0.123)` and for GM it's `Total: 0.123`
      var regex = isImageMagick ? /\((\d+\.?[\d\-\+e]*)\)/m : /Total: (\d+\.?\d*)/m;
      var match = regex.exec(stdout);
      if (!match) {
        err = new Error('Unable to parse output.\nGot ' + stdout);
        return cb(err);
      }

      var equality = parseFloat(match[1]);
      cb(null, equality <= tolerance, equality, stdout, orig, compareTo);
    });
  }

  if (proto) {
    proto.compare = compare;
  }
  return compare;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cp = __webpack_require__(3);
var parse = __webpack_require__(29);
var enoent = __webpack_require__(27);

var cpSpawnSync = cp.spawnSync;

function spawn(command, args, options) {
    var parsed;
    var spawned;

    // Parse the arguments
    parsed = parse(command, args, options);

    // Spawn the child process
    spawned = cp.spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    var parsed;
    var result;

    if (!cpSpawnSync) {
        try {
            cpSpawnSync = __webpack_require__(41); // eslint-disable-line global-require
        } catch (ex) {
            throw new Error('In order to use spawnSync on node 0.10 or older, you must ' + 'install spawn-sync:\n\n' + '  npm install spawn-sync --save');
        }
    }

    // Parse the arguments
    parsed = parse(command, args, options);

    // Spawn the child process
    result = cpSpawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;

module.exports._parse = parse;
module.exports._enoent = enoent;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(2);
var which = __webpack_require__(37);
var LRU = __webpack_require__(8);

var commandCache = new LRU({ max: 50, maxAge: 30 * 1000 }); // Cache just for 30sec

function resolveCommand(command, noExtension) {
    var resolved;

    noExtension = !!noExtension;
    resolved = commandCache.get(command + '!' + noExtension);

    // Check if its resolved in the cache
    if (commandCache.has(command)) {
        return commandCache.get(command);
    }

    try {
        resolved = !noExtension ? which.sync(command) : which.sync(command, { pathExt: path.delimiter + (process.env.PATHEXT || '') });
    } catch (e) {/* empty */}

    commandCache.set(command + '!' + noExtension, resolved);

    return resolved;
}

module.exports = resolveCommand;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = LRUCache;

// This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.
var Map = __webpack_require__(30);
var util = __webpack_require__(4);

// A linked list to keep track of recently-used-ness
var Yallist = __webpack_require__(32);

// use symbols if possible, otherwise just _props
var symbols = {};
var hasSymbol = typeof Symbol === 'function';
var makeSymbol;
/* istanbul ignore if */
if (hasSymbol) {
  makeSymbol = function makeSymbol(key) {
    return Symbol.for(key);
  };
} else {
  makeSymbol = function makeSymbol(key) {
    return '_' + key;
  };
}

function priv(obj, key, val) {
  var sym;
  if (symbols[key]) {
    sym = symbols[key];
  } else {
    sym = makeSymbol(key);
    symbols[key] = sym;
  }
  if (arguments.length === 2) {
    return obj[sym];
  } else {
    obj[sym] = val;
    return val;
  }
}

function naiveLength() {
  return 1;
}

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
function LRUCache(options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options);
  }

  if (typeof options === 'number') {
    options = { max: options };
  }

  if (!options) {
    options = {};
  }

  var max = priv(this, 'max', options.max);
  // Kind of weird to have a default max of Infinity, but oh well.
  if (!max || !(typeof max === 'number') || max <= 0) {
    priv(this, 'max', Infinity);
  }

  var lc = options.length || naiveLength;
  if (typeof lc !== 'function') {
    lc = naiveLength;
  }
  priv(this, 'lengthCalculator', lc);

  priv(this, 'allowStale', options.stale || false);
  priv(this, 'maxAge', options.maxAge || 0);
  priv(this, 'dispose', options.dispose);
  this.reset();
}

// resize the cache when the max changes.
Object.defineProperty(LRUCache.prototype, 'max', {
  set: function set(mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity;
    }
    priv(this, 'max', mL);
    trim(this);
  },
  get: function get() {
    return priv(this, 'max');
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function set(allowStale) {
    priv(this, 'allowStale', !!allowStale);
  },
  get: function get() {
    return priv(this, 'allowStale');
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function set(mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0;
    }
    priv(this, 'maxAge', mA);
    trim(this);
  },
  get: function get() {
    return priv(this, 'maxAge');
  },
  enumerable: true
});

// resize the cache when the lengthCalculator changes.
Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function set(lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength;
    }
    if (lC !== priv(this, 'lengthCalculator')) {
      priv(this, 'lengthCalculator', lC);
      priv(this, 'length', 0);
      priv(this, 'lruList').forEach(function (hit) {
        hit.length = priv(this, 'lengthCalculator').call(this, hit.value, hit.key);
        priv(this, 'length', priv(this, 'length') + hit.length);
      }, this);
    }
    trim(this);
  },
  get: function get() {
    return priv(this, 'lengthCalculator');
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'length', {
  get: function get() {
    return priv(this, 'length');
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function get() {
    return priv(this, 'lruList').length;
  },
  enumerable: true
});

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = priv(this, 'lruList').tail; walker !== null;) {
    var prev = walker.prev;
    forEachStep(this, fn, walker, thisp);
    walker = prev;
  }
};

function forEachStep(self, fn, node, thisp) {
  var hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!priv(self, 'allowStale')) {
      hit = undefined;
    }
  }
  if (hit) {
    fn.call(thisp, hit.value, hit.key, self);
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = priv(this, 'lruList').head; walker !== null;) {
    var next = walker.next;
    forEachStep(this, fn, walker, thisp);
    walker = next;
  }
};

LRUCache.prototype.keys = function () {
  return priv(this, 'lruList').toArray().map(function (k) {
    return k.key;
  }, this);
};

LRUCache.prototype.values = function () {
  return priv(this, 'lruList').toArray().map(function (k) {
    return k.value;
  }, this);
};

LRUCache.prototype.reset = function () {
  if (priv(this, 'dispose') && priv(this, 'lruList') && priv(this, 'lruList').length) {
    priv(this, 'lruList').forEach(function (hit) {
      priv(this, 'dispose').call(this, hit.key, hit.value);
    }, this);
  }

  priv(this, 'cache', new Map()); // hash of items by key
  priv(this, 'lruList', new Yallist()); // list of items in order of use recency
  priv(this, 'length', 0); // length of items in the list
};

LRUCache.prototype.dump = function () {
  return priv(this, 'lruList').map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      };
    }
  }, this).toArray().filter(function (h) {
    return h;
  });
};

LRUCache.prototype.dumpLru = function () {
  return priv(this, 'lruList');
};

LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {';
  var extras = false;

  var as = priv(this, 'allowStale');
  if (as) {
    str += '\n  allowStale: true';
    extras = true;
  }

  var max = priv(this, 'max');
  if (max && max !== Infinity) {
    if (extras) {
      str += ',';
    }
    str += '\n  max: ' + util.inspect(max, opts);
    extras = true;
  }

  var maxAge = priv(this, 'maxAge');
  if (maxAge) {
    if (extras) {
      str += ',';
    }
    str += '\n  maxAge: ' + util.inspect(maxAge, opts);
    extras = true;
  }

  var lc = priv(this, 'lengthCalculator');
  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ',';
    }
    str += '\n  length: ' + util.inspect(priv(this, 'length'), opts);
    extras = true;
  }

  var didFirst = false;
  priv(this, 'lruList').forEach(function (item) {
    if (didFirst) {
      str += ',\n  ';
    } else {
      if (extras) {
        str += ',\n';
      }
      didFirst = true;
      str += '\n  ';
    }
    var key = util.inspect(item.key).split('\n').join('\n  ');
    var val = { value: item.value };
    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge;
    }
    if (lc !== naiveLength) {
      val.length = item.length;
    }
    if (isStale(this, item)) {
      val.stale = true;
    }

    val = util.inspect(val, opts).split('\n').join('\n  ');
    str += key + ' => ' + val;
  });

  if (didFirst || extras) {
    str += '\n';
  }
  str += '}';

  return str;
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || priv(this, 'maxAge');

  var now = maxAge ? Date.now() : 0;
  var len = priv(this, 'lengthCalculator').call(this, value, key);

  if (priv(this, 'cache').has(key)) {
    if (len > priv(this, 'max')) {
      del(this, priv(this, 'cache').get(key));
      return false;
    }

    var node = priv(this, 'cache').get(key);
    var item = node.value;

    // dispose of the old one before overwriting
    if (priv(this, 'dispose')) {
      priv(this, 'dispose').call(this, key, item.value);
    }

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    priv(this, 'length', priv(this, 'length') + (len - item.length));
    item.length = len;
    this.get(key);
    trim(this);
    return true;
  }

  var hit = new Entry(key, value, len, now, maxAge);

  // oversized objects fall out of cache automatically.
  if (hit.length > priv(this, 'max')) {
    if (priv(this, 'dispose')) {
      priv(this, 'dispose').call(this, key, value);
    }
    return false;
  }

  priv(this, 'length', priv(this, 'length') + hit.length);
  priv(this, 'lruList').unshift(hit);
  priv(this, 'cache').set(key, priv(this, 'lruList').head);
  trim(this);
  return true;
};

LRUCache.prototype.has = function (key) {
  if (!priv(this, 'cache').has(key)) return false;
  var hit = priv(this, 'cache').get(key).value;
  if (isStale(this, hit)) {
    return false;
  }
  return true;
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true);
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false);
};

LRUCache.prototype.pop = function () {
  var node = priv(this, 'lruList').tail;
  if (!node) return null;
  del(this, node);
  return node.value;
};

LRUCache.prototype.del = function (key) {
  del(this, priv(this, 'cache').get(key));
};

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset();

  var now = Date.now();
  // A previous serialized cache has the most recent items first
  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l];
    var expiresAt = hit.e || 0;
    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v);
    } else {
      var maxAge = expiresAt - now;
      // dont add already expired items
      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge);
      }
    }
  }
};

LRUCache.prototype.prune = function () {
  var self = this;
  priv(this, 'cache').forEach(function (value, key) {
    get(self, key, false);
  });
};

function get(self, key, doUse) {
  var node = priv(self, 'cache').get(key);
  if (node) {
    var hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!priv(self, 'allowStale')) hit = undefined;
    } else {
      if (doUse) {
        priv(self, 'lruList').unshiftNode(node);
      }
    }
    if (hit) hit = hit.value;
  }
  return hit;
}

function isStale(self, hit) {
  if (!hit || !hit.maxAge && !priv(self, 'maxAge')) {
    return false;
  }
  var stale = false;
  var diff = Date.now() - hit.now;
  if (hit.maxAge) {
    stale = diff > hit.maxAge;
  } else {
    stale = priv(self, 'maxAge') && diff > priv(self, 'maxAge');
  }
  return stale;
}

function trim(self) {
  if (priv(self, 'length') > priv(self, 'max')) {
    for (var walker = priv(self, 'lruList').tail; priv(self, 'length') > priv(self, 'max') && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
}

function del(self, node) {
  if (node) {
    var hit = node.value;
    if (priv(self, 'dispose')) {
      priv(self, 'dispose').call(this, hit.key, hit.value);
    }
    priv(self, 'length', priv(self, 'length') - hit.length);
    priv(self, 'cache').delete(hit.key);
    priv(self, 'lruList').removeNode(node);
  }
}

// classy, since V8 prefers predictable objects.
function Entry(key, value, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var Stream = __webpack_require__(10).Stream;
var EventEmitter = __webpack_require__(48).EventEmitter;
var util = __webpack_require__(4);

util.inherits(gm, EventEmitter);

/**
 * Constructor.
 *
 * @param {String|Number} path - path to img source or ReadableStream or width of img to create
 * @param {Number} [height] - optional filename of ReadableStream or height of img to create
 * @param {String} [color] - optional hex background color of created img
 */

function gm(source, height, color) {
  var width;

  if (!(this instanceof gm)) {
    return new gm(source, height, color);
  }

  EventEmitter.call(this);

  this._options = {};
  this.options(this.__proto__._options);

  this.data = {};
  this._in = [];
  this._out = [];
  this._outputFormat = null;
  this._subCommand = 'convert';

  if (source instanceof Stream) {
    this.sourceStream = source;
    source = height || 'unknown.jpg';
  } else if (Buffer.isBuffer(source)) {
    this.sourceBuffer = source;
    source = height || 'unknown.jpg';
  } else if (height) {
    // new images
    width = source;
    source = "";

    this.in("-size", width + "x" + height);

    if (color) {
      this.in("xc:" + color);
    }
  }

  if (typeof source === "string") {
    // then source is a path

    // parse out gif frame brackets from filename
    // since stream doesn't use source path
    // eg. "filename.gif[0]"
    var frames = source.match(/(\[.+\])$/);
    if (frames) {
      this.sourceFrames = source.substr(frames.index, frames[0].length);
      source = source.substr(0, frames.index);
    }
  }

  this.source = source;

  this.addSrcFormatter(function (src) {
    // must be first source formatter

    var inputFromStdin = this.sourceStream || this.sourceBuffer;
    var ret = inputFromStdin ? '-' : this.source;

    if (ret && this.sourceFrames) ret += this.sourceFrames;

    src.length = 0;
    src[0] = ret;
  });
}

/**
 * Subclasses the gm constructor with custom options.
 *
 * @param {options} options
 * @return {gm} the subclasses gm constructor
 */

var parent = gm;
gm.subClass = function subClass(options) {
  function gm(source, height, color) {
    if (!(this instanceof parent)) {
      return new gm(source, height, color);
    }

    parent.call(this, source, height, color);
  }

  gm.prototype.__proto__ = parent.prototype;
  gm.prototype._options = {};
  gm.prototype.options(options);

  return gm;
};

/**
 * Augment the prototype.
 */

__webpack_require__(24)(gm.prototype);
__webpack_require__(22)(gm);
__webpack_require__(13)(gm.prototype);
__webpack_require__(21)(gm.prototype);
__webpack_require__(16)(gm.prototype);
__webpack_require__(14)(gm.prototype);
__webpack_require__(5)(gm.prototype);
__webpack_require__(15)(gm.prototype);
__webpack_require__(23)(gm.prototype);

/**
 * Expose.
 */

module.exports = exports = gm;
module.exports.utils = __webpack_require__(1);
module.exports.compare = __webpack_require__(5)();
module.exports.version = __webpack_require__(47).version;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */

var argsToArray = __webpack_require__(1).argsToArray;
var isUtil = __webpack_require__(1).isUtil;
/**
 * Extend proto
 */

module.exports = function (proto) {
  // change the specified frame.
  // See #202.
  proto.selectFrame = function (frame) {
    if (typeof frame === 'number') this.sourceFrames = '[' + frame + ']';
    return this;
  };

  // define the sub-command to use, http://www.graphicsmagick.org/utilities.html
  proto.command = proto.subCommand = function subCommand(name) {
    this._subCommand = name;
    return this;
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-adjoin
  proto.adjoin = function adjoin() {
    return this.out("-adjoin");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-affine
  proto.affine = function affine(matrix) {
    return this.out("-affine", matrix);
  };

  proto.alpha = function alpha(type) {
    if (!this._options.imageMagick) return new Error('Method -alpha is not supported by GraphicsMagick');
    return this.out('-alpha', type);
  };

  /**
   * Appends images to the list of "source" images.
   *
   * We may also specify either top-to-bottom or left-to-right
   * behavior of the appending by passing a boolean argument.
   *
   * Examples:
   *
   *    img = gm(src);
   *
   *    // +append means left-to-right
   *    img.append(img1, img2)       gm convert src img1 img2 -append
   *    img.append(img, true)        gm convert src img +append
   *    img.append(img, false)       gm convert src img -append
   *    img.append(img)              gm convert src img -append
   *    img.append(img).append()     gm convert src img -append
   *    img.append(img).append(true) gm convert src img +append
   *    img.append(img).append(true) gm convert src img +append
   *    img.append(img).background('#222) gm convert src img -background #222 +append
   *    img.append([img1,img2...],true)
    * @param {String} or {Array} [img]
   * @param {Boolean} [ltr]
   * @see http://www.graphicsmagick.org/GraphicsMagick.html#details-append
   */

  proto.append = function append(img, ltr) {
    if (!this._append) {
      this._append = [];
      this.addSrcFormatter(function (src) {
        this.out(this._append.ltr ? '+append' : '-append');
        src.push.apply(src, this._append);
      });
    }

    if (0 === arguments.length) {
      this._append.ltr = false;
      return this;
    }

    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      switch (isUtil(arg)) {
        case 'Boolean':
          this._append.ltr = arg;
          break;
        case 'String':
          this._append.push(arg);
          break;
        case 'Array':
          for (var j = 0, len = arg.length; j < len; j++) {
            if (isUtil(arg[j]) == 'String') {
              this._append.push(arg[j]);
            }
          }
          break;
      }
    }

    return this;
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-authenticate
  proto.authenticate = function authenticate(string) {
    return this.out("-authenticate", string);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-average
  proto.average = function average() {
    return this.out("-average");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-backdrop
  proto.backdrop = function backdrop() {
    return this.out("-backdrop");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-black-threshold
  proto.blackThreshold = function blackThreshold(red, green, blue, opacity) {
    return this.out("-black-threshold", argsToArray(red, green, blue, opacity).join(','));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blue-primary
  proto.bluePrimary = function bluePrimary(x, y) {
    return this.out("-blue-primary", argsToArray(x, y).join(','));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-border
  proto.border = function border(width, height) {
    return this.out("-border", width + "x" + height);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-bordercolor
  proto.borderColor = function borderColor(color) {
    return this.out("-bordercolor", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-box
  proto.box = function box(color) {
    return this.out("-box", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-channel
  proto.channel = function channel(type) {
    return this.out("-channel", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
  proto.chop = function chop(w, h, x, y) {
    return this.in("-chop", w + "x" + h + "+" + (x || 0) + "+" + (y || 0));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-clip
  proto.clip = function clip() {
    return this.out("-clip");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-coalesce
  proto.coalesce = function coalesce() {
    return this.out("-coalesce");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
  proto.colorize = function colorize(r, g, b) {
    return this.out("-colorize", [r, g, b].join(","));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colormap
  proto.colorMap = function colorMap(type) {
    return this.out("-colormap", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-compose
  proto.compose = function compose(operator) {
    return this.out("-compose", operator);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
  proto.compress = function compress(type) {
    return this.out("-compress", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-kernel
  proto.convolve = function convolve(kernel) {
    return this.out("-convolve", kernel);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-create-directories
  proto.createDirectories = function createDirectories() {
    return this.out("-create-directories");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-deconstruct
  proto.deconstruct = function deconstruct() {
    return this.out("-deconstruct");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-define
  proto.define = function define(value) {
    return this.out("-define", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-delay
  proto.delay = function delay(value) {
    return this.out("-delay", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-displace
  proto.displace = function displace(horizontalScale, verticalScale) {
    return this.out("-displace", horizontalScale + 'x' + verticalScale);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-display
  proto.display = function display(value) {
    return this.out("-display", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dispose
  proto.dispose = function dispose(method) {
    return this.out("-dispose", method);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dissolve
  proto.dissolve = function dissolve(percent) {
    return this.out("-dissolve", percent + '%');
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-encoding
  proto.encoding = function encoding(type) {
    return this.out("-encoding", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-endian
  proto.endian = function endian(type) {
    return this.out("-endian", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-file
  proto.file = function file(filename) {
    return this.out("-file", filename);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
  proto.flatten = function flatten() {
    return this.out("-flatten");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-foreground
  proto.foreground = function foreground(color) {
    return this.out("-foreground", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-frame
  proto.frame = function frame(width, height, outerBevelWidth, innerBevelWidth) {
    if (arguments.length == 0) return this.out("-frame");
    return this.out("-frame", width + 'x' + height + '+' + outerBevelWidth + '+' + innerBevelWidth);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fuzz
  proto.fuzz = function fuzz(distance, percent) {
    return this.out("-fuzz", distance + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gaussian
  proto.gaussian = function gaussian(radius, sigma) {
    return this.out("-gaussian", argsToArray(radius, sigma).join('x'));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-geometry
  proto.geometry = function geometry(width, height, arg) {
    // If the first argument is a string, and there is only one argument, this is a custom geometry command.
    if (arguments.length == 1 && typeof arguments[0] === "string") return this.out("-geometry", arguments[0]);

    // Otherwise, return a resizing geometry command with an option alrgument.
    return this.out("-geometry", width + 'x' + height + (arg || ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-green-primary
  proto.greenPrimary = function greenPrimary(x, y) {
    return this.out("-green-primary", x + ',' + y);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-highlight-color
  proto.highlightColor = function highlightColor(color) {
    return this.out("-highlight-color", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-highlight-style
  proto.highlightStyle = function highlightStyle(style) {
    return this.out("-highlight-style", style);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-iconGeometry
  proto.iconGeometry = function iconGeometry(geometry) {
    return this.out("-iconGeometry", geometry);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-intent
  proto.intent = function intent(type) {
    return this.out("-intent", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-lat
  proto.lat = function lat(width, height, offset, percent) {
    return this.out("-lat", width + 'x' + height + offset + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-level
  proto.level = function level(blackPoint, gamma, whitePoint, percent) {
    return this.out("-level", argsToArray(blackPoint, gamma, whitePoint).join(',') + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-list
  proto.list = function list(type) {
    return this.out("-list", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-log
  proto.log = function log(string) {
    return this.out("-log", string);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-loop
  proto.loop = function loop(iterations) {
    return this.out("-loop", iterations);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-map
  proto.map = function map(filename) {
    return this.out("-map", filename);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mask
  proto.mask = function mask(filename) {
    return this.out("-mask", filename);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-matte
  proto.matte = function matte() {
    return this.out("-matte");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mattecolor
  proto.matteColor = function matteColor(color) {
    return this.out("-mattecolor", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-maximum-error
  proto.maximumError = function maximumError(limit) {
    return this.out("-maximum-error", limit);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mode
  proto.mode = function mode(value) {
    return this.out("-mode", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-monitor
  proto.monitor = function monitor() {
    return this.out("-monitor");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mosaic
  proto.mosaic = function mosaic() {
    return this.out("-mosaic");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-motion-blur
  proto.motionBlur = function motionBlur(radius, sigma, angle) {
    var arg = radius;
    if (typeof sigma != 'undefined') arg += 'x' + sigma;
    if (typeof angle != 'undefined') arg += '+' + angle;
    return this.out("-motion-blur", arg);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-name
  proto.name = function name() {
    return this.out("-name");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noop
  proto.noop = function noop() {
    return this.out("-noop");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-normalize
  proto.normalize = function normalize() {
    return this.out("-normalize");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-opaque
  proto.opaque = function opaque(color) {
    return this.out("-opaque", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-operator
  proto.operator = function operator(channel, operator, rvalue, percent) {
    return this.out("-operator", channel, operator, rvalue + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-ordered-dither
  proto.orderedDither = function orderedDither(channeltype, NxN) {
    return this.out("-ordered-dither", channeltype, NxN);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-output-directory
  proto.outputDirectory = function outputDirectory(directory) {
    return this.out("-output-directory", directory);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-page
  proto.page = function page(width, height, arg) {
    return this.out("-page", width + 'x' + height + (arg || ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-pause
  proto.pause = function pause(seconds) {
    return this.out("-pause", seconds);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-pen
  proto.pen = function pen(color) {
    return this.out("-pen", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-ping
  proto.ping = function ping() {
    return this.out("-ping");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-pointsize
  proto.pointSize = function pointSize(value) {
    return this.out("-pointsize", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-preview
  proto.preview = function preview(type) {
    return this.out("-preview", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-process
  proto.process = function process(command) {
    return this.out("-process", command);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  proto.profile = function profile(filename) {
    return this.out("-profile", filename);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-progress
  proto.progress = function progress() {
    return this.out("+progress");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-random-threshold
  proto.randomThreshold = function randomThreshold(channeltype, LOWxHIGH) {
    return this.out("-random-threshold", channeltype, LOWxHIGH);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-recolor
  proto.recolor = function recolor(matrix) {
    return this.out("-recolor", matrix);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-red-primary
  proto.redPrimary = function redPrimary(x, y) {
    return this.out("-red-primary", x, y);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-remote
  proto.remote = function remote() {
    return this.out("-remote");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-render
  proto.render = function render() {
    return this.out("-render");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-repage
  proto.repage = function repage(width, height, xoff, yoff, arg) {
    if (arguments[0] === "+") return this.out("+repage");
    return this.out("-repage", width + 'x' + height + '+' + xoff + '+' + yoff + (arg || ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sample
  proto.sample = function sample(geometry) {
    return this.out("-sample", geometry);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sampling-factor
  proto.samplingFactor = function samplingFactor(horizontalFactor, verticalFactor) {
    return this.out("-sampling-factor", horizontalFactor + 'x' + verticalFactor);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scene
  proto.scene = function scene(value) {
    return this.out("-scene", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scenes
  proto.scenes = function scenes(start, end) {
    return this.out("-scenes", start + '-' + end);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-screen
  proto.screen = function screen() {
    return this.out("-screen");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-set
  proto.set = function set(attribute, value) {
    return this.out("-set", attribute, value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-segment
  proto.segment = function segment(clusterThreshold, smoothingThreshold) {
    return this.out("-segment", clusterThreshold + 'x' + smoothingThreshold);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shade
  proto.shade = function shade(azimuth, elevation) {
    return this.out("-shade", azimuth + 'x' + elevation);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shadow
  proto.shadow = function shadow(radius, sigma) {
    return this.out("-shadow", argsToArray(radius, sigma).join('x'));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shared-memory
  proto.sharedMemory = function sharedMemory() {
    return this.out("-shared-memory");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shave
  proto.shave = function shave(width, height, percent) {
    return this.out("-shave", width + 'x' + height + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shear
  proto.shear = function shear(xDegrees, yDegreees) {
    return this.out("-shear", xDegrees + 'x' + yDegreees);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-silent
  proto.silent = function silent(color) {
    return this.out("-silent");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-size
  proto.rawSize = function rawSize(width, height, offset) {
    var off = 'undefined' != typeof offset ? '+' + offset : '';
    return this.out("-size", width + 'x' + height + off);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-snaps
  proto.snaps = function snaps(value) {
    return this.out("-snaps", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stegano
  proto.stegano = function stegano(offset) {
    return this.out("-stegano", offset);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stereo
  proto.stereo = function stereo() {
    return this.out("-stereo");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-text-font
  proto.textFont = function textFont(name) {
    return this.out("-text-font", name);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-texture
  proto.texture = function texture(filename) {
    return this.out("-texture", filename);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-threshold
  proto.threshold = function threshold(value, percent) {
    return this.out("-threshold", value + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-thumbnail
  proto.thumbnail = function thumbnail(w, h, options) {
    options = options || "";
    var geometry,
        wIsValid = Boolean(w || w === 0),
        hIsValid = Boolean(h || h === 0);

    if (wIsValid && hIsValid) {
      geometry = w + "x" + h + options;
    } else if (wIsValid) {
      // GraphicsMagick requires <width>x<options>, ImageMagick requires <width><options>
      geometry = this._options.imageMagick ? w + options : w + 'x' + options;
    } else if (hIsValid) {
      geometry = 'x' + h + options;
    } else {
      return this;
    }

    return this.out("-thumbnail", geometry);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-tile
  proto.tile = function tile(filename) {
    return this.out("-tile", filename);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-title
  proto.title = function title(string) {
    return this.out("-title", string);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-transform
  proto.transform = function transform(color) {
    return this.out("-transform", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-transparent
  proto.transparent = function transparent(color) {
    return this.out("-transparent", color);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-treedepth
  proto.treeDepth = function treeDepth(value) {
    return this.out("-treedepth", value);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-update
  proto.update = function update(seconds) {
    return this.out("-update", seconds);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-units
  proto.units = function units(type) {
    return this.out("-units", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-unsharp
  proto.unsharp = function unsharp(radius, sigma, amount, threshold) {
    var arg = radius;
    if (typeof sigma != 'undefined') arg += 'x' + sigma;
    if (typeof amount != 'undefined') arg += '+' + amount;
    if (typeof threshold != 'undefined') arg += '+' + threshold;
    return this.out("-unsharp", arg);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-use-pixmap
  proto.usePixmap = function usePixmap() {
    return this.out("-use-pixmap");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-view
  proto.view = function view(string) {
    return this.out("-view", string);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-virtual-pixel
  proto.virtualPixel = function virtualPixel(method) {
    return this.out("-virtual-pixel", method);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-visual
  proto.visual = function visual(type) {
    return this.out("-visual", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-watermark
  proto.watermark = function watermark(brightness, saturation) {
    return this.out("-watermark", brightness + 'x' + saturation);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-wave
  proto.wave = function wave(amplitude, wavelength) {
    return this.out("-wave", amplitude + 'x' + wavelength);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-white-point
  proto.whitePoint = function whitePoint(x, y) {
    return this.out("-white-point", x + 'x' + y);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-white-threshold
  proto.whiteThreshold = function whiteThreshold(red, green, blue, opacity) {
    return this.out("-white-threshold", argsToArray(red, green, blue, opacity).join(','));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-window
  proto.window = function window(id) {
    return this.out("-window", id);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-window-group
  proto.windowGroup = function windowGroup() {
    return this.out("-window-group");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-strip (graphicsMagick >= 1.3.15)
  proto.strip = function strip() {
    if (this._options.imageMagick) return this.out("-strip");
    return this.noProfile().out("+comment"); //Equivalent to "-strip" for all versions of graphicsMagick
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-interlace
  proto.interlace = function interlace(type) {
    return this.out("-interlace", type || "None");
  };

  // force output format
  proto.setFormat = function setFormat(format) {
    if (format) this._outputFormat = format;
    return this;
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
  proto.resize = function resize(w, h, options) {
    options = options || "";
    var geometry,
        wIsValid = Boolean(w || w === 0),
        hIsValid = Boolean(h || h === 0);

    if (wIsValid && hIsValid) {
      geometry = w + "x" + h + options;
    } else if (wIsValid) {
      // GraphicsMagick requires <width>x<options>, ImageMagick requires <width><options>
      geometry = this._options.imageMagick ? w + options : w + 'x' + options;
    } else if (hIsValid) {
      geometry = 'x' + h + options;
    } else {
      return this;
    }

    return this.out("-resize", geometry);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resize with '!' option
  proto.resizeExact = function resize(w, h) {
    var options = "!";
    return proto.resize.apply(this, [w, h, options]);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
  proto.scale = function scale(w, h, options) {
    options = options || "";
    var geometry;
    if (w && h) {
      geometry = w + "x" + h + options;
    } else if (w && !h) {
      geometry = this._options.imageMagick ? w + options : w + 'x' + options;
    } else if (!w && h) {
      geometry = 'x' + h + options;
    }

    return this.out("-scale", geometry);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-filter
  proto.filter = function filter(val) {
    return this.out("-filter", val);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-density
  proto.density = function density(w, h) {
    if (w && !h && this._options.imageMagick) {
      // GraphicsMagick requires <width>x<height>y, ImageMagick may take dpi<resolution>
      // recommended 300dpi for higher quality
      return this.in("-density", w);
    }
    return this.in("-density", w + "x" + h);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  proto.noProfile = function noProfile() {
    this.out('+profile', '"*"');
    return this;
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
  proto.resample = function resample(w, h) {
    return this.out("-resample", w + "x" + h);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
  proto.rotate = function rotate(color, deg) {
    return this.out("-background", color, "-rotate", String(deg || 0));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
  proto.flip = function flip() {
    return this.out("-flip");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flop
  proto.flop = function flop() {
    return this.out("-flop");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
  proto.crop = function crop(w, h, x, y, percent) {
    if (this.inputIs('jpg')) {
      // avoid error "geometry does not contain image (unable to crop image)" - gh-17
      var index = this._in.indexOf('-size');
      if (~index) {
        this._in.splice(index, 2);
      }
    }

    return this.out("-crop", w + "x" + h + "+" + (x || 0) + "+" + (y || 0) + (percent ? '%' : ''));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-magnify
  proto.magnify = function magnify(factor) {
    return this.in("-magnify");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.minify = function minify() {
    return this.in("-minify");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
  proto.quality = function quality(val) {
    return this.in("-quality", val || 75);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
  proto.blur = function blur(radius, sigma) {
    return this.out("-blur", radius + (sigma ? "x" + sigma : ""));
  };

  // http://www.graphicsmagick.org/convert.html
  proto.charcoal = function charcoal(factor) {
    return this.out("-charcoal", factor || 2);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
  proto.modulate = function modulate(b, s, h) {
    return this.out("-modulate", [b, s, h].join(","));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
  // note: antialiasing is enabled by default
  proto.antialias = function antialias(disable) {
    return false === disable ? this.out("+antialias") : this;
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-depth
  proto.bitdepth = function bitdepth(val) {
    return this.out("-depth", val);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
  proto.colors = function colors(val) {
    return this.out("-colors", val || 128);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace
  proto.colorspace = function colorspace(val) {
    return this.out("-colorspace", val);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.comment = comment("-comment");

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
  proto.contrast = function contrast(mult) {
    var arg = (parseInt(mult, 10) || 0) > 0 ? "+contrast" : "-contrast";

    mult = Math.abs(mult) || 1;

    while (mult--) {
      this.out(arg);
    }

    return this;
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
  proto.cycle = function cycle(amount) {
    return this.out("-cycle", amount || 2);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.despeckle = function despeckle() {
    return this.out("-despeckle");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
  // note: either colors() or monochrome() must be used for this
  // to take effect.
  proto.dither = function dither(on) {
    var sign = false === on ? "+" : "-";

    return this.out(sign + "dither");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.monochrome = function monochrome() {
    return this.out("-monochrome");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.edge = function edge(radius) {
    return this.out("-edge", radius || 1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.emboss = function emboss(radius) {
    return this.out("-emboss", radius || 1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.enhance = function enhance() {
    return this.out("-enhance");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.equalize = function equalize() {
    return this.out("-equalize");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
  proto.gamma = function gamma(r, g, b) {
    return this.out("-gamma", [r, g, b].join());
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.implode = function implode(factor) {
    return this.out("-implode", factor || 1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.label = comment("-label");

  var limits = ["disk", "file", "map", "memory", "pixels", "threads"];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-limit
  proto.limit = function limit(type, val) {
    type = type.toLowerCase();

    if (!~limits.indexOf(type)) {
      return this;
    }

    return this.out("-limit", type, val);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.median = function median(radius) {
    return this.out("-median", radius || 1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-negate
  proto.negative = function negative(grayscale) {
    var sign = grayscale ? "+" : "-";
    return this.out(sign + "negate");
  };

  var noises = ["uniform", "gaussian", "multiplicative", "impulse", "laplacian", "poisson"];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
  proto.noise = function noise(radius) {
    radius = String(radius).toLowerCase();

    var sign = ~noises.indexOf(radius) ? "+" : "-";

    return this.out(sign + "noise", radius);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
  proto.paint = function paint(radius) {
    return this.out("-paint", radius);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.raise = function raise(w, h) {
    return this.out("-raise", (w || 0) + "x" + (h || 0));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.lower = function lower(w, h) {
    return this.out("+raise", (w || 0) + "x" + (h || 0));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-region
  proto.region = function region(w, h, x, y) {
    w = w || 0;
    h = h || 0;
    x = x || 0;
    y = y || 0;
    return this.out("-region", w + "x" + h + "+" + x + "+" + y);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
  proto.roll = function roll(x, y) {
    x = ((x = parseInt(x, 10) || 0) >= 0 ? "+" : "") + x;
    y = ((y = parseInt(y, 10) || 0) >= 0 ? "+" : "") + y;
    return this.out("-roll", x + y);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
  proto.sharpen = function sharpen(radius, sigma) {
    sigma = sigma ? "x" + sigma : "";

    return this.out("-sharpen", radius + sigma);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
  proto.solarize = function solarize(factor) {
    return this.out("-solarize", (factor || 1) + "%");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
  proto.spread = function spread(amount) {
    return this.out("-spread", amount || 5);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
  proto.swirl = function swirl(degrees) {
    return this.out("-swirl", degrees || 180);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-type
  proto.type = function type(type) {
    return this.in("-type", type);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-trim
  proto.trim = function trim() {
    return this.out("-trim");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-extent
  proto.extent = function extent(w, h, options) {
    options = options || "";
    var geometry;
    if (w && h) {
      geometry = w + "x" + h + options;
    } else if (w && !h) {
      geometry = this._options.imageMagick ? w + options : w + 'x' + options;
    } else if (!w && h) {
      geometry = 'x' + h + options;
    }

    return this.out("-extent", geometry);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gravity
  // Be sure to use gravity BEFORE extent
  proto.gravity = function gravity(type) {
    if (!type || !~gravity.types.indexOf(type)) {
      type = "NorthWest"; // Documented default.
    }

    return this.out("-gravity", type);
  };

  proto.gravity.types = ["NorthWest", "North", "NorthEast", "West", "Center", "East", "SouthWest", "South", "SouthEast"];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
  proto.flatten = function flatten() {
    return this.out("-flatten");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-background
  proto.background = function background(color) {
    return this.in("-background", color);
  };
};

/**
 * Generates a handler for comments/labels.
 */

function comment(arg) {
  return function (format) {
    format = String(format);

    format = "@" == format.charAt(0) ? format.substring(1) : format;

    return this.out(arg, '"' + format + '"');
  };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var spawn = __webpack_require__(6);
var utils = __webpack_require__(1);
var debug = __webpack_require__(39)('gm');
var series = __webpack_require__(26);
var PassThrough = __webpack_require__(10).PassThrough;

/**
 * Error messaging.
 */

var noBufferConcat = 'gm v1.9.0+ required node v0.8+. Please update your version of node, downgrade gm < 1.9, or do not use `bufferStream`.';

/**
 * Extend proto
 */

module.exports = function (proto) {

  function args(prop) {
    return function args() {
      var len = arguments.length;
      var a = [];
      var i = 0;

      for (; i < len; ++i) {
        a.push(arguments[i]);
      }

      this[prop] = this[prop].concat(a);
      return this;
    };
  }

  function streamToUnemptyBuffer(stream, callback) {
    var done = false;
    var buffers = [];

    stream.on('data', function (data) {
      buffers.push(data);
    });

    stream.on('end', function () {
      var result, err;
      if (done) return;

      done = true;
      result = Buffer.concat(buffers);
      buffers = null;
      if (result.length == 0) {
        err = new Error("Stream yields empty buffer");
        callback(err, null);
      } else {
        callback(null, result);
      }
    });

    stream.on('error', function (err) {
      done = true;
      buffers = null;
      callback(err);
    });
  }

  proto.in = args('_in');
  proto.out = args('_out');

  proto._preprocessor = [];
  proto.preprocessor = args('_preprocessor');

  /**
   * Execute the command and write the image to the specified file name.
   *
   * @param {String} name
   * @param {Function} callback
   * @return {Object} gm
   */

  proto.write = function write(name, callback) {
    if (!callback) callback = name, name = null;

    if ("function" !== typeof callback) {
      throw new TypeError("gm().write() expects a callback function");
    }

    if (!name) {
      return callback(TypeError("gm().write() expects a filename when writing new files"));
    }

    this.outname = name;

    var self = this;
    this._preprocess(function (err) {
      if (err) return callback(err);
      self._spawn(self.args(), true, callback);
    });
  };

  /**
   * Execute the command and return stdin and stderr
   * ReadableStreams providing the image data.
   * If no callback is passed, a "through" stream will be returned,
   * and stdout will be piped through, otherwise the error will be passed.
   *
   * @param {String} format (optional)
   * @param {Function} callback (optional)
   * @return {Stream}
   */

  proto.stream = function stream(format, callback) {
    if (!callback && typeof format === 'function') {
      callback = format;
      format = null;
    }

    var throughStream;

    if ("function" !== typeof callback) {
      throughStream = new PassThrough();
      callback = function callback(err, stdout, stderr) {
        if (err) throughStream.emit('error', err);else stdout.pipe(throughStream);
      };
    }

    if (format) {
      format = format.split('.').pop();
      this.outname = format + ":-";
    }

    var self = this;
    this._preprocess(function (err) {
      if (err) return callback(err);
      return self._spawn(self.args(), false, callback);
    });

    return throughStream || this;
  };

  /**
   * Convenience function for `proto.stream`.
   * Simply returns the buffer instead of the stream.
   *
   * @param {String} format (optional)
   * @param {Function} callback
   * @return {null}
   */

  proto.toBuffer = function toBuffer(format, callback) {
    if (!callback) callback = format, format = null;

    if ("function" !== typeof callback) {
      throw new Error('gm().toBuffer() expects a callback.');
    }

    return this.stream(format, function (err, stdout) {
      if (err) return callback(err);

      streamToUnemptyBuffer(stdout, callback);
    });
  };

  /**
    * Run any preProcessor functions in series. Used by autoOrient.
    *
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._preprocess = function _preprocess(callback) {
    series(this._preprocessor, this, callback);
  };

  /**
    * Execute the command, buffer input and output, return stdout and stderr buffers.
    *
    * @param {String} bin
    * @param {Array} args
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._exec = function _exec(args, callback) {
    return this._spawn(args, true, callback);
  };

  /**
    * Execute the command with stdin, returning stdout and stderr streams or buffers.
    * @param {String} bin
    * @param {Array} args
    * @param {ReadableStream} stream
    * @param {Boolean} shouldBuffer
    * @param {Function} callback, signature (err, stdout, stderr) -> * 
    * @return {Object} gm
    * @TODO refactor this mess
    */

  proto._spawn = function _spawn(args, bufferOutput, callback) {
    var appPath = this._options.appPath || '';
    var bin = this._options.imageMagick ? appPath + args.shift() : appPath + 'gm';

    var cmd = bin + ' ' + args.map(utils.escape).join(' '),
        self = this,
        proc,
        err,
        timeout = parseInt(this._options.timeout),
        disposers = this._options.disposers,
        timeoutId;

    debug(cmd);
    //imageMagick does not support minify (https://github.com/aheckmann/gm/issues/385)
    if (args.indexOf("-minify") > -1 && this._options.imageMagick) {
      err = new Error("imageMagick does not support minify, use -scale or -sample. Alternatively, use graphicsMagick");
      return cb(err);
    }
    try {
      proc = spawn(bin, args);
    } catch (e) {
      return cb(e);
    }
    proc.stdin.once('error', cb);

    proc.on('error', function (err) {
      if (err.code === 'ENOENT') {
        cb(new Error('Could not execute GraphicsMagick/ImageMagick: ' + cmd + " this most likely means the gm/convert binaries can't be found"));
      } else {
        cb(err);
      }
    });

    if (timeout) {
      timeoutId = setTimeout(function () {
        dispose('gm() resulted in a timeout.');
      }, timeout);
    }

    if (disposers) {
      disposers.forEach(function (disposer) {
        disposer.events.forEach(function (event) {
          disposer.emitter.on(event, dispose);
        });
      });
    }

    if (self.sourceBuffer) {
      proc.stdin.write(this.sourceBuffer);
      proc.stdin.end();
    } else if (self.sourceStream) {

      if (!self.sourceStream.readable) {
        err = new Error("gm().stream() or gm().write() with a non-readable stream.");
        return cb(err);
      }

      self.sourceStream.pipe(proc.stdin);

      // bufferStream
      // We convert the input source from a stream to a buffer.
      if (self.bufferStream && !this._buffering) {
        if (!Buffer.concat) {
          throw new Error(noBufferConcat);
        }

        // Incase there are multiple processes in parallel,
        // we only need one
        self._buffering = true;

        streamToUnemptyBuffer(self.sourceStream, function (err, buffer) {
          self.sourceBuffer = buffer;
          self.sourceStream = null; // The stream is now dead
        });
      }
    }

    // for _exec operations (identify() mostly), we also
    // need to buffer the output stream before returning
    if (bufferOutput) {
      var stdout = '',
          stderr = '',
          onOut,
          onErr,
          _onExit;

      proc.stdout.on('data', onOut = function onOut(data) {
        stdout += data;
      });

      proc.stderr.on('data', onErr = function onErr(data) {
        stderr += data;
      });

      proc.on('close', _onExit = function onExit(code, signal) {
        if (code !== 0 || signal !== null) {
          err = new Error('Command failed: ' + stderr);
          err.code = code;
          err.signal = signal;
        };
        cb(err, stdout, stderr, cmd);
        stdout = stderr = onOut = onErr = _onExit = null;
      });
    } else {
      cb(null, proc.stdout, proc.stderr, cmd);
    }

    return self;

    function cb(err, stdout, stderr, cmd) {
      if (cb.called) return;
      if (timeoutId) clearTimeout(timeoutId);
      cb.called = 1;
      if (args[0] !== 'identify' && bin !== 'identify') {
        self._in = [];
        self._out = [];
      }
      callback.call(self, err, stdout, stderr, cmd);
    }

    function dispose(msg) {
      var message = msg ? msg : 'gm() was disposed';
      err = new Error(message);
      cb(err);
      if (proc.exitCode === null) {
        proc.stdin.pause();
        proc.kill();
      }
    }
  };

  /**
   * Returns arguments to be used in the command.
   *
   * @return {Array}
   */

  proto.args = function args() {
    var outname = this.outname || "-";
    if (this._outputFormat) outname = this._outputFormat + ':' + outname;

    return [].concat(this._subCommand, this._in, this.src(), this._out, outname).filter(Boolean); // remove falsey
  };

  /**
   * Adds an img source formatter.
   *
   * `formatters` are passed an array of images which will be
   * used as 'input' images for the command. Useful for methods
   * like `.append()` where multiple source images may be used.
   *
   * @param {Function} formatter
   * @return {gm} this
   */

  proto.addSrcFormatter = function addSrcFormatter(formatter) {
    if ('function' != typeof formatter) throw new TypeError('sourceFormatter must be a function');
    this._sourceFormatters || (this._sourceFormatters = []);
    this._sourceFormatters.push(formatter);
    return this;
  };

  /**
   * Applies all _sourceFormatters
   *
   * @return {Array}
   */

  proto.src = function src() {
    var arr = [];
    for (var i = 0; i < this._sourceFormatters.length; ++i) {
      this._sourceFormatters[i].call(this, arr);
    }
    return arr;
  };

  /**
   * Image types.
   */

  var types = {
    'jpg': /\.jpe?g$/i,
    'png': /\.png$/i,
    'gif': /\.gif$/i,
    'tiff': /\.tif?f$/i,
    'bmp': /(?:\.bmp|\.dib)$/i,
    'webp': /\.webp$/i
  };

  types.jpeg = types.jpg;
  types.tif = types.tiff;
  types.dib = types.bmp;

  /**
   * Determine the type of source image.
   *
   * @param {String} type
   * @return {Boolean}
   * @example
   *   if (this.inputIs('png')) ...
   */

  proto.inputIs = function inputIs(type) {
    if (!type) return false;

    var rgx = types[type];
    if (!rgx) {
      if ('.' !== type[0]) type = '.' + type;
      rgx = new RegExp('\\' + type + '$', 'i');
    }

    return rgx.test(this.source);
  };

  /**
   * add disposer (like 'close' of http.IncomingMessage) in order to dispose gm() with any event
   *
   * @param {EventEmitter} emitter
   * @param {Array} events
   * @return {Object} gm
   * @example
   *   command.addDisposer(req, ['close', 'end', 'finish']);
   */

  proto.addDisposer = function addDisposer(emitter, events) {
    if (!this._options.disposers) {
      this._options.disposers = [];
    }
    this._options.disposers.push({
      emitter: emitter,
      events: events
    });
    return this;
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// composite

/**
 * Composite images together using the `composite` command in graphicsmagick.
 *
 * gm('/path/to/image.jpg')
 * .composite('/path/to/second_image.jpg')
 * .geometry('+100+150')
 * .write('/path/to/composite.png', function(err) {
 *   if(!err) console.log("Written composite image.");
 * });
 *
 * @param {String} other  Path to the image that contains the changes.
 * @param {String} [mask] Path to the image with opacity informtion. Grayscale.
 */

module.exports = exports = function exports(proto) {
    proto.composite = function (other, mask) {
        this.in(other);

        // If the mask is defined, add it to the output.
        if (typeof mask !== "undefined") this.out(mask);

        this.subCommand("composite");

        return this;
    };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extend proto
 */

module.exports = function (proto) {
  __webpack_require__(20)(proto);
  __webpack_require__(18)(proto);
  __webpack_require__(19)(proto);
  __webpack_require__(17)(proto);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extend proto.
 */

module.exports = function (proto) {

  var exifTransforms = {
    topleft: '',
    topright: ['-flop'],
    bottomright: ['-rotate', 180],
    bottomleft: ['-flip'],
    lefttop: ['-flip', '-rotate', 90],
    righttop: ['-rotate', 90],
    rightbottom: ['-flop', '-rotate', 90],
    leftbottom: ['-rotate', 270]
  };

  proto.autoOrient = function autoOrient() {
    // Always strip EXIF data since we can't
    // change/edit it.

    // imagemagick has a native -auto-orient option
    // so does graphicsmagick, but in 1.3.18.
    // nativeAutoOrient option enables this if you know you have >= 1.3.18
    if (this._options.nativeAutoOrient || this._options.imageMagick) {
      this.out('-auto-orient');
      this.strip();
      return this;
    }

    this.preprocessor(function (callback) {
      this.orientation({ bufferStream: true }, function (err, orientation) {
        if (err) return callback(err);

        var transforms = exifTransforms[orientation.toLowerCase()];
        if (transforms) {

          // remove any existing transforms that might conflict
          var index = this._out.indexOf(transforms[0]);
          if (~index) {
            this._out.splice(index, transforms.length);
          }

          // repage to fix coordinates
          this._out.unshift.apply(this._out, transforms.concat('-page', '+0+0'));
        }

        this.strip();

        callback();
      });
    });

    return this;
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var fs = __webpack_require__(0);
var parallel = __webpack_require__(25);

/**
 * Extend proto.
 */

module.exports = function (proto) {

  /**
   * Do nothing.
   */

  function noop() {}

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-morph
  proto.morph = function morph(other, outname, callback) {
    if (!outname) {
      throw new Error("an output filename is required");
    }

    callback = (callback || noop).bind(this);

    var self = this;

    if (Array.isArray(other)) {
      other.forEach(function (img) {
        self.out(img);
      });
      self.out("-morph", other.length);
    } else {
      self.out(other, "-morph", 1);
    }

    self.write(outname, function (err, stdout, stderr, cmd) {
      if (err) return callback(err, stdout, stderr, cmd);

      // Apparently some platforms create the following temporary files.
      // Check if the output file exists, if it doesn't, then
      // work with temporary files.
      fs.exists(outname, function (exists) {
        if (exists) return callback(null, stdout, stderr, cmd);

        parallel([fs.unlink.bind(fs, outname + '.0'), fs.unlink.bind(fs, outname + '.2'), fs.rename.bind(fs, outname + '.1', outname)], function (err) {
          callback(err, stdout, stderr, cmd);
        });
      });
    });

    return self;
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extend proto.
 */

module.exports = function (proto) {
  proto.sepia = function sepia() {
    return this.modulate(115, 0, 100).colorize(7, 21, 50);
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extend proto.
 */

module.exports = function (proto) {

  proto.thumb = function thumb(w, h, name, quality, align, progressive, callback, opts) {
    var self = this,
        args = Array.prototype.slice.call(arguments);

    opts = args.pop();

    if (typeof opts === 'function') {
      callback = opts;
      opts = '';
    } else {
      callback = args.pop();
    }

    w = args.shift();
    h = args.shift();
    name = args.shift();
    quality = args.shift() || 63;
    align = args.shift() || 'topleft';
    var interlace = args.shift() ? 'Line' : 'None';

    self.size(function (err, size) {
      if (err) {
        return callback.apply(self, arguments);
      }

      w = parseInt(w, 10);
      h = parseInt(h, 10);

      var w1, h1;
      var xoffset = 0;
      var yoffset = 0;

      if (size.width < size.height) {
        w1 = w;
        h1 = Math.floor(size.height * (w / size.width));
        if (h1 < h) {
          w1 = Math.floor(w1 * ((h - h1) / h + 1));
          h1 = h;
        }
      } else if (size.width > size.height) {
        h1 = h;
        w1 = Math.floor(size.width * (h / size.height));
        if (w1 < w) {
          h1 = Math.floor(h1 * ((w - w1) / w + 1));
          w1 = w;
        }
      } else if (size.width == size.height) {
        var bigger = w > h ? w : h;
        w1 = bigger;
        h1 = bigger;
      }

      if (align == 'center') {
        if (w < w1) {
          xoffset = (w1 - w) / 2;
        }
        if (h < h1) {
          yoffset = (h1 - h) / 2;
        }
      }

      self.quality(quality).in("-size", w1 + "x" + h1).scale(w1, h1, opts).crop(w, h, xoffset, yoffset).interlace(interlace).noProfile().write(name, function () {
        callback.apply(self, arguments);
      });
    });

    return self;
  };

  proto.thumbExact = function () {
    var self = this,
        args = Array.prototype.slice.call(arguments);

    args.push('!');

    self.thumb.apply(self, args);
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var escape = __webpack_require__(1).escape;

/**
 * Extend proto.
 */

module.exports = function (proto) {

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fill
  proto.fill = function fill(color) {
    return this.out("-fill", color || "none");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stroke
  proto.stroke = function stroke(color, width) {
    if (width) {
      this.strokeWidth(width);
    }

    return this.out("-stroke", color || "none");
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-strokewidth
  proto.strokeWidth = function strokeWidth(width) {
    return this.out("-strokewidth", width);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-font
  proto.font = function font(font, size) {
    if (size) {
      this.fontSize(size);
    }

    return this.out("-font", font);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.fontSize = function fontSize(size) {
    return this.out("-pointsize", size);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.draw = function draw(args) {
    return this.out("-draw", [].slice.call(arguments).join(" "));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPoint = function drawPoint(x, y) {
    return this.draw("point", x + "," + y);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawLine = function drawLine(x0, y0, x1, y1) {
    return this.draw("line", x0 + "," + y0, x1 + "," + y1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawRectangle = function drawRectangle(x0, y0, x1, y1, wc, hc) {
    var shape = "rectangle",
        lastarg;

    if ("undefined" !== typeof wc) {
      shape = "roundRectangle";

      if ("undefined" === typeof hc) {
        hc = wc;
      }

      lastarg = wc + "," + hc;
    }

    return this.draw(shape, x0 + "," + y0, x1 + "," + y1, lastarg);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawArc = function drawArc(x0, y0, x1, y1, a0, a1) {
    return this.draw("arc", x0 + "," + y0, x1 + "," + y1, a0 + "," + a1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawEllipse = function drawEllipse(x0, y0, rx, ry, a0, a1) {
    if (a0 == undefined) a0 = 0;
    if (a1 == undefined) a1 = 360;
    return this.draw("ellipse", x0 + "," + y0, rx + "," + ry, a0 + "," + a1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawCircle = function drawCircle(x0, y0, x1, y1) {
    return this.draw("circle", x0 + "," + y0, x1 + "," + y1);
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPolyline = function drawPolyline() {
    return this.draw("polyline", formatPoints(arguments));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPolygon = function drawPolygon() {
    return this.draw("polygon", formatPoints(arguments));
  };

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawBezier = function drawBezier() {
    return this.draw("bezier", formatPoints(arguments));
  };

  proto._gravities = ["northwest", "north", "northeast", "west", "center", "east", "southwest", "south", "southeast"];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawText = function drawText(x0, y0, text, gravity) {
    var gravity = String(gravity || "").toLowerCase(),
        arg = ["text " + x0 + "," + y0 + " " + escape(text)];

    if (~this._gravities.indexOf(gravity)) {
      arg.unshift("gravity", gravity);
    }

    return this.draw.apply(this, arg);
  };

  proto._drawProps = ["color", "matte"];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.setDraw = function setDraw(prop, x, y, method) {
    prop = String(prop || "").toLowerCase();

    if (!~this._drawProps.indexOf(prop)) {
      return this;
    }

    return this.draw(prop, x + "," + y, method);
  };
};

function formatPoints(points) {
  var len = points.length,
      result = [],
      i = 0;

  for (; i < len; ++i) {
    result.push(points[i].join(","));
  }

  return result;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extend proto.
 */

module.exports = function (gm) {

  var proto = gm.prototype;

  /**
   * `identify` states
   */

  var IDENTIFYING = 1;
  var IDENTIFIED = 2;

  /**
   * Map getter functions to output names.
   *
   * - format: specifying the -format argument (see man gm)
   * - verbose: use -verbose instead of -format (only if necessary b/c its slow)
   * - helper: use the conversion helper
   */

  var map = {
    'format': { key: 'format', format: '%m ', helper: 'Format' },
    'depth': { key: 'depth', format: '%q' },
    'filesize': { key: 'Filesize', format: '%b' },
    'size': { key: 'size', format: '%wx%h ', helper: 'Geometry' },
    'color': { key: 'color', format: '%k', helper: 'Colors' },
    'orientation': { key: 'Orientation', format: '%[EXIF:Orientation]', helper: 'Orientation' },
    'res': { key: 'Resolution', verbose: true }
  };

  /**
   * Getter functions
   */

  Object.keys(map).forEach(function (getter) {
    proto[getter] = function (opts, callback) {
      if (!callback) callback = opts, opts = {};
      if (!callback) return this;

      var val = map[getter],
          key = val.key,
          self = this;

      if (self.data[key]) {
        callback.call(self, null, self.data[key]);
        return self;
      }

      self.on(getter, callback);

      self.bufferStream = !!opts.bufferStream;

      if (val.verbose) {
        self.identify(opts, function (err, stdout, stderr, cmd) {
          if (err) {
            self.emit(getter, err, self.data[key], stdout, stderr, cmd);
          } else {
            self.emit(getter, err, self.data[key]);
          }
        });
        return self;
      }

      var args = makeArgs(self, val);
      self._exec(args, function (err, stdout, stderr, cmd) {
        if (err) {
          self.emit(getter, err, self.data[key], stdout, stderr, cmd);
          return;
        }

        var result = (stdout || '').trim();

        if (val.helper in helper) {
          helper[val.helper](self.data, result);
        } else {
          self.data[key] = result;
        }

        self.emit(getter, err, self.data[key]);
      });

      return self;
    };
  });

  /**
   * identify command
   *
   * Overwrites all internal data with the parsed output
   * which is more accurate than the fast shortcut
   * getters.
   */

  proto.identify = function identify(opts, callback) {
    // identify with pattern
    if (typeof opts === 'string') {
      opts = {
        format: opts
      };
    }
    if (!callback) callback = opts, opts = {};
    if (!callback) return this;
    if (opts && opts.format) return identifyPattern.call(this, opts, callback);

    var self = this;

    if (IDENTIFIED === self._identifyState) {
      callback.call(self, null, self.data);
      return self;
    }

    self.on('identify', callback);

    if (IDENTIFYING === self._identifyState) {
      return self;
    }

    self._identifyState = IDENTIFYING;

    self.bufferStream = !!opts.bufferStream;

    var args = makeArgs(self, { verbose: true });

    self._exec(args, function (err, stdout, stderr, cmd) {
      if (err) {
        self.emit('identify', err, self.data, stdout, stderr, cmd);
        return;
      }

      err = parse(stdout, self);

      if (err) {
        self.emit('identify', err, self.data, stdout, stderr, cmd);
        return;
      }

      self.data.path = self.source;

      self.emit('identify', null, self.data);
      self._identifyState = IDENTIFIED;
    });

    return self;
  };

  /**
   * identify with pattern
   *
   * Execute `identify -format` with custom pattern
   */

  function identifyPattern(opts, callback) {
    var self = this;

    self.bufferStream = !!opts.bufferStream;

    var args = makeArgs(self, opts);
    self._exec(args, function (err, stdout, stderr, cmd) {
      if (err) {
        return callback.call(self, err, undefined, stdout, stderr, cmd);
      }

      callback.call(self, err, (stdout || '').trim());
    });

    return self;
  }

  /**
   * Parses `identify` responses.
   *
   * @param {String} stdout
   * @param {Gm} self
   * @return {Error} [optionally]
   */

  function parse(stdout, self) {
    // normalize
    var parts = (stdout || "").trim().replace(/\r\n|\r/g, "\n").split("\n");

    // skip the first line (its just the filename)
    parts.shift();

    try {
      var len = parts.length,
          rgx1 = /^( *)(.+?): (.*)$/ // key: val
      ,
          rgx2 = /^( *)(.+?):$/ // key: begin nested object
      ,
          out = { indent: {} },
          level = null,
          lastkey,
          i = 0,
          res,
          o;

      for (; i < len; ++i) {
        res = rgx1.exec(parts[i]) || rgx2.exec(parts[i]);
        if (!res) continue;

        var indent = res[1].length,
            key = res[2] ? res[2].trim() : '';

        if ('Image' == key || 'Warning' == key) continue;

        var val = res[3] ? res[3].trim() : null;

        // first iteration?
        if (null === level) {
          level = indent;
          o = out.root = out.indent[level] = self.data;
        } else if (indent < level) {
          // outdent
          if (!(indent in out.indent)) {
            continue;
          }
          o = out.indent[indent];
        } else if (indent > level) {
          // dropping into a nested object
          out.indent[level] = o;
          // weird format, key/val pair with nested children. discard the val
          o = o[lastkey] = {};
        }

        level = indent;

        if (val) {
          // if previous key was exist and we got the same key
          // cast it to an array.
          if (o.hasOwnProperty(key)) {
            // cast it to an array and dont forget the previous value
            if (!Array.isArray(o[key])) {
              var tmp = o[key];
              o[key] = [tmp];
            }

            // set value
            o[key].push(val);
          } else {
            o[key] = val;
          }

          if (key in helper) {
            helper[key](o, val);
          }
        }

        lastkey = key;
      }
    } catch (err) {
      err.message = err.message + "\n\n  Identify stdout:\n  " + stdout;
      return err;
    }
  }

  /**
   * Create an argument array for the identify command.
   *
   * @param {gm} self
   * @param {Object} val
   * @return {Array}
   */

  function makeArgs(self, val) {
    var args = ['identify', '-ping'];

    if (val.format) {
      args.push('-format', val.format);
    }

    if (val.verbose) {
      args.push('-verbose');
    }

    args = args.concat(self.src());
    return args;
  }

  /**
   * Map exif orientation codes to orientation names.
   */

  var orientations = {
    '1': 'TopLeft',
    '2': 'TopRight',
    '3': 'BottomRight',
    '4': 'BottomLeft',
    '5': 'LeftTop',
    '6': 'RightTop',
    '7': 'RightBottom',
    '8': 'LeftBottom'
  };

  /**
   * identify -verbose helpers
   */

  var helper = gm.identifyHelpers = {};

  helper.Geometry = function Geometry(o, val) {
    // We only want the size of the first frame.
    // Each frame is separated by a space.
    var split = val.split(" ").shift().split("x");
    var width = parseInt(split[0], 10);
    var height = parseInt(split[1], 10);
    if (o.size && o.size.width && o.size.height) {
      if (width > o.size.width) o.size.width = width;
      if (height > o.size.height) o.size.height = height;
    } else {
      o.size = {
        width: width,
        height: height
      };
    }
  };

  helper.Format = function Format(o, val) {
    o.format = val.split(" ")[0];
  };

  helper.Depth = function Depth(o, val) {
    o.depth = parseInt(val, 10);
  };

  helper.Colors = function Colors(o, val) {
    o.color = parseInt(val, 10);
  };

  helper.Orientation = function Orientation(o, val) {
    if (val in orientations) {
      o['Profile-EXIF'] || (o['Profile-EXIF'] = {});
      o['Profile-EXIF'].Orientation = val;
      o.Orientation = orientations[val];
    } else {
      o.Orientation = val || 'Unknown';
    }
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// montage

/**
 * Montage images next to each other using the `montage` command in graphicsmagick.
 *
 * gm('/path/to/image.jpg')
 * .montage('/path/to/second_image.jpg')
 * .geometry('+100+150')
 * .write('/path/to/montage.png', function(err) {
 *   if(!err) console.log("Written montage image.");
 * });
 *
 * @param {String} other  Path to the image that contains the changes.
 */

module.exports = exports = function exports(proto) {
    proto.montage = function (other) {
        this.in(other);

        this.subCommand("montage");

        return this;
    };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = function exports(proto) {
  proto._options = {};

  proto.options = function setOptions(options) {
    var keys = Object.keys(options),
        i = keys.length,
        key;

    while (i--) {
      key = keys[i];
      this._options[key] = options[key];
    }

    return this;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parallel(fns, context, callback) {
  if (!callback) {
    if (typeof context === 'function') {
      callback = context;
      context = null;
    } else {
      callback = noop;
    }
  }

  var pending = fns && fns.length;
  if (!pending) return callback(null, []);

  var finished = false;
  var results = new Array(pending);

  fns.forEach(context ? function (fn, i) {
    fn.call(context, maybeDone(i));
  } : function (fn, i) {
    fn(maybeDone(i));
  });

  function maybeDone(i) {
    return function (err, result) {
      if (finished) return;

      if (err) {
        callback(err, results);
        finished = true;
        return;
      }

      results[i] = result;

      if (! --pending) callback(null, results);
    };
  }
};

function noop() {}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function series(fns, context, callback) {
  if (!callback) {
    if (typeof context === 'function') {
      callback = context;
      context = null;
    } else {
      callback = noop;
    }
  }

  if (!(fns && fns.length)) return callback();

  fns = fns.slice(0);

  var call = context ? function () {
    fns.length ? fns.shift().call(context, next) : callback();
  } : function () {
    fns.length ? fns.shift()(next) : callback();
  };

  call();

  function next(err) {
    err ? callback(err) : call();
  }
};

function noop() {}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isWin = process.platform === 'win32';
var resolveCommand = __webpack_require__(7);

var isNode10 = process.version.indexOf('v0.10.') === 0;

function notFoundError(command, syscall) {
    var err;

    err = new Error(syscall + ' ' + command + ' ENOENT');
    err.code = err.errno = 'ENOENT';
    err.syscall = syscall + ' ' + command;

    return err;
}

function hookChildProcess(cp, parsed) {
    var originalEmit;

    if (!isWin) {
        return;
    }

    originalEmit = cp.emit;
    cp.emit = function (name, arg1) {
        var err;

        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See: https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            err = verifyENOENT(arg1, parsed, 'spawn');

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments);
    };
}

function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    // If we are in node 10, then we are using spawn-sync; if it exited
    // with -1 it probably means that the command does not exist
    if (isNode10 && status === -1) {
        parsed.file = isWin ? parsed.file : resolveCommand(parsed.original);

        if (!parsed.file) {
            return notFoundError(parsed.original, 'spawnSync');
        }
    }

    return null;
}

module.exports.hookChildProcess = hookChildProcess;
module.exports.verifyENOENT = verifyENOENT;
module.exports.verifyENOENTSync = verifyENOENTSync;
module.exports.notFoundError = notFoundError;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    if (process.platform !== 'win32') {
        return false;
    }
    var nodeVer = process.version.substr(1).split('.').map(function (num) {
        return parseInt(num, 10);
    });
    return nodeVer[0] === 0 && nodeVer[1] < 12;
}();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(0);
var LRU = __webpack_require__(8);
var resolveCommand = __webpack_require__(7);
var hasBrokenSpawn = __webpack_require__(28);

var isWin = process.platform === 'win32';
var shebangCache = new LRU({ max: 50, maxAge: 30 * 1000 }); // Cache just for 30sec

function readShebang(command) {
    var buffer;
    var fd;
    var match;
    var shebang;

    // Check if it is in the cache first
    if (shebangCache.has(command)) {
        return shebangCache.get(command);
    }

    // Read the first 150 bytes from the file
    buffer = new Buffer(150);

    try {
        fd = fs.openSync(command, 'r');
        fs.readSync(fd, buffer, 0, 150, 0);
        fs.closeSync(fd);
    } catch (e) {} /* empty */

    // Check if it is a shebang
    match = buffer.toString().trim().match(/#!(.+)/i);

    if (match) {
        shebang = match[1].replace(/\/usr\/bin\/env\s+/i, ''); // Remove /usr/bin/env
    }

    // Store the shebang in the cache
    shebangCache.set(command, shebang);

    return shebang;
}

function escapeArg(arg, quote) {
    // Convert to string
    arg = '' + arg;

    // If we are not going to quote the argument,
    // escape shell metacharacters, including double and single quotes:
    if (!quote) {
        arg = arg.replace(/([\(\)%!\^<>&|;,"'\s])/g, '^$1');
    } else {
        // Sequence of backslashes followed by a double quote:
        // double up all the backslashes and escape the double quote
        arg = arg.replace(/(\\*)"/g, '$1$1\\"');

        // Sequence of backslashes followed by the end of the string
        // (which will become a double quote later):
        // double up all the backslashes
        arg = arg.replace(/(\\*)$/, '$1$1');

        // All other backslashes occur literally

        // Quote the whole thing:
        arg = '"' + arg + '"';
    }

    return arg;
}

function escapeCommand(command) {
    // Do not escape if this command is not dangerous..
    // We do this so that commands like "echo" or "ifconfig" work
    // Quoting them, will make them unaccessible
    return (/^[a-z0-9_-]+$/i.test(command) ? command : escapeArg(command, true)
    );
}

function requiresShell(command) {
    return !/\.(?:com|exe)$/i.test(command);
}

function parse(command, args, options) {
    var shebang;
    var applyQuotes;
    var file;
    var original;
    var shell;

    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = options || {};
    original = command;

    if (isWin) {
        // Detect & add support for shebangs
        file = resolveCommand(command);
        file = file || resolveCommand(command, true);
        shebang = file && readShebang(file);
        shell = options.shell || hasBrokenSpawn;

        if (shebang) {
            args.unshift(file);
            command = shebang;
            shell = shell || requiresShell(resolveCommand(shebang) || resolveCommand(shebang, true));
        } else {
            shell = shell || requiresShell(file);
        }

        if (shell) {
            // Escape command & arguments
            applyQuotes = command !== 'echo'; // Do not quote arguments for the special "echo" command
            command = escapeCommand(command);
            args = args.map(function (arg) {
                return escapeArg(arg, applyQuotes);
            });

            // Use cmd.exe
            args = ['/s', '/c', '"' + command + (args.length ? ' ' + args.join(' ') : '') + '"'];
            command = process.env.comspec || 'cmd.exe';

            // Tell node's spawn that the arguments are already escaped
            options.windowsVerbatimArguments = true;
        }
    }

    return {
        command: command,
        args: args,
        options: options,
        file: file,
        original: original
    };
}

module.exports = parse;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.env.npm_package_name === 'pseudomap' && process.env.npm_lifecycle_script === 'test') process.env.TEST_PSEUDOMAP = 'true';

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map;
} else {
  module.exports = __webpack_require__(31);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = PseudoMap;

function PseudoMap(set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'");

  this.clear();

  if (set) {
    if (set instanceof PseudoMap || typeof Map === 'function' && set instanceof Map) set.forEach(function (value, key) {
      this.set(key, value);
    }, this);else if (Array.isArray(set)) set.forEach(function (kv) {
      this.set(kv[0], kv[1]);
    }, this);else throw new TypeError('invalid argument');
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size') fn.call(thisp, this._data[k].value, this._data[k].key);
  }, this);
};

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k);
};

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k);
  return res && res.value;
};

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v);
};

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k);
  if (res) {
    delete this._data[res._index];
    this._data.size--;
  }
};

PseudoMap.prototype.clear = function () {
  var data = Object.create(null);
  data.size = 0;

  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  });
};

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function get() {
    return this._data.size;
  },
  set: function set(n) {},
  enumerable: true,
  configurable: true
});

PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version');
};

// Either identical, or both NaN
function same(a, b) {
  return a === b || a !== a && b !== b;
}

function Entry(k, v, i) {
  this.key = k;
  this.value = v;
  this._index = i;
}

function find(data, k) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) return data[key];
  }
}

function set(data, k, v) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v;
      return;
    }
  }
  data.size++;
  data[key] = new Entry(k, v, key);
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Yallist;

Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;
  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }

  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }

  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) return undefined;

  var res = this.tail.value;
  this.tail = this.tail.prev;
  this.tail.next = null;
  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) return undefined;

  var res = this.head.value;
  this.head = this.head.next;
  this.head.prev = null;
  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isexe;
isexe.sync = sync;

var fs = __webpack_require__(0);

function isexe(path, _, cb) {
  fs.access(path, fs.X_OK, function (er) {
    cb(er, !er);
  });
}

function sync(path, _) {
  fs.accessSync(path, fs.X_OK);
  return true;
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(0);
var core;
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = __webpack_require__(36);
} else if (typeof fs.access === 'function') {
  core = __webpack_require__(33);
} else {
  core = __webpack_require__(35);
}

module.exports = isexe;
isexe.sync = sync;

function isexe(path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided');
    }

    return new Promise(function (resolve, reject) {
      isexe(path, options || {}, function (er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    });
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}

function sync(path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {});
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false;
    } else {
      throw er;
    }
  }
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isexe;
isexe.sync = sync;

var fs = __webpack_require__(0);

function isexe(path, options, cb) {
  fs.stat(path, function (er, st) {
    cb(er, er ? false : checkMode(st, options));
  });
}

function sync(path, options) {
  return checkMode(fs.statSync(path), options);
}

function checkMode(stat, options) {
  var mod = stat.mode;
  var uid = stat.uid;
  var gid = stat.gid;

  var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
  var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();

  var u = parseInt('100', 8);
  var g = parseInt('010', 8);
  var o = parseInt('001', 8);
  var ug = u | g;

  var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;

  return ret;
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isexe;
isexe.sync = sync;

var fs = __webpack_require__(0);

function checkPathExt(path, options) {
  var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;

  if (!pathext) {
    return true;
  }

  pathext = pathext.split(';');
  if (pathext.indexOf('') !== -1) {
    return true;
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase();
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true;
    }
  }
  return false;
}

function isexe(path, options, cb) {
  fs.stat(path, function (er, st) {
    cb(er, er ? false : checkPathExt(path, options));
  });
}

function sync(path, options) {
  fs.statSync(path);
  return checkPathExt(path, options);
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = which;
which.sync = whichSync;

var isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';

var path = __webpack_require__(2);
var COLON = isWindows ? ';' : ':';
var isexe = __webpack_require__(34);

function getNotFoundError(cmd) {
  var er = new Error('not found: ' + cmd);
  er.code = 'ENOENT';

  return er;
}

function getPathInfo(cmd, opt) {
  var colon = opt.colon || COLON;
  var pathEnv = opt.path || process.env.PATH || '';
  var pathExt = [''];

  pathEnv = pathEnv.split(colon);

  var pathExtExe = '';
  if (isWindows) {
    pathEnv.unshift(process.cwd());
    pathExtExe = opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM';
    pathExt = pathExtExe.split(colon);

    // Always test the cmd itself first.  isexe will check to make sure
    // it's found in the pathExt set.
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('');
  }

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  if (cmd.match(/\//) || isWindows && cmd.match(/\\/)) pathEnv = [''];

  return {
    env: pathEnv,
    ext: pathExt,
    extExe: pathExtExe
  };
}

function which(cmd, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }

  var info = getPathInfo(cmd, opt);
  var pathEnv = info.env;
  var pathExt = info.ext;
  var pathExtExe = info.extExe;
  var found = [];(function F(i, l) {
    if (i === l) {
      if (opt.all && found.length) return cb(null, found);else return cb(getNotFoundError(cmd));
    }

    var pathPart = pathEnv[i];
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);

    var p = path.join(pathPart, cmd);
    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p;
    }
    ;(function E(ii, ll) {
      if (ii === ll) return F(i + 1, l);
      var ext = pathExt[ii];
      isexe(p + ext, { pathExt: pathExtExe }, function (er, is) {
        if (!er && is) {
          if (opt.all) found.push(p + ext);else return cb(null, p + ext);
        }
        return E(ii + 1, ll);
      });
    })(0, pathExt.length);
  })(0, pathEnv.length);
}

function whichSync(cmd, opt) {
  opt = opt || {};

  var info = getPathInfo(cmd, opt);
  var pathEnv = info.env;
  var pathExt = info.ext;
  var pathExtExe = info.extExe;
  var found = [];

  for (var i = 0, l = pathEnv.length; i < l; i++) {
    var pathPart = pathEnv[i];
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);

    var p = path.join(pathPart, cmd);
    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p;
    }
    for (var j = 0, ll = pathExt.length; j < ll; j++) {
      var cur = p + pathExt[j];
      var is;
      try {
        is = isexe.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all) found.push(cur);else return cur;
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length) return found;

  throw getNotFoundError(cmd);
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(40);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {}
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var tty = __webpack_require__(50);
var util = __webpack_require__(4);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(38);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
  if (0 === debugColors.length) {
    return tty.isatty(fd);
  } else {
    return '0' !== debugColors && 'no' !== debugColors && 'false' !== debugColors && 'disabled' !== debugColors;
  }
}

/**
 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
 */

var inspect = 4 === util.inspect.length ?
// node <= 0.8.x
function (v, colors) {
  return util.inspect(v, void 0, void 0, colors);
} :
// node > 0.8.x
function (v, colors) {
  return util.inspect(v, { colors: colors });
};

exports.formatters.o = function (v) {
  return inspect(v, this.useColors).replace(/\s*\n\s*/g, ' ');
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;
  var name = this.namespace;

  if (useColors) {
    var c = this.color;

    args[0] = '  \x1B[3' + c + ';1m' + name + ' ' + '\x1B[0m' + args[0] + '\x1B[3' + c + 'm' + ' +' + exports.humanize(this.diff) + '\x1B[0m';
  } else {
    args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
  }
  return args;
}

/**
 * Invokes `console.error()` with the specified arguments.
 */

function log() {
  return stream.write(util.format.apply(this, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream(fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(0);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(49);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long ? long(val) : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(3).spawnSync || __webpack_require__(43);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.stringify = function stringify(o) {
  if (o && Buffer.isBuffer(o)) return JSON.stringify(':base64:' + o.toString('base64'));

  if (o && o.toJSON) o = o.toJSON();

  if (o && 'object' === (typeof o === 'undefined' ? 'undefined' : _typeof(o))) {
    var s = '';
    var array = Array.isArray(o);
    s = array ? '[' : '{';
    var first = true;

    for (var k in o) {
      var ignore = 'function' == typeof o[k] || !array && 'undefined' === typeof o[k];
      if (Object.hasOwnProperty.call(o, k) && !ignore) {
        if (!first) s += ',';
        first = false;
        if (array) {
          s += stringify(o[k]);
        } else if (o[k] !== void 0) {
          s += stringify(k) + ':' + stringify(o[k]);
        }
      }
    }

    s += array ? ']' : '}';

    return s;
  } else if ('string' === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ':' + o : o);
  } else if ('undefined' === typeof o) {
    return 'null';
  } else return JSON.stringify(o);
};

exports.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    if ('string' === typeof value) {
      if (/^:base64:/.test(value)) return new Buffer(value.substring(8), 'base64');else return (/^:/.test(value) ? value.substring(1) : value
      );
    }
    return value;
  });
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var path = __webpack_require__(2);
var fs = __webpack_require__(0);
var tmpdir = __webpack_require__(9).tmpdir || __webpack_require__(44).tmpdir;
var cp = __webpack_require__(3);
var sleep;
var JSON = __webpack_require__(42);
try {
  sleep = __webpack_require__(45);
} catch (ex) {
  console.warn('Native thread-sleep not available.');
  console.warn('This will result in much slower performance, but it will still work.');
  console.warn('You should re-install spawn-sync or upgrade to the lastest version of node if possible.');
  console.warn('Check ' + path.resolve(__dirname, '../error.log') + ' for more details');
  sleep = function sleep() {};
}

var temp = path.normalize(path.join(tmpdir(), 'spawn-sync'));

function randomFileName(name) {
  function randomHash(count) {
    if (count === 1) return parseInt(16 * Math.random(), 10).toString(16);else {
      var hash = '';
      for (var i = 0; i < count; i++) {
        hash += randomHash(1);
      }return hash;
    }
  }

  return temp + '_' + name + '_' + String(process.pid) + randomHash(20);
}
function unlink(filename) {
  try {
    fs.unlinkSync(filename);
  } catch (ex) {
    if (ex.code !== 'ENOENT') throw ex;
  }
}
function tryUnlink(filename) {
  // doesn't matter too much if we fail to delete temp files
  try {
    fs.unlinkSync(filename);
  } catch (e) {}
}

function invoke(cmd) {
  // location to keep flag for busy waiting fallback
  var finished = randomFileName("finished");
  unlink(finished);
  if (process.platform === 'win32') {
    cmd = cmd + '& echo "finished" > ' + finished;
  } else {
    cmd = cmd + '; echo "finished" > ' + finished;
  }
  cp.exec(cmd);

  while (!fs.existsSync(finished)) {
    // busy wait
    sleep(200);
  }

  tryUnlink(finished);

  return 0;
}

module.exports = spawnSyncFallback;
function spawnSyncFallback(cmd, commandArgs, options) {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  // node.js script to run the command
  var worker = path.normalize(__dirname + '/worker.js');
  // location to store arguments
  var input = randomFileName('input');
  var output = randomFileName('output');
  unlink(output);

  fs.writeFileSync(input, JSON.stringify(args));
  invoke('"' + process.execPath + '" "' + worker + '" "' + input + '" "' + output + '"');
  var res = JSON.parse(fs.readFileSync(output, 'utf8'));
  tryUnlink(input);tryUnlink(output);
  return res;
}
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var os = __webpack_require__(9);
var osShim;

'use strict';

// clone the 'os' module object to avoid mutations and unexpected behavior
module.exports = osShim = clone(os);

//
// apply the missing API
//

if (!os.tmpdir) {
  osShim.tmpdir = tmpdir;
}

if (!os.platform) {
  osShim.platform = platform;
}

if (!os.arch) {
  osShim.arch = arch;
}

if (!os.endianness) {
  osShim.endianness = endianness;
}

if (!os.EOL) {
  Object.defineProperty(osShim, 'EOL', {
    get: function get() {
      return process.platform === 'win32' ? '\n\r' : '\n';
    }
  });
}

function tmpdir() {
  var isWindows = process.platform === 'win32';
  var env = process.env;

  if (isWindows) {
    return env.TEMP || env.TMP || (env.SystemRoot || env.windir) + '\\temp';
  } else {
    return env.TMPDIR || env.TMP || env.TEMP || '/tmp';
  }
}

function platform() {
  return process.platform;
}

function arch() {
  return process.arch;
}

function endianness() {
  var isEndianness = new Uint32Array(new Uint8Array([1, 2, 3, 4]).buffer)[0] === 0x04030201;
  return isEndianness ? 'LE' : 'BE';
}

function clone(object) {
  var prop,
      cloneObj = {};
  for (prop in object) {
    if (object.hasOwnProperty(prop)) {
      cloneObj[prop] = object[prop];
    }
  }
  return cloneObj;
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
  module.exports = __webpack_require__(46);
  module.exports.native = true;
} catch (ex) {
  module.exports = function (milliseconds) {
    var start = Date.now();
    if (milliseconds !== (milliseconds | 0)) {
      throw new TypeError('sleep only accepts an integer number of milliseconds');
    }
    milliseconds = milliseconds | 0;
    if (milliseconds < 0) {
      throw new TypeError('sleep only accepts a positive number of milliseconds');
    }
    var end = Date.now();
    return end - start;
  };
  module.exports.native = false;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var childProcess = __webpack_require__(3);
var nodeBin = process.argv[0];

module.exports = sleep;
function sleep(milliseconds) {
  var start = Date.now();
  if (milliseconds !== Math.floor(milliseconds)) {
    throw new TypeError('sleep only accepts an integer number of milliseconds');
  } else if (milliseconds < 0) {
    throw new RangeError('sleep only accepts a positive number of milliseconds');
  } else if (milliseconds !== (milliseconds | 0)) {
    throw new RangeError('sleep duration out of range');
  }
  milliseconds = milliseconds | 0;

  var shouldEnd = start + milliseconds;
  childProcess.execFileSync(nodeBin, ['-e', 'setTimeout(function() {}, ' + shouldEnd + ' - Date.now());']);
  var end = Date.now();
  return end - start;
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
	"name": "gm",
	"description": "GraphicsMagick and ImageMagick for node.js",
	"version": "1.23.0",
	"author": {
		"name": "Aaron Heckmann",
		"email": "aaron.heckmann+github@gmail.com"
	},
	"keywords": [
		"graphics",
		"magick",
		"image",
		"graphicsmagick",
		"imagemagick",
		"gm",
		"convert",
		"identify",
		"compare"
	],
	"engines": {
		"node": ">= 0.10.0"
	},
	"bugs": {
		"url": "http://github.com/aheckmann/gm/issues"
	},
	"licenses": [
		{
			"type": "MIT",
			"url": "http://www.opensource.org/licenses/mit-license.php"
		}
	],
	"main": "./index",
	"scripts": {
		"test": "make test-unit; make test;"
	},
	"repository": {
		"type": "git",
		"url": "git+https://github.com/aheckmann/gm.git"
	},
	"license": "MIT",
	"devDependencies": {
		"gleak": "~0.5.0",
		"async": "~0.9.0"
	},
	"dependencies": {
		"array-parallel": "~0.1.3",
		"array-series": "~0.1.5",
		"cross-spawn": "^4.0.0",
		"debug": "~2.2.0"
	},
	"gitHead": "d650da6a1ca446c23641dba8d7e98c12e3f3b26c",
	"homepage": "https://github.com/aheckmann/gm",
	"_id": "gm@1.23.0",
	"_shasum": "80a2fe9cbf131515024846444658461269f52661",
	"_from": "gm@latest",
	"_npmVersion": "2.15.5",
	"_nodeVersion": "4.4.6",
	"_npmUser": {
		"name": "aaron",
		"email": "aaron.heckmann+github@gmail.com"
	},
	"maintainers": [
		{
			"name": "aaron",
			"email": "aaron.heckmann+github@gmail.com"
		},
		{
			"name": "jongleberry",
			"email": "me@jongleberry.com"
		},
		{
			"name": "rwky",
			"email": "admin@rwky.net"
		},
		{
			"name": "fragphace",
			"email": "fragphace@gmail.com"
		}
	],
	"dist": {
		"shasum": "80a2fe9cbf131515024846444658461269f52661",
		"tarball": "https://registry.npmjs.org/gm/-/gm-1.23.0.tgz"
	},
	"_npmOperationalInternal": {
		"host": "packages-16-east.internal.npmjs.com",
		"tmp": "tmp/gm-1.23.0.tgz_1470262815186_0.940796471433714"
	},
	"directories": {},
	"_resolved": "https://registry.npmjs.org/gm/-/gm-1.23.0.tgz",
	"readme": "ERROR: No README data found!"
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _gm = __webpack_require__(11);

var _gm2 = _interopRequireDefault(_gm);

var _electron = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImgCrop = function () {
    function ImgCrop(TagId) {
        _classCallCheck(this, ImgCrop);

        this.el_id = TagId;
        this.el = null;
        this.canvas = null;
        this.input_path = null;
        this.output_path = null;
        this.img_list = [];
        this.index = 0;
        this.staticRectWidth = 15;
        this.staticRectHeight = 40;
        this.rectWidth = this.staticRectWidth;
        this.rectHeight = this.staticRectHeight;
        this.rectScale = 1;
        this.rectInc = 1.05;
        this.rectDec = 0.95;
        this.pointX = 0;
        this.pointY = 0;
        this.canCrop = false;
        this.getElement();
    }

    _createClass(ImgCrop, [{
        key: "getElement",
        value: function getElement() {
            var _this = this;

            this.el = document.getElementById(this.el_id);
            this.canvas = document.getElementById("canvas");
            this.el.addEventListener("load", function () {
                _this.canvas.width = _this.el.clientWidth;
                _this.canvas.height = _this.el.clientHeight;
            });
            this.canvas.addEventListener("contextmenu", function (event) {
                var _ref = [_this.rectHeight, _this.rectWidth, _this.staticRectHeight, _this.staticRectWidth];
                _this.rectWidth = _ref[0];
                _this.rectHeight = _ref[1];
                _this.staticRectWidth = _ref[2];
                _this.staticRectHeight = _ref[3];

                _this.drawRect();
            });
            this.canvas.addEventListener("click", function (event) {
                _this.pointX = event.offsetX;
                _this.pointY = event.offsetY;
                _this.canCrop = true;
                _this.drawRect();
            });
        }
    }, {
        key: "getFiles",
        value: function getFiles() {
            var img_list = _fs2.default.readdirSync(this.input_path);
            this.img_list = img_list.filter(function (img) {
                if (img.match(/\.png|\.jpg$/)) {
                    return img;
                }
            });
            if (this.img_list.length != 0) {
                this.changeImg();
            } else {
                this.canCrop = false;
            }
        }
    }, {
        key: "jumpTo",
        value: function jumpTo() {
            var pic_id = document.getElementById("pic-id").value;
            if (pic_id > 0 && pic_id <= this.img_list.length) {
                this.index = pic_id - 1;
                this.changeImg();
            }
        }
    }, {
        key: "changeImg",
        value: function changeImg() {
            this.canCrop = false;
            this.el.src = _path2.default.join(this.input_path, this.img_list[this.index]);
            document.getElementById("pic-id").value = this.index + 1;
        }
    }, {
        key: "setInputPath",
        value: function setInputPath() {
            var receive = _electron.ipcRenderer.sendSync("select-input", null);
            if (receive) {
                this.input_path = receive;
                document.getElementById("input-path").innerHTML = this.input_path;
                this.getFiles();
            }
        }
    }, {
        key: "setOutputPath",
        value: function setOutputPath() {
            var receive = _electron.ipcRenderer.sendSync("select-output", null);
            if (receive) {
                this.output_path = receive;
                document.getElementById("output-path").innerHTML = this.output_path;
            }
        }
    }, {
        key: "drawRect",
        value: function drawRect() {
            var ctx = this.canvas.getContext("2d");
            var offsetX = this.pointX - this.rectWidth / 2;
            var offsetY = this.pointY - this.rectHeight / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#FF0000";

            if (offsetX < 0) {
                offsetX = 0;
            } else if (offsetX + this.rectWidth > this.el.clientWidth) {
                offsetX = this.el.clientWidth - this.rectWidth;
            }

            if (offsetY < 0) {
                offsetY = 0;
            } else if (offsetY + this.rectHeight > this.el.clientHeight) {
                offsetY = this.el.clientHeight - this.rectHeight;
            }
            ctx.strokeRect(offsetX, offsetY, this.rectWidth, this.rectHeight);
        }
    }, {
        key: "increase",
        value: function increase() {
            var tempRectScale = this.rectScale * this.rectInc;
            var isMaxWidth = this.staticRectWidth * tempRectScale > this.el.clientWidth;
            var isMaxHeight = this.staticRectHeight * tempRectScale > this.el.clientHeight;
            if (!isMaxWidth && !isMaxHeight) {
                this.rectScale *= this.rectInc;
                this.rectWidth = this.staticRectWidth * this.rectScale;
                this.rectHeight = this.staticRectHeight * this.rectScale;
                this.drawRect();
            }
        }
    }, {
        key: "decrease",
        value: function decrease() {
            this.rectScale *= this.rectDec;
            this.rectWidth = this.staticRectWidth * this.rectScale;
            this.rectHeight = this.staticRectHeight * this.rectScale;
            this.drawRect();
        }
    }, {
        key: "prev",
        value: function prev() {
            this.index = this.index - 1;
            if (this.index < 0) {
                this.index = this.img_list.length - 1;
            }
            this.changeImg();
        }
    }, {
        key: "next",
        value: function next() {
            this.index = this.index + 1;
            if (this.index > this.img_list.length - 1) {
                this.index = 0;
            }
            this.changeImg();
        }
    }, {
        key: "crop",
        value: function crop() {
            if (!this.canCrop || !this.input_path || !this.output_path) return false;
            var input = _path2.default.join(this.input_path, this.img_list[this.index]);
            var output = _path2.default.join(this.output_path, new Date().getTime().toString() + ".png" /*this.img_list[this.index]*/);
            var g = (0, _gm2.default)(input).crop(this.rectWidth, this.rectHeight, this.pointX - this.rectWidth / 2, this.pointY - this.rectHeight / 2).stream(function (err, stdout, stderr) {
                var writeStream = _fs2.default.createWriteStream(output, {
                    encoding: 'base64'
                });
                stdout.pipe(writeStream);
            });
        }
    }]);

    return ImgCrop;
}();

document.onmousedown = false;
var ImgCropObj = new ImgCrop("img");

module.exports = {
    input: function input() {
        return ImgCropObj.setInputPath();
    },
    output: function output() {
        return ImgCropObj.setOutputPath();
    },
    jump: function jump() {
        return ImgCropObj.jumpTo();
    },
    crop: function crop() {
        return ImgCropObj.crop();
    },
    increase: function increase() {
        return ImgCropObj.increase();
    },
    decrease: function decrease() {
        return ImgCropObj.decrease();
    },
    prev: function prev() {
        return ImgCropObj.prev();
    },
    next: function next() {
        return ImgCropObj.next();
    }
};

/***/ })
/******/ ]);