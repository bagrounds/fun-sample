;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')

  var tests = [
    [[0.5], true, 'boolean'],
    [[0.49], false, 'boolean'],
    [[['a', 'b', 'c'], 0.333], 'a', 'member'],
    [[['a', 'b', 'c'], 0.334], 'b', 'member'],
    [[['a', 'b', 'c'], 0.667], 'c', 'member'],
    [[0, 10, 0.51], 5, 'integer'],
    [[0, 10, 0.51], 5.1, 'number']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equalDeep,
      contra: object.get
    }))

  /* exports */
  module.exports = tests.map(funTest.sync)
})()

