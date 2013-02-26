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

  $searchSubmit.on('click', function () {
    var phrase = $searchInput.val();
    if (phrase && phrase !== '') {
      tw.getTwitts(phrase, function (twitts) {
        var template = Handlebars.compile($template.html()),
          html = template({'twitts': twitts});
        $twitts.append(html);
      });
    } else {
      $searchInput.addClass('error').focus();
    }
  });
});