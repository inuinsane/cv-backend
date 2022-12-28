import JWT from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("ACCESS DENIED");

  try {
    const verified = JWT.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid user");
  }
};

export default verifyToken;
