export const querys ={
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