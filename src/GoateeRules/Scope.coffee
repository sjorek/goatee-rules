###
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
###

{Utility:{
  lib
}}            = require './Utility'
ScriptScope   = require(lib + 'Scope').Scope

#Expressions = require('./Expressions').OrderedAttributeExpressions
Expressions = require('./Expressions').OrderedPropertyExpressions
#Expressions = require('./Expressions').OrderedRuleExpressions

#Expressions = require('./Expressions').UnorderedAttributeExpressions
#Expressions = require('./Expressions').UnorderedPropertyExpressions
#Expressions = require('./Expressions').UnorderedRuleExpressions

exports = module?.exports ? this

##
# @namespace GoateeRules
exports.Scope = class Scope extends ScriptScope

  ##
  # Create a new **Expression** or **Expressions** instance
  #
  # @param  {String}      operator
  # @param  {Array}       parameters
  # @return {Expressions|Expression}
  create  : (operator, parameters) ->
    return @addRule new Expressions, parameters if operator is 'rules'
    super(operator, parameters)

  addRule: (rule, parameters) ->
    [key,expression,important] = parameters
    if expression.operator.name is 'list'
      expression = @create 'group', [expression]
    rule.add key, expression, important