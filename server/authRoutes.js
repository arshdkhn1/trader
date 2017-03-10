module.exports = function (app, passport) {

  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      const {email, phoneNo} = req.user;
      const redirectPath = email.concat(phoneNo) ? '/': '/profile?message=fillProfileInfo';

      res.redirect(req.session.returnTo || redirectPath);
      delete req.session.returnTo;
      req.session.save();
    });

  // route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      const {email, phoneNo} = req.user;
      const redirectPath = email.concat(phoneNo) ? '/': '/profile?message=fillProfileInfo';

      res.redirect(req.session.returnTo || redirectPath);
      delete req.session.returnTo;
      req.session.save();
    });

  // route for google authentication and login
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      const {email, phoneNo} = req.user;
      const redirectPath = email.concat(phoneNo) ? '/': '/profile?message=fillProfileInfo';

      res.redirect(req.session.returnTo || redirectPath);
      delete req.session.returnTo;
      req.session.save();
    });

};