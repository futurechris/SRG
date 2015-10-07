Template.projectList.events({
	"click .addNewProject": function(event){
		event.preventDefault();
		Session.set("descmarkdown", "");
		Router.go('/projects/new');
	},
});

Template.projectList.helpers({
	getProjectList: function(user){
		var limitPreference = Session.get("projectListLimit");
		var sortPreference  = Session.get("projectListSort");

		if(user)
		{
			return Projects.find({}, {sort: sortPreference, limit: limitPreference})
		}
		else
		{
			return Projects.find({_public:true}, {sort: sortPreference, limit: limitPreference})
		}
		
	}
});