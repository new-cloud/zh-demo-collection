(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  } //判断传入的el 是否是一个元素节点

  function isElementNode(node) {
    return node.nodeType === 1;
  }

  // 重写 数组的方法
  var oldArrF = Array.prototype;
  var newArrF = Object.create(oldArrF);
  var F = ['push', 'shift'];
  F.forEach(function (key) {
    newArrF[key] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (key === 'push') {
        console.log('调用了psuh'); //防止添加的属性是一个对象

        this.__ob__.walk(args[0]);
      } // 依次对其他方法进行重写


      oldArrF[key].apply(this, args);
    };
  });

  var Hijack = /*#__PURE__*/function () {
    //数据劫持
    function Hijack(data) {
      _classCallCheck(this, Hijack);

      if (!isObject(data)) throw new TypeError("data 的值必须是一个对象!");
      this.walk(data);
    }

    _createClass(Hijack, [{
      key: "walk",
      value: function walk(data) {
        var _this2 = this;

        //区分数组和对象
        if (Array.isArray(data)) {
          //将walk传给数组，等数组push... 可能会调用
          data.__ob__ = this; // 重写数组的 push shift unshift ....

          data.__proto__ = newArrF;
          data.forEach(function (item) {
            _this2.walk(item);
          });
        } else {
          //如果是对象才观察
          if (data && _typeof(data) == 'object') {
            for (var key in data) {
              this.defineRecative(data, key, data[key]);
            }
          }
        }
      }
    }, {
      key: "defineRecative",
      value: function defineRecative(data, key, value) {
        var _this3 = this;


        this.walk(value); // let dep = new Beobserver();
        //观察对象属性

        Object.defineProperty(data, key, {
          get: function get() {
            // Beobserver.target && dep.subscribe(Beobserver.target);
            return value;
          },
          set: function set(newVal) {
            if (value != newVal) {
              //防止修改的值 是一个新对象
              _this3.walk(newVal);

              value = newVal; // dep.release();
            }
          }
        });
      }
    }]);

    return Hijack;
  }();

  function initState(vm) {
    var opts = vm.$options; // 区分vue的数据来源 

    if (opts.prpos) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.methods) ;

    if (opts.computed) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm.$data = typeof data === 'function' ? data.call(vm) : data;
    new Hijack(data);
  }

  // Regular Expressions for parsing tags and attributes
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));

  function start(tagName, attrs) {
    console.log('开始标签:', tagName);
    console.log('属性:', attrs);
  }

  function end(tagName) {
    console.log('结束标签:', tagName);
  }

  function parseHTML(html) {
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);
      var match;

      if (start) {
        match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);
      }

      var end, attr;

      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
      } // console.log(html)
      // console.log(match)


      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  function compileToFn(template) {
    var root = parseHTML(template);
    return function render() {};
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(vm, expr, cd) {
      _classCallCheck(this, Observer);

      this.vm = vm;
      this.expr = expr;
      this.cd = cd;
      this.oldValue = this.get();
    }

    _createClass(Observer, [{
      key: "get",
      value: function get() {
        var value = CompileUtils.getExpr(this.vm, this.expr);
        return value;
      }
    }, {
      key: "update",
      value: function update() {
        var newVal = CompileUtils.getExpr(this.vm, this.expr);

        if (newVal != this.oldValue) {
          this.cd(newVal);
        }
      }
    }]);

    return Observer;
  }();

  var CompileUtils = {
    getExpr: function getExpr(vm, expr) {
      return expr.split('.').reduce(function (data, key) {
        return data[key];
      }, vm.$data);
    },
    setVal: function setVal(vm, expr, value) {
      expr.split('.').reduce(function (data, key, index, arr) {
        if (index === arr.length - 1) {
          data[key] = value;
        }

        return data[key];
      }, vm.$data);
    },
    model: function model(node, expr, vm) {
      var _this = this;

      var fn = this.updater.modelUpdater;
      new Observer(vm, expr, function (newVal) {
        fn(node, newVal);
      });
      node.addEventListener('input', function (e) {
        var value = e.target.value;

        _this.setVal(vm, expr, value);
      });
      var value = this.getExpr(vm, expr);
      fn(node, value);
    },
    on: function on(node, expr, vm, eventName) {
      node.addEventListener(eventName, function (e) {
        vm[expr].call(vm, e);
      });
    },
    html: function html() {},
    //...
    getContentVal: function getContentVal(vm, expr) {
      var _this2 = this;

      return expr.replace(/\{\{(.+?)\}\}/g, function () {
        return _this2.getExpr(vm, arguments.length <= 1 ? undefined : arguments[1]);
      });
    },
    text: function text(node, content, vm) {
      var _this3 = this;

      var fn = this.updater.textUpdater;
      var value = content.replace(/\{\{(.+?)\}\}/g, function () {
        new Observer(vm, arguments.length <= 1 ? undefined : arguments[1], function () {
          var vlaue2 = _this3.getContentVal(vm, content);

          fn(node, vlaue2);
        });
        return _this3.getExpr(vm, arguments.length <= 1 ? undefined : arguments[1]);
      });
      fn(node, value);
    },
    updater: {
      modelUpdater: function modelUpdater(node, value) {
        node.value = value;
      },
      htmlUpdater: function htmlUpdater() {},
      textUpdater: function textUpdater(node, value) {
        node.textContent = value;
      } //...

    }
  };

  var Compiler = /*#__PURE__*/function () {
    function Compiler(el, vm) {
      _classCallCheck(this, Compiler);

      this.vm = vm;
      var fragment = this.nodeFragment(el); //编译模板

      this.compile(fragment); // this.el.appendChild(fragment);
    }

    _createClass(Compiler, [{
      key: "isElementNode",
      value: function isElementNode(node) {
        //判断传入的el 是否是一个元素节点
        return node.nodeType === 1;
      }
    }, {
      key: "nodeFragment",
      value: function nodeFragment(node) {
        var fragment = document.createDocumentFragment();

        var nodearr = _toConsumableArray(node.children);

        for (var i in nodearr) {
          fragment.appendChild(nodearr[i]);
        }

        return fragment;
      }
    }, {
      key: "compile",
      value: function compile(template) {
        var _this = this;

        //编译文档片段中的dom节点
        var childNodes = template.childNodes;

        _toConsumableArray(childNodes).forEach(function (item) {
          if (_this.isElementNode(item)) {
            _this.compileElement(item); //如果是元素的 把自己传进去 遍历子节点


            _this.compile(item);
          } else {
            _this.compileText(item);
          }
        });
      }
    }, {
      key: "isDirective",
      value: function isDirective(attr) {
        //查看属性名 是否以 v- 开头
        return attr.startsWith('v-');
      } //编译元素

    }, {
      key: "compileElement",
      value: function compileElement(node) {
        var _this2 = this;

        var attrs = node.attributes;

        _toConsumableArray(attrs).forEach(function (item) {
          var name = item.name,
              expr = item.value;

          if (_this2.isDirective(name)) {
            //v-model v-html v-if
            var _name$split = name.split('-'),
                _name$split2 = _slicedToArray(_name$split, 2),
                dirctive = _name$split2[1];

            var _dirctive$split = dirctive.split(':'),
                _dirctive$split2 = _slicedToArray(_dirctive$split, 2),
                dirctiveName = _dirctive$split2[0],
                eventName = _dirctive$split2[1]; //根据传入的不同指令执行不同的方法


            CompileUtils[dirctiveName](node, expr, _this2.vm, eventName);
          }
        });
      } //编译文本

    }, {
      key: "compileText",
      value: function compileText(node) {
        var content = node.textContent; //如果文本内容是{{}}

        if (/\{\{(.+?)}\}/.test(content)) {
          CompileUtils.text(node, content, this.vm);
        }
      }
    }]);

    return Compiler;
  }();

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      this.$options = options;
      initState(this);

      if (options.el) {
        var el = isElementNode(options.el) ? options.el : document.querySelector(options.el); // this.$mount(el);

        new Compiler(el, this);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      var template = options.template;

      if (!template) {
        template = el.outerHTML;
      }

      var render = compileToFn(template);
    };
  }

  function Vue(options) {
    // console.log(options);
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
