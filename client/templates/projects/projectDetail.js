Template.projectDetail.helpers({
	allowedToView: function(_public){
		return _public || Meteor.user();
	}
});