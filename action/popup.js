document.querySelector('button[name="button"]').addEventListener('click',log);

function log(e){
  var client_id = 'e031576be7cdcfa333ef';
  var redirectUri = chrome.identity.getRedirectURL("action/popup.html");
  var auth_url = [
    "https://github.com/login/oauth/authorize?",
    "client_id=", client_id,
    "&redirect_uri=", redirectUri,
    "&scope=", 'repo',
    "&state=", "unguessablestring"
  ].join('');
  chrome.identity.launchWebAuthFlow({
      url: auth_url,
      interactive: true
    }, function(responseUrl) {
      console.log(responseUrl);
    });

}
