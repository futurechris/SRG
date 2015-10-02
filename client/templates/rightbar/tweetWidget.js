Template.tweetWidget.helpers({
	getSidebarTwitterTemplate: function(){
		if(typeof(Template.tweetWidgetTemplate) !== "undefined")
		{
			return Template.tweetWidgetTemplate;
		}
		return "";
	}
});