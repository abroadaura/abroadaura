import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
