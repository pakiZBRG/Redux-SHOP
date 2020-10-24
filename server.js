const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const app = express();

app.use(express.json());

//Mongoose
mongoose.connect('mongodb+srv://pakiZBRG:KQHgB4zUMZVqVSzb@node-rest-shop.5thyy.mongodb.net/node-rest-shop?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => console.log('MongoDB connected...'));

//Model -> Product, Order
const Product = mongoose.model('products', new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: {type: String},
    description: {type: String},
    image: {type: String},
    price: {type: Number},
    availableSizes: {type: Array}
}));

const Order = mongoose.model('order', new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    email: {type: String},
    name: {type: String},
    address: {type: String},
    total: {type: Number},
    cart: [{
        _id: {type: String},
        title: {type: String},
        price: {type: Number},
        count: {type: Number}
    }]
}, {timestamp: true}));

//Routes
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

app.post('/api/orders', async(req, res) => {
    const {name, email, address, total, cart} = req.body;
    if(!name || !email || !address || !total || !cart){
        return res.send({message: 'Some fields are empty!'})      
    }

    const order = await new Order(req.body).save();
    res.send(order);
})

//Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));