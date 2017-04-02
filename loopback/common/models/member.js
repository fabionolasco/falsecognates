'use strict';

var loopback = require('loopback');

module.exports = function(User) {

  User.on('resetPasswordRequest', function(info) {
    var url = 'http://www.falsecognates.com/new-password';
    var html = '<h1>False Cognates - Password Reset</h1><br><br>' +
    'Someone just requested a password reset to your account.<br><br>' +
    'If it was not you, please ignore this message.<br><br>' +
    'If it was you, please click on the link below:<br><br>' +
    '<a href="' + url + '?access_token=' + info.accessToken.id + '">' + url + '?access_token=' + info.accessToken.id + '</a>' +
    '<br><br><br><br><span style="color:#aaaaaa">Unsubscribe: To stop receiving all emails from ' +
    'us, please click <a href="%unsubscribe_url%">here</a></span>' +
    '<br><br><br>&nbsp;';
    loopback.Email.send({
      to: info.email,
      from: 'No Reply<no-reply@falsecognates.com>',
      subject: 'False Cognates - Password Reset',
      html: html
    }, function(err) {
      console.log('> sending password reset email to:', info.email);
      if (err) return console.log('> error sending password reset email');
    });
  });

  // Reset Password Value
  User.updatePassword = function (data, options, cb) {
    if (!data.hasOwnProperty('accessToken')) {
      data.accessToken = '1';
    }
    // Try to find User based on
    User.findById(data.accessToken, function(err, user) {
      if (err) {
        // Security through obscurity
        cb(null, {'response': 'Your password has been reset successfully'});
      }
      user.updateAttribute('password', data.password, function(err, user) {
        cb(null, {'response': 'Your password has been reset successfully'});
      });
    });
  };
  User.remoteMethod('updatePassword', {
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
      path: '/updatePassword'
    }
  });

};
