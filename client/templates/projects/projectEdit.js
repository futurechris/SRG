Template.projectEdit.events({
		"click .displayPreview": function(event, template){
		event.preventDefault();
		Session.set("descmarkdown", template.$('#projectdesc').val());
	},
	"click .addLine": function(event){
		event.preventDefault();
		Session.set("featurearrayLength", Session.get("featurearrayLength")+1);
	},
	"submit form": function(event, template){
		event.preventDefault();

		var proj = Projects.findOne({_id:event.target.projectid.value});

		// this continues to feel like a janky way to iterate.
		var found = true;
		var featArr = proj._features;
		var featIdx = 0;
		while(found)
		{
			if(	typeof(event.target["feature"+featIdx]) !== "undefined"
						&&	 event.target["feature"+featIdx].value.length > 0)
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

		var modifier = {
			$set: {
				_name: event.target.projectname.value,
				_public: event.target.projectpublic.checked,
				_desc: event.target.projectdesc.value,
				_features: featArr,
				_modifiedAt: new Date()
			}
		};

		Projects.update({_id:proj._id}, modifier);
		Router.go('/projects/p/'+proj._slug);
	}
});

Template.projectEdit.helpers({
	existingfeaturearray: function(context){
		if(typeof(context) !== "undefined"
			&& context != null)
		{
			var count = Session.get("featurearrayLength");
			for(var i=context._features.length; i<count; i++)
			{
				context._features[i] = {
					_idx: i
				};
			}
			return context._features;
		}

		return featurearray();
	},

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

Template.projectEdit.rendered = function() {
	Session.setDefault("featurearrayLength", 3);
	Session.setDefault("descmarkdown","");
  this.$('.datepicker').datepicker();
}
