Router.map(function(){
	this.route('siteRoot',{
		path: '/',
		action: function(){
			if(this.ready()){
				this.layout('main');
				this.render('postfeed', {to: 'bodycontent'});
			}
		},
	});
	this.route('projectsRoot',{
		path: '/projects',
		action: function(){
			if(this.ready())
			{	
				this.layout('main');
				this.render('projectList', {to: 'bodycontent'});
				this.render('addNewProjectBtnTemplate', {to: 'addNewProject'});
			}
		}
	});
	this.route('projectNew',
	{
		path: '/projects/new',
		action: function(){
			if(this.ready()){
				if(Meteor.userId){
					this.layout('main');
					this.render('addProject', {to: 'bodycontent'});
				}
				else
				{
					Router.go('/projects');
				}
			}
		}
	});
	this.route('projectDetail',
	{
		path: '/projects/p/:slug',
		waitOn: function(){
			this.subscribe('projects');
		},
		data: function(){
			return Projects.findOne({_slug:this.params.slug});
		},
		action: function(){
			if(this.ready()){
				this.layout('main');
				this.render('projectDetail', {to: 'bodycontent'});
			}
		}
	});
	this.route('activityProjectDate',
	{
		path: '/projects/p/:slug/:date',
		waitOn: function(){
			this.subscribe('projects');
			this.subscribe('activitylog');
		},
		data: function(){
			var projID = Projects.findOne({_slug:this.params.slug});
			if(projID != null && projID !== "undefined")
			{
				return ActivityLog.findOne({_id:projID, _date:this.params.date});
			}
		},
		action: function(){
			if(this.ready()){
				this.layout('main');
				this.render('activityDetail', {to: 'bodycontent'});
			}
		}
	});
	this.route('activityDetail',
	{
		path: '/projects/p/:slug/:id',
		waitOn: function(){
			this.subscribe('projects');
			this.subscribe('activitylog');
		},
		data: function(){
			return ActivityLog.findOne({_id:this.params.id});
		},
		action: function(){
			if(this.ready()){
				this.layout('main');
				this.render('activityDetail', {to: 'bodycontent'});
			}
		}
	});
	this.route('projectEdit',
	{
		path: '/projects/p/:slug/edit',
		waitOn: function(){
			this.subscribe('projects');
		},
		data: function(){
			return Projects.findOne({_slug:this.params.slug});
		},
		action: function(){
			if(this.ready()){
				this.layout('main');
				this.render('projectEdit', {to: 'bodycontent'});
			}
		}
	});
});

