const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token;

  //check for token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //add user from payload
    req.user = decoded;
    res.locals.userId = decoded.id; //to pass decoded id to the next function in routes
    res.locals.token = req.headers.authorization;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
