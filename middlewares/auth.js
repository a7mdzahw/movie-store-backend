const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("No Token Provided");

  try {
    const payload = jwt.verify(token, config.get("jwtKey"));
    req.user = payload;
    next();
  } catch (ex) {
    res.status(401).send("Invalid Token ");
  }
};

module.exports = auth;
