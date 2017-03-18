'use strict';

module.exports = function (Votes) {

  // Upsert Vote based on user_id + term_id
  Votes.vote = function (data, options, cb) {
    var userId = options && options.accessToken && options.accessToken.userId;
    if (!userId) {
      return cb('err');
    }
    Votes.upsertWithWhere({
      term_id: data.term_id,
      user_id: userId
    }, {
      term_id: data.term_id,
      user_id: userId,
      vote_value: data.vote_value
    }, function (err, result) {
      if (err) return cb(err);
      cb(null, result);
    });
  };

  Votes.remoteMethod('vote', {
    accepts: [{
        arg: 'data',
        type: 'Object',
        required: true,
        http: {
          source: 'body'
        }
      },
      {
        arg: 'options',
        type: 'Object',
        http: "optionsFromRequest"
      }
    ],
    returns: {
      root: true,
      type: 'object'
    },
    http: {
      verb: 'post',
      status: 201,
      path: '/voting'
    }
  });

  // Get all votes for user, based on user_id from access token
  Votes.getVotes = function (data, options, cb) {
    var userId = options && options.accessToken && options.accessToken.userId;
    if (!userId) {
      return cb('err');
    }
    console.log(typeof data, data);
    var ids = data.termsIds.join(',');
    ids = ids.replace(/[^0-9\-\,]/g, '');
    var termIds = '(' + ids + ')';
    Votes.find({
      where: { user_id: userId }
    }, function (err, result) {
      if (err) return cb(err);
      cb(null, result);
    });
  };

  Votes.remoteMethod('getVotes', {
    accepts: [{
        arg: 'data',
        type: 'Object',
        required: true,
        http: {
          source: 'body'
        }
      },
      {
        arg: 'options',
        type: 'Object',
        http: "optionsFromRequest"
      }
    ],
    returns: {
      root: true,
      type: 'object'
    },
    http: {
      verb: 'post',
      status: 201,
      path: '/get-votes'
    }
  });

};
