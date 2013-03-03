/*global define */

define(['jquery'], function ($) {
  "use strict";

  var defaults = {
      twitterApiUrl: 'http://search.twitter.com/search.json'
    },
    /**
     * @constructor
     */
    twittsExplorer = function twittsExplorer() {
      this.index = 1;
      this.init();
    };

    /**
     * Initialize Twitts Explorer
     * @param  {object} options configuration options
     */
    twittsExplorer.prototype.init = function (options) {
      this.config = typeof options === 'object' ?
        $.extend({}, defaults, options) :
        $.extend({}, defaults);
    };

    /**
     * Get twitts by phrase
     * @param  {string} phrase phrase to look for
     * @param {function} callback
     * @return {jQuery Deferred}
     */
    twittsExplorer.prototype.getTwitts = function (phrase, callback) {
      var self = this,
        options = {
          phrase: phrase,
          page: 1,
          rpp: 10
        };

      this.askApi(options).then(function (results) {
        var twitts = [];

        for (var i = 0, j = results.length; i < j; i += 1) {
          twitts.push(self.mapTwitt(results[i], options.page - 1));
        }
        if (typeof callback === 'function') {
          callback(twitts);
        } else {
          return twitts;
        }
      });
    };

    twittsExplorer.prototype.askApi = function (options) {
      var dfd = $.Deferred();
      $.getJSON(this.config.twitterApiUrl + '?q=' + options.phrase + '&page=' + options.page + '&rpp=' + options.rpp + '&callback=?', function (result) {
        dfd.resolve(result.results);
        options.page += 1;
      });
      return dfd.promise();
    };

    twittsExplorer.prototype.mapTwitt = function (twitt, page) {
      var self = this;
      return {
        idx: page * 10 + self.index++,
        text: self.convertLinks(twitt.text),
        from: twitt.from_user_name,
        to: twitt.to_user_name
      }
    };

    twittsExplorer.prototype.convertLinks = function (text) {
      var re = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(re, function ($1, $2, $3) {
        return '<a href="' + $1 + '">' + $1 + '</a>';
      });
    };

  return twittsExplorer;
});