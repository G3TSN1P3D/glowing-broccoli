const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "th3r3sn0cry1n1nbaseball";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      
      console.log('---Token Data-----')
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data)
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email,  _id }) {
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
