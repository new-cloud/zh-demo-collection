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
  // const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  // const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  // const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
  // const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  // const startTagOpen = new RegExp(`^<${qnameCapture}`)
  // const startTagClose = /^\s*(\/?)>/
  // const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
  // const doctype = /^<!DOCTYPE [^>]+>/i
  function compileToFn(template) {
    console.log(template);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      this.$options = options;
      initState(this);

      if (options.el) {
        var el = isElementNode(options.el) ? options.el : document.querySelector(options.el);
        this.$mount(el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      var template = options.template;

      if (!template) {
        template = el.outerHTML;
      }

      console.log(template);
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
