const express = require('express')
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/nodetut')
    console.log('database connected')
  } catch (error) {
    console.log(error)
  }
}
connectDatabase();

const contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
})

const contactModel = mongoose.model('contact', contactSchema);

app.get('/api/contact', async function (req, res) {
  try {
    const result = await contactModel.find();
    res.json(result)
  } catch (error) {
    console.log('error')
  }
})

app.post('/api/contact', async function (req, res) {
  try {
    const contact = req.body;
    const result = await contactModel.create(contact);
    res.json(result)
  }
  catch (error) {
    res.send('error')
  }
})

app.get('/api/contact/:contactId', async function (req, res) {
  try {
    const contactId = req.params.contactId;
    const result = await contactModel.findById(contactId);
    res.json(result)
  }
  catch (error) {
    res.send('error')
  }
})

app.delete('/api/contact/:contactId', async function (req, res) {
  try {
    const contactId = req.params.contactId;
    const result = await contactModel.findByIdAndDelete(contactId);
    res.json(result)
  }
  catch (error) {
    res.send('error')
  }
})



app.listen(3000, function () {
  console.log('server running')
})