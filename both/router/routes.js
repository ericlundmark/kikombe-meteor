/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  this.route('game.index', {path: '/game'});
  this.route('game.create', {
    path: '/tournament/:tournament/group/:group/game/create'
  });
  this.route('tournament.index', {path: '/tournament'});
  this.route('tournament.show', {
    path: '/tournament/:_id',
    data: function() { return Tournament.findOne(this.params._id); }
  });

  this.route('cup.index', {
    path: '/cup',
    data: function() { return Cup.find({});}
  });
});
