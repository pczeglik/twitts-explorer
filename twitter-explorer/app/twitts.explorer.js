define(['jquery'], function ($) {
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
      this.config = $.extend({}, defaults, options);
    };

    /**
     * Get twitts by phrase
     * @param  {string} phrase phrase to look for
     * @return {jQuery Deferred}
     */
    twittsExplorer.prototype.getTwitts = function (phrase) {
      var dfd = $.Deferred();
      $.getJSON(this.config.twitterApiUrl + '?q='+ phrase + '&callback=?', function (result) {
        dfd.resolve(result.results);
      });
      return dfd.promise();
    };

  return twittsExplorer;
});