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
})