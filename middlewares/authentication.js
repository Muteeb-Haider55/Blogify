const { validateToken } = require("../service/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieVal = req.cookies[cookieName];
    if (!tokenCookieVal) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieVal);
      req.user = userPayload;
    } catch (error) {}
    next();
  };
}

module.exports = { checkForAuthenticationCookie };
