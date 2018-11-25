module.exports.requireLogin = (req, res, next) => {
  if (!req.url.startsWith('/users/signin') && (!req.session.passport || !req.session.passport.user)) {
    return res.status(403).send(
      {
        status: 'fail',
        data: {
          error: 'You are not authorised to access this resource.'
        }
      }
    );
  }
  next();
};