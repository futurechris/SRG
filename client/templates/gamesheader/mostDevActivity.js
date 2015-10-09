Template.mostDevActivity.helpers({
	getMostActiveProject: function(){
		return Projects.findOne({_public:true}, {sort: [["_name", "desc"]]})
	}
})