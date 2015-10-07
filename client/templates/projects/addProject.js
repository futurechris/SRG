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
			_public: event.target.projectpublic.value,
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
			if(typeof(event.target["feature"+featIdx]) !== "undefined")
			{
				featArr[featIdx] = event.target["feature"+featIdx].value;
				featIdx++;
			}
			else
			{
				found = false;
			}
		}

		newProject._features = featArr;

		Projects.insert(newProject);
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
	Session.setDefault("featurearrayLength", 3);
	Session.setDefault("descmarkdown","");
  this.$('.datepicker').datepicker();
}