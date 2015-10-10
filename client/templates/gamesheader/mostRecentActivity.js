Template.mostRecentActivity.helpers({
	getMostRecentlyActiveProject: function(){
		var proj = Projects.findOne({_public:true}, {sort: [["_modifiedAt", "desc"]]});
		if(proj)
		{
			proj.headerIdx = "r";
		}
		return proj;
	}
})