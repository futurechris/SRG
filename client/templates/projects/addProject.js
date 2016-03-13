Template.addProject.events({
	"click .addLine": function(event){
		event.preventDefault();
		Session.set("featurearrayLength", Session.get("featurearrayLength")+1);
	},

	"click .displayPreview": function(event, template){
		event.preventDefault();
		Session.set("descmarkdown", template.$('#projectdesc').val());
	},

	"submit form": function(event, template){
		event.preventDefault();

		var newProject = {
			_name: event.target.projectname.value,
			_public: event.target.projectpublic.checked,
			_slug: event.target.projectslug.value,
			_tags: event.target.projecttags.value,
			_desc: event.target.projectdesc.value,
			_start: event.target.projectstart.value,
			_createdAt: new Date(),
			_modifiedAt: new Date()
		}

		var found = true;
		var featArr = [];
		var featIdx = 0;
		while(found)
		{
			if(			typeof(event.target["feature"+featIdx]) !== "undefined"
					&&	event.target["feature"+featIdx].value.length > 0)
			{
				featArr[featIdx] = 
					{
						_idx: featIdx,
						_feat: event.target["feature"+featIdx].value
					}
			}
			else
			{
				found = false;
			}
			featIdx++;
		}
		newProject._features = featArr;

		var projectid = Projects.insert(newProject);


		// and now, glue in a log entry commemorating the creation of the project
		var newActivity = {
			_project: projectid,
			_date: 		(new Date()).toISOString().slice(0,10), // nice-format date
			_summary: "Website presence established",
			_desc: 		"On this date, this project was created here on this site. How exciting!"
		};

		ActivityLog.insert(newActivity);

		// finally, go somewhere else.
		Router.go('/projects');
	}
});

Template.addProject.helpers({
	featurearray: function(){
		var arr = [];
		// TODO: switch to Session.equals()?
		var count = Session.get("featurearrayLength");
		for(var i=0; i<count; i++)
		{
			arr[i] = {
				_idx: i
			};
		}
		return arr;
	},

	getDescriptionMarkdown: function(){
		return Session.get("descmarkdown");
	}
});

Template.addProject.rendered = function() {
	Session.set("featurearrayLength", 3);
	Session.set("descmarkdown","");
  this.$('.datepicker').datepicker();
}