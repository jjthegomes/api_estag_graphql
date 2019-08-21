import jwt from "jsonwebtoken";

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  //const token = authHeader.split(); //Authorization: Bearer tokenvalue
  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    req.isAuth = false;
    return next();
  }
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    req.isAuth = false;
    return next();
  }

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.usuarioId = decoded.usuarioId;

    return next();
  });
};
