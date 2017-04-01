'use strict';

module.exports = function(User) {

  // var User = user.extend('User');
  console.log('Read here....');

  User.setup = function() {
    // var User = this;
    console.log('Setup setup here....');
    // Send password reset link when requested
    User.on('resetPasswordRequest', function(info) {
      console.log('::: trying to send email to:', info, info.email);
      var url = 'http://www.falsecognates.com/new-password';
      var html = '<h1>False Cognates - Password Reset</h1><br>' +
      '<p>Someone requested a password reset to your account.<br>' +
      'If it was not you, please ignore this message.</p><br>' +
      '<p>If it was you, please click ' +
      '<a href="' + url + '?access_token=' + info.accessToken.id + '">here</a>' +
      ' to reset your password.</p><br><br>To unsubscribe from False Cognates and stop receiving all emails from'+
      'us, please send an email message to gomidefabio@gmail.com with the text'+
      ' "Unsubscribe".<br><br>';
      loopback.Email.send({
        to: info.email,
        from: 'no-reply@falsecognates.com',
        subject: 'False Cognates - Password Reset',
        html: html
      }, function() {
        console.log('> sending password reset email to:', info, info.email);
        if (err) return console.log('> error sending password reset email');
      });
    });
  };

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
