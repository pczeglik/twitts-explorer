require.config({
  baseUrl: '../twitter-explorer/',
  paths: {
    'jquery': 'lib/jquery'
  }
});

define(['app/twitts.explorer'], function (TwittsExplorer) {
  var tw = new TwittsExplorer();

  $('#search-submit').on('click', function () {
    var phrase = $('#search-phrase').val();
    tw.getTwitts(phrase).then(function (results) {
      console.log(results);
    });
  });
});