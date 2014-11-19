
/*****************************************************************************/
/* TournamentIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.TournamentIndex.events({
  'click #submit': function (e, tmpl) {
    e.preventDefault();
    var name = tmpl.find("input[id=name]").value;
    var startDate = tmpl.find("input[id=start]").value;
    var endDate = tmpl.find("input[id=end]").value;
    if (!name || !startDate || !endDate) { return false;};
    var tournament = new Tournament(null, name, Date.parse(startDate), Date.parse(endDate));
    tournament.save(function(err, result){
      if (result) {
        $('#myModal').modal('hide');
      };
    });
  }
});

Template.TournamentIndex.helpers({
   tournaments: function () {
     return Tournaments.find();
   }
 });

/*****************************************************************************/
/* TournamentIndex: Lifecycle Hooks */
/*****************************************************************************/

Template.TournamentIndex.created = function () {
};

Template.TournamentIndex.rendered = function () {
  $('.datetimepicker').datetimepicker();
};

Template.TournamentIndex.destroyed = function () {
};


