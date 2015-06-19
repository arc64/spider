(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('d3'), require('jquery'));
  } else {
    root.spider = factory(root.d3, root.jQuery);
  }
}(this, function(d3, $) {
window.MG = {version: '2.5.0'};

return spider;
}));
