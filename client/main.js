Router.route('/', function() {
	this.layout('main');
	this.render('postfeed', {to: 'bodycontent'});
});

Router.route('/projects', function() {
	this.layout('main');
	this.render('projectList', {to: 'bodycontent'});
});