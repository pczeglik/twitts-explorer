require.config({
  baseUrl: '../twitter-explorer/',
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'handlebars': 'lib/handlebars'
  }
});

define(['app/twitts.explorer', 'handlebars'], function (TwittsExplorer, Handlebars) {
  var tw = new TwittsExplorer(),
    $searchInput = $('#search-phrase'),
    $searchSubmit = $('#search-submit'),
    $twitts = $('.twitts'),
    $template = $('#twitts');

  var doSearch = function doSearch(phrase) {
    if (phrase && phrase !== '') {
      tw.getTwitts(phrase, function (twitts) {
        var template = Handlebars.compile($template.html(), {noEscape: true}),
          html = template({'twitts': twitts});
        $twitts.append(html);
      });
    } else {
      $searchInput.addClass('error').focus();
    }
  };

  $searchSubmit.on('click', function () {
    doSearch($searchInput.val());
  });

  $searchInput.on('keypress', function (e) {
    if (e.which === 13) {
      doSearch($searchInput.val());
    }
  });

});