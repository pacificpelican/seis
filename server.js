const express = require('express')
const next = require('next')

const loki = require("lokijs")

const convertObj = require("object-array-converter")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

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
  server.get('/api/1/getdbdata/object/:obj', (req, res) => {

    const AccountsDB = new loki(__dirname + "/db/accountsdb.json");

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

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
