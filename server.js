const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://pakiZBRG:KQHgB4zUMZVqVSzb@node-rest-shop.5thyy.mongodb.net/node-rest-shop?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => console.log('MongoDB connected...'));

const Product = mongoose.model('products', new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: {type: String},
    description: {type: String},
    image: {type: String},
    price: {type: Number},
    availableSizes: {type: Array}
}));

app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req,res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
});

app.delete('/api/products/:id', async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Order Deleted Successfully');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));