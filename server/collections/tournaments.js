/*
 * Add query methods like this:
 *  Tournament.findPublic = function () {
 *    return Tournament.find({is_public: true});
 *  }
 */

Tournaments.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },

  update: function (userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']);;
  },

  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);;
  }
});

Tournaments.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});
