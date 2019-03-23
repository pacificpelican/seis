const express = require('express')
const next = require('next')

const loki = require("lokijs")

const convertObj = require("object-array-converter")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let locatorScale = 100000;

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id })
  })

  var apiDataDB = {}
  server.get('/api/1/getdbdata/db/:db/object/:obj', (req, res) => {

    const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");

    console.log(req.params);

    const theParam = req.params.obj.toString();

    AccountsDB.loadDatabase({}, function () {
      let _collection = AccountsDB.getCollection(theParam);

      if (!_collection) {
        console.log(
          "Collection %s does not exist. Creating ... 🎮",
          theParam
        );
        _collection = AccountsDB.addCollection(theParam);
      }
      else {
        console.log("collection exists");
      }

      retData = _collection.find();

      console.log(retData);

      apiDataDB = retData;
    })

    let respObj = Object.assign({}, apiDataDB);

    let respArr = convertObj.toArray(respObj);

   // return respArr;
    res.send(respArr);
  });

  server.get('/api/1/saveobjectdata/db/:db/obj/:obj/newdata/:newdata', (req, res) => {
    const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");

    console.log(req.params);

    const theParam = req.params.obj.toString();

    let newData = req.params.newdata;

    AccountsDB.loadDatabase({}, function () {
      let _collection = AccountsDB.getCollection(theParam);

      if (!_collection) {
        console.log(
          "Collection %s does not exist. Creating ... 🎮",
          theParam
        );
        _collection = AccountsDB.addCollection(theParam);
      }
      else {
        console.log("collection exists");
      }

      console.log("about to add tuple");

      let serverObject = JSON.parse(newData);

      console.log(serverObject);

      let dbObject = Object.assign(serverObject, {locator: Math.floor(Math.random() * locatorScale + 1), created_at_time: Date.now()});

      console.log(dbObject);

      _collection.insertOne(
        dbObject
      );

      console.log("saving to database: " + newData);
      AccountsDB.saveDatabase();

      let homeLink = "<a href='../../..'>Home</a>";
      res.send(
          " record created    | " +
          req.params
      );

    })

  }); 

  server.post('/api/1/saveobjectdata/db/:db/obj/:obj/newdata/:newdata', (req, res) => {
    const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");

    console.log(req.params);

    const theParam = req.params.obj.toString();

    let newData = req.params.newdata;

    AccountsDB.loadDatabase({}, function () {
      let _collection = AccountsDB.getCollection(theParam);

      if (!_collection) {
        console.log(
          "Collection %s does not exist. Creating ... 🎮",
          theParam
        );
        _collection = AccountsDB.addCollection(theParam);
      }
      else {
        console.log("collection exists");
      }

      console.log("about to add tuple");

      console.log(newData);

    //  let serverObject = JSON.parse(newData);

      let serverObject = newData;

      console.log(serverObject);

      let dbObject = Object.assign(serverObject, {locator: Math.floor(Math.random() * locatorScale + 1), created_at_time: Date.now()});

      console.log(dbObject);

      _collection.insertOne(
        dbObject
      );

      console.log("saving to database: " + newData);
      AccountsDB.saveDatabase();

      let homeLink = "<a href='../../..'>Home</a>";
      res.send(
          " record created    | " +
          req.params
      );

    })

  }); 
  

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
