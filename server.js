//TODO
//...
//mongoose
//bcrypt
//jwt
//register system
//mailcatcher / send token
//child_process

const express = require('express');
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
var moment = require('moment');  

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true 
}));

app.use(cors());

const productsPath = './data/products.json'
const usersPath = './data/users.json'

// Helpers
const readFile = (callback, returnJson = false, filePath = productsPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
        throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const readUserFile = (callback, returnJson = false, filePath = usersPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
        throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (fileData, callback, filePath = productsPath, encoding = 'utf8') => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
        throw err;
    }
    callback();
  });
};

const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

//control Expireds
app.get('/control-expireds', (req, res) => {
  readFile(data => {
    const percents = [100,80,20]
    const filtered = data.filter((product) => {
      return (moment(new Date()).diff(product.insertDate, 'days')) < 3
    })

    filtered.map((product) => {
      product.price = parseFloat(product.initialPrice)*percents[moment(new Date()).diff(product.insertDate, 'days')]/100
    })

    writeFile(JSON.stringify(filtered, null, 2), () => {
      return res.status(200).json(true);
    });    
    
  },true);

});


// Login
app.post('/login', (req, res) => {
  readUserFile(data => {
    let email = req.body.email
    let password = req.body.password
    let user = data[data.findIndex(user => user.email == email)]
    // //bcrypt compare
    if(user && user.password !== password){
      user = null
    } 
    return res.json({
      //use jwt
      token: (user) ? "token_"+user.name : null  
    })
  },
  true);
});


// List products
app.get('/products', (req, res) => {
  readFile(data => {
    return res.status(200).json(data)
  }, true);
});

// Get product
app.get('/product/:id', function(req, res) {
  readFile(data => {
    const { id } = req.params
    const productIndex = data.findIndex(product => product.id === id)
    const product = data[productIndex]
    return res.status(200).json(product)
  },
  true);
});

// Create
app.post('/product', function(req, res) {
  readFile(data => {
    const product = { 
      id: create_UUID(),
      name: req.body.name,
      initialPrice: req.body.initialPrice,
      price: req.body.initialPrice,
      currency: req.body.currency,
      ingredients: req.body.ingredients,
      insertDate: moment(new Date()),
      image: req.body.image,
    }
    data.push(product)

    writeFile(JSON.stringify(data, null, 2), () => {
        return res.status(200).json(product);
    });
  },
  true);
});

// Update
app.put('/product', function(req, res) {
  readFile(data => {
    const id = req.body.id
    const productIndex = data.findIndex(product => product.id === id)
    const product = data[productIndex]
    product.name = req.body.name
    product.ingredients = req.body.ingredients
    product.currency = req.body.currency
    product.initialPrice = req.body.initialPrice
    product.image = req.body.image

    writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).json(product);
    });
  },
  true);
});

// Delete
app.delete('/product/:id', (req, res) => {
  readFile(data => {
    const id = req.params["id"];
    const productIndex = data.findIndex(product => product.id === id)
    if (productIndex > -1) {
      data.splice(productIndex, 1);
    }
    writeFile(JSON.stringify(data, null, 2), () => {
        return res.status(200).json(true);
    });
  },
  true);
});

const server = app.listen(8080, () => {
  console.log('listening on port %s...', server.address().port);
});

