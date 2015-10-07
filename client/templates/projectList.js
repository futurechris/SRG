Template.projectList.events({
	"click .addNewProject": function(event){
		event.preventDefault();
		Session.set("descmarkdown", "");
		Router.go('/projects/new');
	},
});

Template.projectList.helpers({
	getProjectList: function(){
		var limitPreference = Session.get("projectListLimit");
		var sortPreference  = Session.get("projectListSort");
		return Projects.find({}, {sort: sortPreference, limit: limitPreference})
	}
});