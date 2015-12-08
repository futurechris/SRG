Router.route('/', function() {
	this.layout('main');
	this.render('postfeed', {to: 'bodycontent'});
});

Router.route('/projects', function() {
	this.layout('main');
	this.render('projectList', {to: 'bodycontent'});
	this.render('addNewProjectBtnTemplate', {to: 'addNewProject'});
});

Router.route('/projects/new', function()
{
	if(Meteor.userId)
	{
		this.layout('main');
		this.render('addProject', {to: 'bodycontent'});
	}
	else
	{
		Router.go('/projects');
	}
});

Router.map(function(){
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

