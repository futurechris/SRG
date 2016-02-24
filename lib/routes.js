var documentTitleFix = function(append)
{
	var short = false;
	if(typeof(append) !== "undefined")
	{
		short = true;
	}

	if(short && typeof(Meteor.settings.public.siteShortTitle) !== "undefined")
	{
		document.title = Meteor.settings.public.siteShortTitle + " | " + append;
	}
	else if(typeof(Meteor.settings.public.siteTitle) !== "undefined")
	{
		document.title = Meteor.settings.public.siteTitle;
	}
}


Router.route('siteRoot',{
	path: '/',
	action: function(){
		if(this.ready()){
			this.layout('main');
			this.render('postfeed', {to: 'bodycontent'});
			// documentTitleFix here is actually in the postfeed.js onRendered callback. Ugh.
		}
	},
});

Router.route('projectsRoot',{
	path: '/projects',
	action: function(){
		if(this.ready())
		{	
			this.layout('main');
			this.render('projectList', {to: 'bodycontent'});
			this.render('addNewProjectBtnTemplate', {to: 'addNewProject'});
			documentTitleFix("All Projects");
		}
	}
});

Router.route('projectNew',
{
	path: '/projects/new',
	action: function(){
		if(this.ready()){
			if(Meteor.userId){
				this.layout('main');
				this.render('addProject', {to: 'bodycontent'});

				documentTitleFix("New Project");
			}
			else
			{
				Router.go('/projects');
			}
		}
	}
});

Router.route('projectDetail',
{
	path: '/projects/p/:slug',
	waitOn: function(){
		this.subscribe('projects');
	},
	data: function(){
		var proj = Projects.findOne({_slug:this.params.slug});
		this.state.set("route_projectData",proj);
		return proj;
	},
	action: function(){
		if(this.ready()){
			this.layout('main');
			this.render('projectDetail', {to: 'bodycontent'});

			var proj = this.state.get("route_projectData");
			if(proj != null && typeof(proj) !== "undefined")
			{
				documentTitleFix(proj._name);
			}
		}
	}
});

Router.route('activityProjectDate',
{
	path: '/projects/p/:slug/:date',
	waitOn: function(){
		this.subscribe('projects');
		this.subscribe('activitylog');
	},
	data: function(){
		var projID = Projects.findOne({_slug:this.params.slug});
		this.state.set("route_projectData",projID);
		if(projID != null && projID !== "undefined")
		{
			var activity = ActivityLog.findOne({_id:projID, _date:this.params.date});
			this.state.set("route_activity", activity);
			return activity;
		}
	},
	action: function(){
		if(this.ready()){
			this.layout('main');
			this.render('activityDetail', {to: 'bodycontent'});

			var proj = this.state.get("route_projectData");
			if(proj != null && typeof(proj) !== "undefined")	
			{
				var activity = this.state.get("route_activity");
				if(activity != null && typeof(activity) !== "undefined")
				{
					documentTitleFix(proj._name + " | "+activity._date);
				}
				else
				{
					documentTitleFix(proj._name);
				}
			}
		}
	}
});

Router.route('activityDetail',
{
	path: '/projects/p/:slug/:id',
	waitOn: function(){
		this.subscribe('projects');
		this.subscribe('activitylog');
	},
	data: function(){
		var proj = Projects.findOne({_slug:this.params.slug});
		this.state.set("route_projectData",proj);
		var activity = ActivityLog.findOne({_id:this.params.id});
		this.state.set("route_activity", activity);
		return activity;
	},
	action: function(){
		if(this.ready()){
			this.layout('main');
			this.render('activityDetail', {to: 'bodycontent'});

			var proj = this.state.get("route_projectData");
			if(proj != null && typeof(proj) !== "undefined")	
			{
				var activity = this.state.get("route_activity");
				if(activity != null && typeof(activity) !== "undefined")
				{
					documentTitleFix(proj._name + " | " + activity._date);
				}
				else
				{
					documentTitleFix(proj._name);
				}
			}
		}
	}
});

Router.route('projectEdit',
{
	path: '/projects/p/:slug/edit',
	waitOn: function(){
		this.subscribe('projects');
	},
	data: function(){
		var proj = Projects.findOne({_slug:this.params.slug});
		this.state.set("route_projectData",proj);
		return proj;
	},
	action: function(){
		if(this.ready()){
			this.layout('main');
			this.render('projectEdit', {to: 'bodycontent'});

			var proj = this.state.get("route_projectData");
			if(proj != null && typeof(proj) !== "undefined")
			{
				documentTitleFix(proj._name);
			}
		}
	}
});

