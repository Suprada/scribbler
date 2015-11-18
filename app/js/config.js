define([], function() {
  var config = {};
  // Your Client ID can be retrieved from your project in the Google
  // Developer Console, https://console.developers.google.com
  config.apiKey = 'AIzaSyCDndBMLxG8eAt7s_q1mMyin44YFCsvjLo';

  // *** For Tasks API
  config.scopes = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile';

  // *** For Drive API
  //config.scopes = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile'; //all files all access

  //also look into https://www.googleapis.com/auth/drive.file
  // Per-file access to files created or opened by the app
  config.clientId = '851761292212-qsae0jig0gl9ur71s3cb56ujhjjr4p1q.apps.googleusercontent.com';
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  return config;
});
