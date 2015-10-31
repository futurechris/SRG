Template.projectDetail.helpers({
	allowedToView: function(_public){
		return _public || Meteor.user();
	},

	existingfeaturearray: function(context){
		if(typeof(context) !== "undefined"
			&& context != null)
		{
			return context._features;
		}

		return [];
	},

	projectActivity: function(context, count)
	{
		return ActivityLog.find({ _project:context._id }, {sort: [["_date", "desc"]], limit: count});
	},
});

Template.projectDetail.events({
	"click .editProject": function(event, slug){
		event.preventDefault();
		Router.go('/projects/p/'+ $(event.currentTarget).data('slug') + '/edit');
	},
});

Template.projectDetail.rendered = function(){
}



Template.addLogEntry.helpers({
	getDescriptionMarkdown: function(){
		return Session.get("descmarkdown");
	},
});

Template.addLogEntry.events({
	"click .displayPreview": function(event, template){
		event.preventDefault();
		Session.set("descmarkdown", template.$('#activitydesc').val());
	},

	"submit form": function(event, template){
		event.preventDefault();

		var temp = "";

		var newActivity = {
			_project: event.target.projectid.value,
			_date: 		event.target.activitydate.value,
			_summary: event.target.activitysummary.value,
			_desc: 		event.target.activitydesc.value
		};

		ActivityLog.insert(newActivity);

		event.target.activitydate.value = "";
		event.target.activitysummary.value = "";
		event.target.activitydesc.value = "";
		Session.set("descmarkdown","");
	}
});

Template.addLogEntry.rendered = function(){
	Session.setDefault("descmarkdown","");
	Session.set("descmarkdown","");
  this.$('.datepicker').datepicker();
}