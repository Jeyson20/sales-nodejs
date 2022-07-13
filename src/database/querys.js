export const productsQuery ={
    getAllProducts:
    'SELECT * FROM PRODUCTS',
    getProductById:
    'SELECT * FROM PRODUCTS WHERE Id = @Id',
    getTotalProducts:
    'SELECT COUNT(*) AS totalProducts FROM PRODUCTS',
    createNewProduct:
    'INSERT INTO PRODUCTS (productName,categoryId, unitPrice, unitsInStock, created) VALUES (@productName, @categoryId, @unitPrice, @unitsInStock, @created)',
    updateProductById:
    'UPDATE PRODUCTS SET productName = @productName, categoryId = @categoryId, unitPrice = @unitPrice, unitsInStock = @unitsInStock, lastModified = @lastModified WHERE Id = @Id',
    deleteProductById:
    'DELETE FROM PRODUCTS WHERE Id = @Id'
}

export const categoriesQuery ={
    getAllCategories:
    'SELECT * FROM CATEGORIES',
    getCategoryById:
    'SELECT * FROM CATEGORIES WHERE Id = @Id',
    createNewCategory:
    'INSERT INTO CATEGORIES (categoryname, description, created) VALUES (@categoryname, @description, @created)',
    deleteCategoryById:
    'DELETE FROM CATEGORIES WHERE Id = @Id'
};


export const usersQuery ={
    getUserLoginByEMail:
    'SELECT id, firstName, lastName, email, rol, state FROM USERS WHERE Email =@Email',
    getUserpassword:
    'SELECT Password FROM USERS WHERE Email = @Email',
    getUserById:
    'SELECT id, firstName, lastName, email, rol, state, created, lastModified FROM USERS WHERE Id = @Id',
    createNewUser:
    'INSERT INTO USERS (firstName, lastName, rol, email, password, state, created) VALUES (@firstName, @lastName, @rol, @email, @password, @state, @created)',
    deleteCategoryById:
    'DELETE FROM CATEGORIES WHERE Id = @Id'
}

