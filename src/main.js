/*jslint browser: true, nomen: true, white: true */
/*globals jQuery */

(function ($) {
  "use strict";
  var FlyLabel;

  FlyLabel = (function () {
    function _FlyLabel(el, options) {
      // Set things
      this.el = el;
      this.options = options;
      this.input = this._findInput();
      this.label = this._findLabel();
      this.namespace = options.namespace || 'fly';
      // Do things
      this._bindEvents();
    }

    _FlyLabel.prototype = {
      _findInput: function () {
        return $(this.el).find('input, textarea');
      },
      _findLabel: function () {
        return $(this.el).find('label');
      },
      _bindEvents: function () {
        this.input.on('keyup', $.proxy(this._onKeyUp, this));
        this.input.on('blur', $.proxy(this._onBlur, this));
        this.input.on('focus', $.proxy(this._onFocus, this));
      },
      _onKeyUp: function () {
        if (this.input.val() === '') {
          this.label.removeClass(this.namespace + '__label--active');
        } else {
          this.label.addClass(this.namespace + '__label--active');
        }
        return false; // Don't bubble
      },
      _onFocus: function () {
        this.label.addClass(this.namespace + '__label--focus');
        this._onKeyUp();
        return false; // Don't bubble
      },
      _onBlur: function () {
        this.label.removeClass(this.namespace + '__label--focus');
        this._onKeyUp();
        return false; // Don't bubble
      }
    };
    return _FlyLabel;
  }());

  $.fn.flyLabels = function (options) {
    options = options || {};
    options.namespace = options.namespace || 'fly';
    this.find('.' + options.namespace + '__group').each(function () {
      return new FlyLabel(this, options);
    });
  };

}(window.jQuery || window.$));
