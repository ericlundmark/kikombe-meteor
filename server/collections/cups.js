/*
 * Add query methods like this:
 *  Cup.findPublic = function () {
 *    return Cup.find({is_public: true});
 *  }
 */

Cups.allow({
  insert: function (userId, doc) {
    return userId;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return doc.owner == userId;
  },

  remove: function (userId, doc) {
    return true;
  }
});

Cups.deny({
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
