/* ^
BSD 3-Clause License

Copyright (c) 2017, Stephan Jorek
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
    var PropertyMap, RuleMap, camelize,
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    RuleMap = require('./RuleMap');

    camelize = require('../Utility').camelize;


    /*
     * # PropertyMaps …
     * -----------------
     *
     * … look like “propertyId: expression; anotherProp: value”. They
     * provide a implementation of ordered `RuleMap`s having its keys
     * normalized to camel-case.
     */


    /**
     * -------------
     * @class PropertyMap
     * @namespace GoateeRules.Ordered
     */

    PropertyMap = (function(superClass) {
        extend(PropertyMap, superClass);

        function PropertyMap() {
            return PropertyMap.__super__.constructor.apply(this, arguments);
        }


        /**
         * -------------
         * @method normalizeKey
         * @param  {String} string
         * @return {String}
         */

        PropertyMap.prototype.normalizeKey = function(string) {
            return camelize(PropertyMap.__super__.normalizeKey.call(this, string));
        };

        return PropertyMap;

    })(RuleMap);

    module.exports = PropertyMap;

}).call(this);
//# sourceMappingURL=PropertyMap.js.map
