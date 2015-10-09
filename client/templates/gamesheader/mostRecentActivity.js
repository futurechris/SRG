Template.mostRecentActivity.helpers({
	getMostRecentlyActiveProject: function(){
		return Projects.findOne({_public:true}, {sort: [["_modifiedAt", "desc"]]})
	}
})