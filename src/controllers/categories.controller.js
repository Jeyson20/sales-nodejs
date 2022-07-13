import { getConnection, sql, categoriesQuery } from "../database/index";

export const getCategories = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(categoriesQuery.getAllCategories);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .input('Id', id)
            .query(categoriesQuery.getCategoryById);
        res.send(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const newCategory = async (req, res) => {
    const { categoryname, description } = req.body
    let created = new Date()
    if (categoryname == null || description == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' })
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('categoryname', sql.VarChar, categoryname)
            .input('description', sql.VarChar, description)
            .input('created', sql.Date, created)
            .query(categoriesQuery.createNewCategory);
        res.json({ msg: 'Se ha creado una nueva categoria' })

    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
};

export const deleteCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const pool = await getConnection()
        await pool
            .request()
            .input('Id', id)
            .query(categoriesQuery.deleteCategoryById);
        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};