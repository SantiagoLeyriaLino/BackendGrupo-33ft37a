const Transactions = require('../../../db/models/transactionsSchema')
const Products = require('../../../db/models/productSchema')
const Users = require('../../../db/models/usersSchema')

const postTransactionController = async (data) => {
    const newTransaction = {
      idUser: data.idUser,
      amount: data.amount,
      products: data.products,
      date: data.date,
      status: data.status
    };

    const user = await Users.findById(data.idUser);
    if (!user) {
      throw Error('User not found');
    }
  
    const info = await Transactions.create(newTransaction);
  
    const products = data.products;
    for (const product of products) {
      const { productId, size, cant } = product;
  
      const updateProduct = await Products.findOneAndUpdate(
        { _id: productId, "size.size": size },
        { $inc: { "size.$.stock": -cant } },
        { new: true }
      );
    }
    const updateResult = await Users.findOneAndUpdate(
      { _id: data.idUser },
      {
        $push: { purchaseHistory: info._id }
      },
      { new: true }
    );
    
    return info;
  };
  
  module.exports = postTransactionController;