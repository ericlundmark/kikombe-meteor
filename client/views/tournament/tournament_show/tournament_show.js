/*****************************************************************************/
/* TournamentShow: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.TournamentShow.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
   'click #submit': function (e, tmpl) {
    e.preventDefault();
    var name = tmpl.find("input[id=name]").value;
    if (!name) { return false;};
    Meteor.call('/app/tournament/update/addGroup', tmpl.data._id, name, function(error, result){
      if (result) {
        console.log('result');
        $('#modal-id').modal('hide');
      };
    });
  },
  'click .list-group-game': function(e, tmpl){
    e.preventDefault();
    Session.set("selectedGame", this)
  }
});

Template.TournamentShow.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   selectedGame: function(){
    return Session.get("selectedGame");
  }
});

/*****************************************************************************/
/* TournamentShow: Lifecycle Hooks */
/*****************************************************************************/

Template.TournamentShow.created = function () {
};

Template.TournamentShow.rendered = function () {
  Session.setDefault("selectedGame", null);
  $('.affix').affix({
    offset: {
      top: 50
    }
  });
};

Template.TournamentShow.destroyed = function () {
};


