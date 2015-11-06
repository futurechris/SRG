Template.projectDetail.helpers({
	allowedToView: function(_public){
		return _public || Meteor.user();
	},

	existingfeaturearray: function(	){
		if(typeof(context) !== "undefined"
			&& context != null)
		{
			return context._features;
		}

		return [];
	},

	projectActivity: function(context, count)
	{
		return ActivityLog.find({ _project:context._id }, {sort: [["_date", "desc"]], limit: count});
	}
});

Template.projectDetail.events({
	"click .editProject": function(event, slug){
		event.preventDefault();
		Router.go('/projects/p/'+ $(event.currentTarget).data('slug') + '/edit');
	},
});

Template.projectDetail.onRendered(function(){
	Session.setDefault("editingLogEntries", []);
});

Template.heatmap.created = function(){
	 var self = this;
	 self.calData = new Blaze.ReactiveVar(self.data.calData);
}

// this is a bit of a mess right now... Sigh.
Template.heatmap.rendered = function(){
	var self = this;

	self.autorun(function(){
		var subscriptionsReady = self.subscriptionsReady(); 

		if(subscriptionsReady)
		{
			var log = ActivityLog.find({ _project:self.data._id }, {sort: [["_date", "asc"]]});
			var logArray = log.fetch();

			var data = Template.currentData().calData;
			if(typeof(data) === "undefined")
			{
				data = {};
				self.calData.set(data);
			}

			// now iterate over log and transform it into the format CalHeatMap expects
			var i = 0;
			for(i=0; i<logArray.length; i++)
			{
				var dateSeconds = ""+(new Date(logArray[i]._date).valueOf()/1000);

				if(dateSeconds.length == 0)
				{
					continue;
				}

				if(typeof(data[dateSeconds]) === "undefined" )
				{
					data[dateSeconds] = 0;
				}

				data[dateSeconds]++;
			}

			self.calData.set(data);
			cal.update(data);
		}
	});
}

Template.logEntry.helpers({
	editingEntry: function(context){
		var editList = Session.get("editingLogEntries");

		if($.inArray(context._id, editList) != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	getDescriptionMarkdown: function(){
		return Session.get("descmarkdown");
	},
});

Template.logEntry.events({
	"submit form": function(event, template){
		event.preventDefault();

		var activityid = event.target.activityid.value;
		console.log(activityid);

		// submit changes
		var newActivity = {
			_project: event.target.projectid.value,
			_date: 		event.target.activitydate.value,
			_summary: event.target.activitysummary.value,
			_desc: 		event.target.activitydesc.value
		};

		var modifier = {
			$set: {
				_date: 	event.target.activitydate.value,
				_summary: event.target.activitysummary.value,
				_desc: 		event.target.activitydesc.value
			}
		};

		ActivityLog.update({_id:activityid}, modifier);
		Session.set("descmarkdown","");

		// remove this thing from the edit list
		var editList = Session.get("editingLogEntries");
		var editIdx = editList.indexOf(event.target.activityid.value);
		if(editIdx > -1)
		{
			editList.splice(editIdx, 1);
		}
		Session.set("editingLogEntries", editList);
	},

	"click .saveEdits": function(event, template){
		event.preventDefault();

		// remove this thing from the edit list
		var editList = Session.get("editingLogEntries");
		var editIdx = editList.indexOf(event.target.value);
		if(editIdx > -1)
		{
			editList.splice(editIdx, 1);
		}
		Session.set("editingLogEntries", editList);

		// submit changes
	},

	"click .cancelEdits": function(event, template){
		event.preventDefault();

		// remove this from the edit list
		var editList = Session.get("editingLogEntries");
		var editIdx = editList.indexOf(event.target.value);
		if(editIdx > -1)
		{
			editList.splice(editIdx, 1);
		}
		Session.set("editingLogEntries", editList);
	},

	"click .editEntry": function(event, template){
		event.preventDefault();
		var editList = Session.get("editingLogEntries");
		if($.inArray(event.target.value, editList) == -1)
		{
			editList.push(event.target.value);
		}

		Session.set("editingLogEntries", editList);
	},

	"click .displayPreview": function(event, template){
		event.preventDefault();
		console.log("CDP");
		console.log(template.$('#activitydesc'));
		console.log(template.$('#activitydesc').val());
		Session.set("descmarkdown", template.$('#activitydesc').val());
	},

});
Template.addLogEntry.helpers({
	getDescriptionMarkdown: function(){
		return Session.get("descmarkdown");
	},
});

Template.addLogEntry.events({
	"click .displayPreview": function(event, template){
		event.preventDefault();
		Session.set("descmarkdown", template.$('#activitydesc').val());
	},

	"submit form": function(event, template){
		event.preventDefault();

		var newActivity = {
			_project: event.target.projectid.value,
			_date: 		event.target.activitydate.value,
			_summary: event.target.activitysummary.value,
			_desc: 		event.target.activitydesc.value
		};

		ActivityLog.insert(newActivity);

		event.target.activitydate.value = "";
		event.target.activitysummary.value = "";
		event.target.activitydesc.value = "";
		Session.set("descmarkdown","");
	}
});

Template.addLogEntry.rendered = function(){
	Session.setDefault("descmarkdown","");
	Session.set("descmarkdown","");
  // this.$('.datepicker').datepicker();
}