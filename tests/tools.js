/*jslint node: true */
module.exports = {
  getRequest: function (request, proxy, url) {
    "use strict";
    if (proxy === '') {
      return request.get(url);
    }
    return request.get(url).proxy(proxy);
  }
};
