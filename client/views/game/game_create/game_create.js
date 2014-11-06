
/*****************************************************************************/
/* GameCreate: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.GameCreate.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.GameCreate.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* GameCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.GameCreate.created = function () {
};

Template.GameCreate.rendered = function () {
  $('.datetimepicker').datetimepicker();
};

Template.GameCreate.destroyed = function () {
};


