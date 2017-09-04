/**
 *
 * @module fun-sample
 */
;(function () {
  'use strict'

  /* imports */
  var fn = require('fun-function')
  var object = require('fun-object')
  var guarded = require('guarded')
  var type = require('fun-type')
  var predicate = require('fun-predicate')
  var scalar = require('fun-scalar')

  var api = {
    boolean: boolean,
    integer: integer,
    number: number,
    member: member
  }

  var isBetween0And1 = predicate.and(scalar.gte(0), scalar.lt(1))
  var isProbability = predicate.and(type.isNumber, isBetween0And1)

  var guards = {
    boolean: guarded(type.isTuple([isProbability]), type.isBoolean),
    integer: guarded(
      type.isTuple([type.isNumber, type.isNumber, isProbability]),
      type.isNumber
    ),
    number: guarded(
      type.isTuple([type.isNumber, type.isNumber, isProbability]),
      type.isNumber
    ),
    member: guarded(
      type.isTuple([type.isArray, isProbability]),
      type.any
    )
  }

  /* exports */
  module.exports = object.map(fn.curry, object.ap(guards, api))

  /**
   *
   * @function module:fun-sample.boolean
   *
   * @param {Number} p - number on interval [0, 1)
   *
   * @return {Boolean} true or false
   */
  function boolean (p) {
    return member([false, true], p)
  }

  /**
   *
   * @function module:fun-sample.integer
   *
   * @param {Number} min - lower bound
   * @param {Number} max - upper bound
   * @param {Number} p - number between 0 and 1
   *
   * @return {Number} between to and from
   */
  function integer (min, max, p) {
    return Math.floor((max - min + 1) * p + min)
  }

  /**
   *
   * @function module:fun-sample.member
   *
   * @param {Array} set - to pick from
   * @param {Number} p - number between 0 and 1
   *
   * @return {*} an element of set
   */
  function member (set, p) {
    return set[integer(0, set.length - 1, p)]
  }

  /**
   *
   * @function module:fun-sample.number
   *
   * @param {Number} min - lower bound
   * @param {Number} max - upper bound
   * @param {Number} p - number between 0 and 1
   *
   * @return {Number} between to and from
   */
  function number (min, max, p) {
    return ((max - min) * p) + min
  }
})()

