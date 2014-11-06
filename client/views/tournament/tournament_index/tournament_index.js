
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
    var tournament = {
      name: name,
      author: Meteor.user(),
      startDate: Date.parse(startDate),
      endDate: Date.parse(endDate)
    }
    Meteor.call('/app/tournament/create', tournament, function(error, result){
      if (result) {
        console.log('result');
        $('#myModal').modal('hide');
      };
    });
  }
});

Template.TournamentIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   tournaments: function () {
     return Tournament.find();
   },
   isActive: function (startDate, endDate){
    var start = moment(startDate);
    var end = moment(endDate);
    var now = moment(new Date());
    return start.isBefore(now) && end.isAfter(now);
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


