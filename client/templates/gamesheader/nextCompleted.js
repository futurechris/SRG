Template.nextCompleted.helpers({
	getNextCompletedProject: function(){
		return Projects.findOne({_public:true}, {sort: [["_start", "asc"]]})
	}
})