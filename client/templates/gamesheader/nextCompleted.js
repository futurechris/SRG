Template.nextCompleted.helpers({
	getNextCompletedProject: function(){
		var proj = Projects.findOne({_public:true}, {sort: [["_start", "desc"]]});
		if(proj)
		{
			proj.headerIdx = "c";
		}
		return proj;
	}
})