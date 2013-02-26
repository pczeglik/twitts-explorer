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
      var self = this;
      this.askApi(phrase).then(function (results) {
        var twitts = [];

        for (var i = 0, j = results.length; i < j; i += 1) {
          twitts.push(self.mapTwitt(results[i]));
        }
        if (typeof callback === 'function') {
          callback(twitts);
        } else {
          return twitts;
        }
      });
    };

    twittsExplorer.prototype.askApi = function (phrase) {
      var dfd = $.Deferred();
      $.getJSON(this.config.twitterApiUrl + '?q=' + phrase + '&callback=?', function (result) {
        dfd.resolve(result.results);
      });
      return dfd.promise();
    };

    twittsExplorer.prototype.mapTwitt = function (twitt) {
      return {
        text: twitt.text,
        from: twitt.from_user_name,
        to: twitt.to_user_name
      }
    };

  return twittsExplorer;
});