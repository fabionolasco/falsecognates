'use strict';

module.exports = function(Term) {

  var server = require('../../server/server');
  var ds = server.dataSources.mysqlDs;

  // Normal Post
  Term.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
        if(context.isNewInstance) {
            context.instance.reg_date = Date.now();
            context.instance.used_id = context.options.accessToken.userId;
        }
    }
    next();
  });

  function uriDecode(x) {
    return decodeURIComponent(decodeURIComponent(decodeURIComponent(x)));
  }

  function softSqlInjectionProtect(x) {
    x = x.replace(/[0-9]|\;|\||\"|\'|\+|\\|\*|\:|\%|\.|\=|\(|\)|\[|\]|\{|\}|\<|\>|\?|\!|\_|\$|\@|\&|\^|\#|\/|\`/gi, '');
    x = x.replace(/(sql)|(ascii)|(drop)|(from)|(create)|(select)|(update)|(truncate)|(delete)|(clear)|(set)|(union)|(left)|(join)|(index)/gi, '\\$&');
    x = x.replace(/(insert)|(into)|(key)|(like)|(load)|(merge)|(on)|(open)|(deny)|(default)|(cursor)|(current)|(trigger)|(updatetext)|(waitfor)/gi, '\\$&');
    x = x.replace(/(inner)|(outer)|(delimiter)|(fetch)|(alter)|(as)|(database)|(disk)|(exec)|(where)|(proc)|(kill)|(grant)|(procedure)|(add)|(all)|(any)|(backup)|(revoke)|(for)|(file)|(goto)/gi, '\\$&');
    return x;
  }

  // Remote Method - search-by-languages
  Term.searchTermsByTermName = function (data, options, cb) {
    if (!data || !data.termVal) {
      throw 'Term missing.';
    }
    console.log('data', data);
    data.termVal = uriDecode(data.termVal);
    data.termVal = softSqlInjectionProtect(data.termVal);
    var sql = 'CALL getTermsByTermName("' + data.termVal + '");';
    console.log('sql', sql);
    ds.connector.query(sql, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  Term.remoteMethod('searchTermsByTermName', {
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
      path: '/search-terms-by-term-name'
    }
  });

  // Remote Method - search-by-languages
  Term.countTermsByLanguage = function (data, options, cb) {
    if (!data || !data.lang1 || !data.lang2) {
      throw 'Languages missing.';
    }
    console.log('data', data);
    data.lang1 = uriDecode(data.lang1);
    data.lang2 = uriDecode(data.lang2);
    data.lang1 = softSqlInjectionProtect(data.lang1);
    data.lang2 = softSqlInjectionProtect(data.lang2);
    var sql = 'CALL countTermsByLanguage("' + data.lang1 + '","' + data.lang2 + '");';
    console.log('sql', sql);
    ds.connector.query(sql, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  Term.remoteMethod('countTermsByLanguage', {
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
      path: '/count-terms-by-languages'
    }
  });

  // Remote Method - search-by-languages
  Term.searchByLanguages = function (data, options, cb) {
    if (!data || !data.lang1 || !data.lang2) {
      throw 'Languages missing.';
    }
    if (typeof data.start === 'undefined') {
      data.start = 0;
    }
    if (typeof data.numRows === 'undefined') {
      data.numRows = 30;
    }
    console.log('dataa', data);
    data.lang1 = uriDecode(data.lang1);
    data.lang2 = uriDecode(data.lang2);
    data.lang1 = softSqlInjectionProtect(data.lang1);
    data.lang2 = softSqlInjectionProtect(data.lang2);
    data.start = parseInt(data.start);
    data.numRows = parseInt(data.numRows);
    var sql = 'CALL getTermsByLanguage("' + data.lang1 + '","' + data.lang2 + '","' + data.start + '","' + data.numRows + '");';
    console.log('sqla', sql);
    ds.connector.query(sql, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  Term.remoteMethod('searchByLanguages', {
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
      path: '/search-by-languages'
    }
  });

  // Remote Methos - search-by-languages-userid
  Term.searchByLanguagesUserId = function (data, options, cb) {
    var userId = options && options.accessToken && options.accessToken.userId;
    if (!userId) {
      return cb('err');
    }
    if (!data || !data.lang1 || !data.lang2) {
      throw 'Languages missing.';
    }
    if (typeof data.start === 'undefined') {
      data.start = 0;
    }
    if (typeof data.numRows === 'undefined') {
      data.numRows = 30;
    }
    console.log('datab', data);
    data.lang1 = uriDecode(data.lang1);
    data.lang2 = uriDecode(data.lang2);
    data.lang1 = softSqlInjectionProtect(data.lang1);
    data.lang2 = softSqlInjectionProtect(data.lang2);
    data.start = parseInt(data.start);
    data.numRows = parseInt(data.numRows);
    var sql = 'CALL getTermsByLanguageAndId("' + data.lang1 + '","' + data.lang2 + '","' + userId + '","' + data.start + '","' + data.numRows + '");';
    console.log('sqlb', sql);
    ds.connector.query(sql, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  Term.remoteMethod('searchByLanguagesUserId', {
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
      path: '/search-by-languages-userid'
    }
  });

  // Stored Procedure - topTerms
  Term.topTerms = function (data, options, cb) {
    var sql = 'CALL topTerms();';
    ds.connector.query(sql, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  Term.remoteMethod('topTerms', {
    accepts: [{
        arg: 'data',
        type: 'Object',
        required: false,
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
      verb: 'get',
      status: 201,
      path: '/top-terms'
    }
  });

  // Stored Procedure - topTerms
  Term.preExisting = function (data, options, cb) {

    var sql = 'CALL preExisting("' + data.l1 + '","' + data.l2 + '","' + data.w1 + '","' + data.w2 + '");';
    ds.connector.query(sql, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  Term.remoteMethod('preExisting', {
    accepts: [{
        arg: 'data',
        type: 'Object',
        required: false,
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
      path: '/existing-terms'
    }
  });

};
