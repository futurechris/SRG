Template.postfeed.onRendered(function(){
	if(typeof(Meteor.settings.public.siteTitle) !== "undefined")
	{
		document.title = Meteor.settings.public.siteTitle;
	}
});