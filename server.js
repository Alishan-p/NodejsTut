const express = require('express');

const app = express();

app.use(express.json())



let phones = [
  {
    id: '1',
    name: 'iphone 13',
    price: '78000',
    color: 'black',
    ram: '4gb',
    storage: '129gb',
  }
]

app.get('/api/products/phone', function (req, res) {
  res.json(phones)
})

app.post('/api/products/phone', function (req, res) {
  const phone = req.body;

  phones.push(phone)

  res.json(phones)
})

app.put('/api/products/phone', function (req, res) {
  const phone = req.body;

  for (let i = 0; i < phones.length; i++) {
    if (phone.id === phones[i].id) {
      phones[i] = phone;
    }
  }

  res.json(phones)
})

app.delete('/api/products/phone/:phoneId', function (req, res) {
  const phoneId = req.params.phoneId;

  phones = phones.filter(function (phone) {
    return phone.id !== phoneId;
  })

  res.send(phones)
})

app.listen(3000, function () {
  console.log('app running on 3000')
});
