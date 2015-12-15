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