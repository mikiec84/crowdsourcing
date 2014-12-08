Router.route('/login', function () {
  this.render('login');
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/images', function () {
  this.render('images');
});

	