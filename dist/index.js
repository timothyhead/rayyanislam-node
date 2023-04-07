// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
const express = require('express');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>A JavaScript project</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>A JavaScript project</h1>
</body>
</html>`;
const app = express();
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(html);
});
module.exports = app;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _express = _interopRequireWildcard(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _http = _interopRequireDefault(require("http"));
var _formidable = _interopRequireDefault(require("formidable"));
var _fs = require("fs");
var _multer = _interopRequireWildcard(require("multer"));
var _stream = _interopRequireDefault(require("stream"));
var _path = _interopRequireWildcard(require("path"));
var _etag = _interopRequireDefault(require("etag"));
var _https = require("https");
var _url = require("url");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const app = require('./app');

//

// const app = express();

const port = '8080';
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use((0, _cors.default)(corsOptions));
;
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(_bodyParser.default.json({
  limit: '50mb'
}));
app.post("/storedMenu/", function (req, res, next) {
  var _req$body;
  console.log((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.menu, "ZXCVBNM");
  const menuJson = JSON.stringify(req.body.menu);
  (0, _fs.writeFile)("menu.json", menuJson, {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  }, function (err) {
    if (err) {
      return console.log(err, "error writing to storedMenu.json");
    }
    console.log("The storedMenu file was saved!");
  });
  res.redirect("/");
});
app.get("/loadMenu", function (req, res, next) {
  console.log("get");
  (0, _fs.readFile)('menu.json', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'json'
    });
    res.write(data);
    return res.end();
  });
});
app.get("/hello", function (req, res, next) {
  console.log("hello ok");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
},{"./app":"app.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map