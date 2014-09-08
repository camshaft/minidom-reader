/**
 * Module dependencies
 */

var TAGS = require('minidom-tags');

module.exports = reader;

function reader(dom) {
  return dom.map(read);
}

function read(dom) {
  if (typeof dom === 'string') return {
    type: 'text',
    data: dom
  };

  if (dom[0] === 0) return {
    type: 'comment',
    data: dom[1]
  };

  if (dom.length === 0) return null;

  var attrs = toAttrObj(dom[0]);
  var typeof1 = typeof dom[1];
  var hasChildren = !(typeof1 === 'number' || typeof1 === 'string' || typeof1 === 'undefined');
  var tag = hasChildren ? dom[2] : dom[1];
  var children = (hasChildren ? dom[1] : []).map(read);

  return {
    type: 'tag',
    attrs: attrs,
    name: TAGS[tag] || tag || 'div',
    children: children
  };
}

function toAttrObj(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i+=2) {
    if (Array.isArray(arr[i])) obj['data-' + arr[i][0]] = arr[i+1];
    else obj[arr[i]] = arr[i+1];
  }
  return obj;
}
