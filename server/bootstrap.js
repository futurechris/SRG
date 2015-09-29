Meteor.startup(function () {
    // code to run on server at startup
    initializeTwitterFeed();
});

function initializeTwitterFeed()
{
	if(typeof(Meteor.settings.twit_keys) !== "undefined")
	{
		var Twit = Meteor.npmRequire('twit');

		Meteor.Twit = new Twit({
		    consumer_key:         Meteor.settings.twit_keys.tw_consumer_key,
		    consumer_secret:      Meteor.settings.twit_keys.tw_consumer_secret,
		    access_token:         Meteor.settings.twit_keys.tw_access_token,
		    access_token_secret:  Meteor.settings.twit_keys.tw_access_token_secret
		});
	}
}