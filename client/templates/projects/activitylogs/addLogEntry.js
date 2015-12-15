Template.addLogEntry.helpers({
	getDescriptionMarkdown: function(){
		return Template.instance().descmarkdown.get();
	},
});

Template.addLogEntry.events({
	"click .displayPreview": function(event, template){
		event.preventDefault();

		template.descmarkdown.set($(event.currentTarget).parent().parent().find('#activitydesc').val());
	},

	"submit form": function(event, template){
		event.preventDefault();
		
		var newActivity = {
			_project: event.target.projectid.value,
			_date: 		(new Date(event.target.activitydate.value)).toISOString().slice(0,10), // nice-format date
			_summary: event.target.activitysummary.value,
			_desc: 		event.target.activitydesc.value
		};

		ActivityLog.insert(newActivity);

		event.target.activitydate.value = "";
		event.target.activitysummary.value = "";
		event.target.activitydesc.value = "";
		template.descmarkdown.set("");
	}
});

Template.addLogEntry.created = function(){
	this.testid = new Date();
	this.descmarkdown = new ReactiveVar("");
}