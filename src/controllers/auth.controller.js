import { getConnection, sql, usersQuery } from "../database/index";
import { comparePassword, encryptPassword } from "../middlewares/index";
import config from "../config";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    let userData;
    let pass;

    if (email == null || password == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await getConnection();
        const user = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query(usersQuery.getUserLoginByEMail);

        userData = user.recordset[0];
        if (!userData) return res.status(400).json({ msg: "User not found" });
        else if (userData.state !== "Active") {
            return res.status(401).json({ msg: "User not active, contact administrator!" });
        }

        const passUser = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query(usersQuery.getUserpassword);

        pass = passUser.recordset[0].Password;
        const comparePass = await comparePassword(password, pass);
        if (!comparePass) {
            return res.status(401).json({ token: null, msg: "Incorrect user or password" });
        }

        const token = jwt.sign({ id: userData.id }, config.secretkey, {
            expiresIn: 86400,
        });
        res.json({ token, userData });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const signup = async (req, res) => {
    let { firstName, lastName, rol, email, password } = req.body;
    let created, state;

    if (firstName == null, lastName == null, email == null || password == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
    else if (!rol) {
        rol = "Basic";
        state = "Inactivo";
    } else { state = "Activo"; }

    const pass = await encryptPassword(password);
    created = new Date();

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("firstName", sql.VarChar, firstName)
            .input("lastName", sql.VarChar, lastName)
            .input("rol", sql.VarChar, rol)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, pass)
            .input("state", sql.VarChar, state)
            .input("created", sql.Date, created)
            .query(usersQuery.createNewUser);
        res.json({ msg: "Se ha creado un nuevo usuario" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
