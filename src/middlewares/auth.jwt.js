import config from "../config";
import jwt from "jsonwebtoken";
import { getConnection, sql, usersQuery } from "../database";

export const verifyToken = async (req, res, next) => {
  try {
    let user;
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ msg: "No Token Provided" });

    const decoded = jwt.verify(token, config.secretkey);
    req.id = decoded.id;

    user = await findUSer(req.id);
    if (!user) return res.status(404).json({ msg: "No user found" });
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await findUSer(req.id);
  if (user.rol == "Admin") {
    next();
    return;
  }
  return res.status(403).json({ msg: "Required Admin role" });
};

const findUSer = async (userId) => {
  const pool = await getConnection();
  const user = await pool
    .request()
    .input("Id", sql.Int, userId)
    .query(usersQuery.getUserById);

  return user.recordset[0];
};
