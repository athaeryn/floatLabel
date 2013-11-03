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
      this.labelStr = this._findLabelStr();
      this.effect = this._findEffect();
      this.namespace = options.namespace || 'fly';
      // Do things
      this.label = this._createLabel(this._createLabelStr());
      this._bindEvents();
    }

    _FlyLabel.prototype = {
      _findInput: function () {
        return $(this.el).find('input, textarea');
      },
      _findLabelStr: function() {
        return this.input.data('label');
      },
      _findEffect: function() {
        return this.input.data('effect');
      },
      _createLabelStr : function() {
        var effectLabelStr = ''; 
        for(var i=0; i < this.labelStr.length; i++){

          if(i%2 == 0){
            var order ="even";
          }else{
            var order ="odd";
          }

          if(this.labelStr.substr(i, 1) == ' '){
            this.labelStr.substr(i, 1).replace(/ /g,'\u00a0');
            // i+=6;
          }
        
          if(i == 0){
            effectLabelStr += '<span class="'+order+' first">' + this.labelStr.substr(i, 1)+'</span>';
          }else if(i+1 == this.labelStr.length){
            effectLabelStr += '<span class="'+order+' last">' + this.labelStr.substr(i, 1) + '</span>';
          }else{
            effectLabelStr += '<span class="'+order+'">' + this.labelStr.substr(i, 1)+'</span>';
          }

        }

        return effectLabelStr;
      },
      _createLabel: function (effectLabelStr) {
        console.log(effectLabelStr);
        var label = $('<label for="'+this.input.attr('name')+'" class="'+this.namespace+'__label '+this.namespace+'__label--'+this.effect+'">'+effectLabelStr+'</label>')
        this.input.before(label);
        return label;
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

