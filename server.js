const express = require('express')
const next = require('next')

const loki = require("lokijs")

const convertObj = require("object-array-converter")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let locatorScale = 100000;

let theTuple = null;

function postDataWildcard(db, table, tuple, objval, objkey = "description", newVal = "__") { // used with route that doesn't contain tuple

  console.log(db, tuple, table);
  console.log("collection to update: " + table);
  let dbDirectory = __dirname + "/db/" + db + ".json"
  console.log("loki dir: " + dbDirectory);
  let db2 = new loki(dbDirectory);

  theTuple = tuple;

  db2.loadDatabase({}, () => {
    let _collection = db2.getCollection(table);

    if (!_collection) {
      console.log(
        "Collection %s does not exist. Aborting attempt to edit ",
        table
      );

      throw new Error('ERROR: collection does not exist');
    }
    else {
      console.log(table + " collection exists");
    }
    console.log(_collection);

    console.log(objval);
    let objkeyString = objkey.toString();
    let objvalString = objval.toString();

    console.log(`${objkeyString}`);

    let record;

    console.log("tuple: " + tuple);

    record = _collection.findObject({ locator: { '$aeq': tuple }, [objkeyString]: { '$contains': objvalString } });

    if (record === null) {
      record = _collection.findObject({ locator: { '$aeq': tuple } });
    }

    //  console.log(record);

    if (record === null) {
      record = _collection.findObject({ [objkeyString]: { '$contains': objvalString } });
    }

    console.log(record);
    console.log(newVal);

    if ((typeof record[`${objkeyString}`] !== 'undefined') && (record[`${objkeyString}`] !== null)) {
      console.log("0 levels deep in object; key: " + objkeyString);
      record[`${objkeyString}`] = newVal;
    }
    else {
      console.log("going 1 level deep in object");
      console.log(record);

      Object.keys(record).forEach(function (item) {
        console.log(item); // key
        console.log(record[item]); // value

        if ((typeof record[item][`${objkeyString}`] !== 'undefined') && (record[item][`${objkeyString}`] !== null)) {
          console.log("1 levels deep in object; " + record[item][`${objkeyString}`]);
          record[item][`${objkeyString}`] = newVal;
        }
        else {
          console.log("going 2 levels deep in object");
          console.log(record[item]);

          Object.keys(record[item]).forEach(function (item2) {
            console.log(item2); // key
            console.log(record[item][item2]); // value

            if ((typeof record[item][item2][`${objkeyString}`] !== 'undefined') && (record[item][item2][`${objkeyString}`] !== null)) {
              console.log("2 levels deep in object;" + record[item][item2][`${objkeyString}`]);
              record[item][item2][`${objkeyString}`] = newVal;
            }
            else {
              console.log("object may require greater than 2 depth");
            }
          });
        }
      });
    }

    _collection.update(record);

    db2.saveDatabase();
  });

}

function postDataWildcard2(db, table, tuple, objval, objkey = "description", newVal = "__") {

  let dbDirectory = "/db/"
  let db2 = new loki(__dirname + dbDirectory + db + ".json");
  db2.loadDatabase({}, () => {
    let _collection = db2.getCollection(table);

    if (!_collection) {
      console.log(
        "Collection %s does not exist. Aborting attempt to edit ",
        table
      );
      // EXIT
      throw new Error('ERROR: collection does not exist');
    }
    else {
      console.log(table + " collection exists");
    }
    console.log(_collection);

    console.log(objval);
    let objkeyString = objkey.toString();
    let objvalString = objval.toString();

    console.log(`${objkeyString}`);
    console.log("setting record: " + objvalString + " " + tuple);

    let record = _collection.findObject({ [objkeyString]: { '$contains': objvalString }, locator: { '$aeq': tuple } });

    console.log(record);
    console.log(newVal);

    record[`${objkeyString}`] = newVal;

    _collection.update(record);

    db2.saveDatabase();
  });
}

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  });

  server.get('/posts/:id', (req, res) => {

    return app.render(req, res, '/posts', { id: req.params.id })
  });

  var apiDataDB = {}
  server.get('/api/1/getdbdata/db/:db/object/:obj', (req, res) => {
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

      retData = _collection.find();
      console.log(retData);
      console.log(newData);
      apiDataDB = retData;

      let respObj = Object.assign({}, apiDataDB);
      let respArr = convertObj.toArray(respObj);
      res.send(respArr);
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
      let serverObject = JSON.parse(newData);
      serverObject = JSON.parse(serverObject);
      console.log(serverObject);

      let dbObject = Object.assign(serverObject, { locator: Math.floor(Math.random() * locatorScale + 1), created_at_time: Date.now() });

      console.log("tuple to save")
      console.log(dbObject);

      _collection.insertOne(
        dbObject
      );

      console.log("saving to database: " + newData);
      AccountsDB.saveDatabase();

      let homeLink = "<a href='../../..'>Home</a>";
      res.send(
        Object.assign({}, { result: 'record created' })
      );
    })
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
      console.log(newData);
      let serverObject = JSON.parse(newData);
      serverObject = JSON.parse(serverObject);
      console.log(serverObject);

      let dbObject = Object.assign(serverObject, { locator: Math.floor(Math.random() * locatorScale + 1), created_at_time: Date.now() });

      console.log("tuple to save")
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

  server.get("/api/1/updatedata/db/:db/object/:obj/objprop/:objprop/objkey/:objkey/newval/:newval", (req, res) => {

    console.log("running update GET route");
    console.log("obj: " + req.params.obj)

    postDataWildcard(req.params.db, req.params.obj, req.params.tuple, req.params.objprop, req.params.objkey, req.params.newval);

    res.send(Object.assign({}, { Response: 'ok - GET update' }));
  });

  server.post("/api/1/updatedata/db/:db/object/:obj/objprop/:objprop/objkey/:objkey/newval/:newval/tuple/:tuple", (req, res) => {

    console.log("running update POST route");
    console.log("obj: " + req.params.obj)

    postDataWildcard(req.params.db, req.params.obj, req.params.tuple, req.params.objprop, req.params.objkey, req.params.newval);

    res.send(Object.assign({}, { Response: 'ok - POST update' }));
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
