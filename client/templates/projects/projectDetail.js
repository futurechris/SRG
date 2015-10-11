Template.projectDetail.helpers({
	allowedToView: function(_public){
		return _public || Meteor.user();
	}
});

Template.projectDetail.events({
		"click .editProject": function(event, slug){
		event.preventDefault();
		Router.go('/projects/p/'+ $(event.currentTarget).data('slug') + '/edit');
	},
});