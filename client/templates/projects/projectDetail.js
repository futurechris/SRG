Template.projectDetail.helpers({
	allowedToView: function(_public){
		return _public || Meteor.user();
	},

	existingfeaturearray: function(	){
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
	}
});

Template.projectDetail.events({
	"click .editProject": function(event, slug){
		event.preventDefault();
		Router.go('/projects/p/'+ $(event.currentTarget).data('slug') + '/edit');
	},
});

Template.projectDetail.onRendered(function(){
	Session.setDefault("editingLogEntries", []);
});



Template.logEntry.created = function(){
	this.testid = new Date();
	this.descmarkdown = new ReactiveVar("");
}

// Template.logEntry.rendered = function(){
// 	Session.setDefault("editdescmarkdown","");
// 	Session.set("editdescmarkdown","");
//   // this.$('.datepicker').datepicker();
// }

Template.logEntry.helpers({
	editingEntry: function(context){
		var editList = Session.get("editingLogEntries");

		if($.inArray(context._id, editList) != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	getDescriptionMarkdown: function(){
		return Template.instance().descmarkdown.get();
	},
});

Template.logEntry.events({
	"submit form": function(event, template){
		event.preventDefault();

		var activityid = event.target.activityid.value;

		// submit changes
		var modifier = {
			$set: {
				_date: 		(new Date(event.target.activitydate.value)).toISOString().slice(0,10), // nice-format date
				_summary: event.target.activitysummary.value,
				_desc: 		event.target.activitydesc.value
			}
		};

		ActivityLog.update({_id:activityid}, modifier);
		template.descmarkdown.set("");

		// remove this thing from the edit list
		var editList = Session.get("editingLogEntries");
		var editIdx = editList.indexOf(event.target.activityid.value);
		if(editIdx > -1)
		{
			editList.splice(editIdx, 1);
			Session.set("editingLogEntries", editList);
		}
	},

	"click .cancelEdit": function(event, template){
		event.preventDefault();

		// remove this from the edit list
		var editList = Session.get("editingLogEntries");
		var editIdx = editList.indexOf(event.target.value);
		if(editIdx > -1)
		{
			editList.splice(editIdx, 1);
			Session.set("editingLogEntries", editList);
		}
	},

	"click .editEntry": function(event, template){
		event.preventDefault();
		var editList = Session.get("editingLogEntries");
		if($.inArray(event.target.value, editList) == -1)
		{
			editList.push(event.target.value);
			Session.set("editingLogEntries", editList);
		}
	},

	"click .displayPreview": function(event, template){
		event.preventDefault();

		template.descmarkdown.set($(event.currentTarget).parent().parent().find('#activitydesc').val());
	},

});



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