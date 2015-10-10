Template.mostDevActivity.helpers({
	getMostActiveProject: function(){
		var proj = Projects.findOne({_public:true}, {sort: [["_name", "desc"]]});
		if(proj)
		{
			proj.headerIdx = "d";
		}
		
		return proj;
	}
})