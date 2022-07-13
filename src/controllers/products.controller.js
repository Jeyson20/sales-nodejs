import { getConnection, sql, productsQuery } from "../database";

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(productsQuery.getAllProducts);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .input('Id', id)
            .query(productsQuery.getProductById);
        res.send(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getTotalProducts = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(productsQuery.getTotalProducts);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const newProduct = async (req, res) => {
    const { productName, categoryId, unitPrice } = req.body
    let { unitsInStock, created } = req.body
    if (productName == null || categoryId == null || unitPrice == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' })
    }
    if (unitsInStock == null) unitsInStock = 0
    created = new Date()

    try {
        const pool = await getConnection();
        await pool.request()
            .input('productName', sql.VarChar, productName)
            .input('categoryId', sql.Int, categoryId)
            .input('unitPrice', sql.Decimal, unitPrice)
            .input('unitsInStock', sql.Int, unitsInStock)
            .input('created', sql.Date, created)
            .query(productsQuery.createNewProduct);
        res.json({ msg: 'Se ha creado un nuevo producto' })

    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
};

export const deleteProductById = async (req, res) => {
    const { id } = req.params
    try {
        const pool = await getConnection()
        await pool
            .request()
            .input('Id', id)
            .query(productsQuery.deleteProductById);

        // if (result.rowsAffected[0] === 1)
        res.sendStatus(204);
        // else
        //     res.status(404).json({ msg: 'Registro no encontrado' })

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updateProductById = async (req, res) => {
    const { productName, categoryId, unitPrice, unitsInStock } = req.body;
    const { id } = req.params;
    let { lastModified } = req.body
    if (productName == null || categoryId == null || unitPrice == null || unitsInStock == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' })
    }
    lastModified = new Date().toISOString()

    try {
        const pool = await getConnection();
        await pool.request()
            .input('productName', sql.VarChar, productName)
            .input('categoryId', sql.Int, categoryId)
            .input('unitPrice', sql.Decimal, unitPrice)
            .input('unitsInStock', sql.Int, unitsInStock)
            .input('lastModified', sql.Date, lastModified)
            .input('Id', sql.Int, id)
            .query(productsQuery.updateProductById);
        res.json({ msg: `Se ha actualizado el producto ${id}` })
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
};



