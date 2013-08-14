// Generated by CoffeeScript 1.6.3
/*
© Copyright 2013 Stephan Jorek <stephan.jorek@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.
*/


(function() {
  var PropertyMap, RuleMap, camelize, exports, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RuleMap = require('./RuleMap').RuleMap;

  camelize = require('../Utility').Utility.camelize;

  exports = (_ref = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref : this;

  exports.PropertyMap = PropertyMap = (function(_super) {
    __extends(PropertyMap, _super);

    function PropertyMap() {
      _ref1 = PropertyMap.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    PropertyMap.prototype.normalizeKey = function(string) {
      return camelize(PropertyMap.__super__.normalizeKey.call(this, string));
    };

    return PropertyMap;

  })(RuleMap);

}).call(this);

/*
//@ sourceMappingURL=PropertyMap.map
*/