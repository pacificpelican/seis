//  seis server.js copyright 2017-2019
//  server.js
//  via mlBench & apple-picker
const express = require("express");
const next = require("next");
const loki = require("lokijs");
const convertObj = require("object-array-converter");

const port = parseInt(process.env.PORT, 10) || 3010;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = require('cors');

let locatorScale = 100000;

function postDataWildcard(
  db,
  table,
  tuple,
  objval,
  objkey = "description",
  newVal = "__"
) {

  console.log(db, tuple, table);
  console.log("collection to update: " + table);
  let dbDirectory = __dirname + "/db/" + db + ".json";
  console.log("loki dir: " + dbDirectory);
  let db2 = new loki(dbDirectory);

  db2.loadDatabase({}, () => {
    let _collection = db2.getCollection(table);

    if (!_collection) {
      console.log(
        "Collection %s does not exist. Aborting attempt to edit ",
        table
      );

      throw new Error("ERROR: collection does not exist");
    } else {
      console.log(table + " collection exists");
    }
    console.log(_collection);

    console.log(objval);
    let objkeyString = objkey.toString();
    let objvalString = objval.toString();

    console.log(`${objkeyString}`);

    let record;

    console.log("tuple: " + tuple);

    record = _collection.findObject({
      locator: { $aeq: tuple },
      [objkeyString]: { $contains: objvalString }
    });

    if (record === null) {
      record = _collection.findObject({ locator: { $aeq: tuple } });
    }

    if (record === null) {
      record = _collection.findObject({
        [objkeyString]: { $contains: objvalString }
      });
    }

    console.log(record);
    console.log(newVal);

    if (
      typeof record[`${objkeyString}`] !== "undefined" &&
      record[`${objkeyString}`] !== null
    ) {
      console.log("0 levels deep in object; key: " + objkeyString);
      console.log(record[`${objkeyString}`]);
      record[`${objkeyString}`] = newVal;
      console.log("set new value");
    } else {
      console.log("going 1 level deep in object");
      console.log(record);

      Object.keys(record).forEach(function(item) {
        console.log(item); // key
        console.log(record[item]); // value

        if (
          typeof record[item][`${objkeyString}`] !== "undefined" &&
          record[item][`${objkeyString}`] !== null
        ) {
          console.log(
            "1 levels deep in object; " + record[item][`${objkeyString}`]
          );
          record[item][`${objkeyString}`] = newVal;
        } else {
          console.log("going 2 levels deep in object");
          console.log(record[item]);

          Object.keys(record[item]).forEach(function(item2) {
            console.log(item2); // key
            console.log(record[item][item2]); // value

            if (
              typeof record[item][item2][`${objkeyString}`] !== "undefined" &&
              record[item][item2][`${objkeyString}`] !== null
            ) {
              console.log(
                "2 levels deep in object;" +
                  record[item][item2][`${objkeyString}`]
              );
              record[item][item2][`${objkeyString}`] = newVal;
            } else {
              console.log("going 3 levels deep in object");
              console.log(record[item][item2]);

              Object.keys(record[item][item2]).forEach(function(item3) {
                console.log(item3); // key
                console.log(record[item][item2][item3]); // value

                if (
                  typeof record[item][item2][item3][`${objkeyString}`] !==
                    "undefined" &&
                  record[item][item2][item3][`${objkeyString}`] !== null
                ) {
                  console.log(
                    "3 levels deep in object;" +
                      record[item][item2][item3][`${objkeyString}`]
                  );
                  record[item][item2][item3][`${objkeyString}`] = newVal;
                } else {
                  console.log("object may require greater than 3 depth");
                }
              });
            }
          });
        }
      });
    }
    console.log("about to update collection")
    console.log(record);
    _collection.update(record);

    console.log("about to save database");
    db2.saveDatabase();
  });
}

function deleteDataWildcard(
  db,
  table,
  tuple,
  objval,
  objkey = "description",
  newVal = "__"
) { //  the last 3 parameters can be null
  console.log(db, tuple, table);
  console.log("collection to update: " + table);
  let dbDirectory = __dirname + "/db/" + db + ".json";
  console.log("loki dir: " + dbDirectory);
  let db2 = new loki(dbDirectory);

  db2.loadDatabase({}, () => {
    let _collection = db2.getCollection(table);

    if (!_collection) {
      console.log(
        "Collection %s does not exist. Aborting attempt to edit ",
        table
      );
      throw new Error("ERROR: collection does not exist");
    } else {
      console.log(table + " collection exists");
    }
    console.log(_collection);
    console.log("tuple: " + tuple);

    _collection.findAndRemove({ locator: { $aeq: tuple } });
    db2.saveDatabase();

    console.log("record " + tuple + " removed (💣🤷)");
  });
}

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  console.log("SEIS API Server now running at port " + port);

  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  var apiDataDB = {};
  server.get("/api/1/getdbdata/db/:db/object/:obj", (req, res) => {
    const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");
    console.log(req.params);
    const theParam = req.params.obj.toString();
    let newData = req.params.newdata;

    AccountsDB.loadDatabase({}, function() {
      let _collection = AccountsDB.getCollection(theParam);

      if (!_collection) {
        console.log("Collection %s does not exist. Creating ... 🎮", theParam);
        _collection = AccountsDB.addCollection(theParam);
      } else {
        console.log("collection exists");
      }

      retData = _collection.find();
      console.log(retData);
      console.log(newData);
      apiDataDB = retData;

      let respObj = Object.assign({}, apiDataDB);
      let respArr = convertObj.toArray(respObj);
      res.send(respArr);
    });
  });

  var apiDataDB1 = {};
  server.get("/api/1/getdbdata/db/:db/object/:obj/tuple/:tuple", (req, res) => {
    const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");
    console.log(req.params);
    const theParam = req.params.obj.toString();
    let newData = req.params.newdata;

    AccountsDB.loadDatabase({}, function() {
      let _collection = AccountsDB.getCollection(theParam);

      if (!_collection) {
        console.log("Collection %s does not exist. Creating ... 🎮", theParam);
        _collection = AccountsDB.addCollection(theParam);
      } else {
        console.log("collection exists");
      }

      let tuple = req.params.tuple;
      retData = _collection.findObject({
        locator: { $aeq: tuple }
      });
      console.log(retData);
      console.log(newData);
      apiDataDB1 = retData;

      let respObj = Object.assign({}, apiDataDB1);
    //  let respArr = convertObj.toArray(respObj);
      res.send(respObj);
    });
  });

  server.post(
    "/api/1/saveobjectdata/db/:db/obj/:obj/newdata/:newdata",
    (req, res) => {
      const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");
      console.log(req.params);
      const theParam = req.params.obj.toString();
      let newData = req.params.newdata;

      AccountsDB.loadDatabase({}, function() {
        let _collection = AccountsDB.getCollection(theParam);

        if (!_collection) {
          console.log(
            "Collection %s does not exist. Creating ... 🎮",
            theParam
          );
          _collection = AccountsDB.addCollection(theParam);
        } else {
          console.log("collection exists");
        }

        console.log("about to add tuple");
        console.log(newData);
        let serverObject = JSON.parse(newData);
        serverObject = JSON.parse(serverObject);
        console.log(serverObject);

        let dbObject = Object.assign(serverObject, {
          locator: Math.floor(Math.random() * locatorScale + 1),
          created_at_time: Date.now()
        });

        console.log("tuple to save");
        console.log(dbObject);

        _collection.insertOne(dbObject);

        console.log("saving to database: " + newData);
        AccountsDB.saveDatabase();

        let homeLink = "<a href='../../..'>Home</a>";
        res.send(Object.assign({}, { result: "record created [POST]" }));
      });
    }
  );

  server.get(
    "/api/1/saveobjectdata/db/:db/obj/:obj/newdata/:newdata",
    (req, res) => {
      const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");
      console.log(req.params);
      const theParam = req.params.obj.toString();
      let newData = req.params.newdata;

      AccountsDB.loadDatabase({}, function() {
        let _collection = AccountsDB.getCollection(theParam);

        if (!_collection) {
          console.log(
            "Collection %s does not exist. Creating ... 🎮",
            theParam
          );
          _collection = AccountsDB.addCollection(theParam);
        } else {
          console.log("collection exists");
        }

        console.log("about to add tuple (via GET)");
        console.log(newData);
        let serverObject = JSON.parse(newData);
        serverObject = JSON.parse(serverObject);
        console.log(serverObject);

        let dbObject = Object.assign(serverObject, {
          locator: Math.floor(Math.random() * locatorScale + 1),
          created_at_time: Date.now()
        });

        console.log("tuple to save");
        console.log(dbObject);

        _collection.insertOne(dbObject);

        console.log("saving to database: " + newData);
        AccountsDB.saveDatabase();

        let homeLink = "<a href='../../..'>Home</a>";
        res.send(Object.assign({}, { result: "record created [GET]" }));
      });
    }
  );

  server.post(
    "/api/1/saveobjectdatashallow/db/:db/obj/:obj/newdata/:newdata",
    (req, res) => {
      const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");
      console.log(req.params);
      const theParam = req.params.obj.toString();
      let newData = req.params.newdata;

      AccountsDB.loadDatabase({}, function() {
        let _collection = AccountsDB.getCollection(theParam);

        if (!_collection) {
          console.log(
            "Collection %s does not exist. Creating ... 🎮",
            theParam
          );
          _collection = AccountsDB.addCollection(theParam);
        } else {
          console.log("collection exists");
        }

        console.log("about to add tuple [shallow] - " + req.params.db + " | " + req.params.obj);
        console.log(newData);
        let serverObject = JSON.parse(newData);
        //  serverObject = JSON.parse(serverObject);
        console.log(serverObject);

        let dbObject = Object.assign(serverObject, {
          locator: Math.floor(Math.random() * locatorScale + 1),
          created_at_time: Date.now()
        });

        console.log("tuple to save");
        console.log(dbObject);

        _collection.insertOne(dbObject);

        console.log("saving to database: " + newData);
        AccountsDB.saveDatabase();

        let homeLink = "<a href='../../..'>Home</a>";
        res.send(Object.assign({}, { result: "record created (shallow) [POST]" }));
      });
    }
  );

  server.get(
    "/api/1/saveobjectdatashallow/db/:db/obj/:obj/newdata/:newdata",
    (req, res) => {
      const AccountsDB = new loki(__dirname + "/db/" + req.params.db + ".json");
      console.log(req.params);
      const theParam = req.params.obj.toString();
      let newData = req.params.newdata;

      AccountsDB.loadDatabase({}, function() {
        let _collection = AccountsDB.getCollection(theParam);

        if (!_collection) {
          console.log(
            "Collection %s does not exist. Creating ... 🎮",
            theParam
          );
          _collection = AccountsDB.addCollection(theParam);
        } else {
          console.log("collection exists");
        }

        console.log("about to add tuple");
        console.log(newData);
        let serverObject = JSON.parse(newData);
        //  serverObject = JSON.parse(serverObject);
        console.log(serverObject);

        let dbObject = Object.assign(serverObject, {
          locator: Math.floor(Math.random() * locatorScale + 1),
          created_at_time: Date.now()
        });

        console.log("tuple to save");
        console.log(dbObject);

        _collection.insertOne(dbObject);

        console.log("saving to database: " + newData);
        AccountsDB.saveDatabase();

        let homeLink = "<a href='../../..'>Home</a>";
        res.send(Object.assign({}, { result: "record created (shallow) [GET]" }));
      });
    }
  );

  server.get(
    "/api/1/updatedata/db/:db/object/:obj/objprop/:objprop/objkey/:objkey/newval/:newval",
    (req, res) => {
      console.log("running update GET route");
      console.log("obj: " + req.params.obj);

      postDataWildcard(
        req.params.db,
        req.params.obj,
        req.params.tuple,
        req.params.objprop,
        req.params.objkey,
        req.params.newval
      );

      res.send(Object.assign({}, { Response: "ok - GET update" }));
    }
  );

  server.post(
    "/api/1/updatedata/db/:db/object/:obj/objprop/:objprop/objkey/:objkey/newval/:newval/tuple/:tuple",
    (req, res) => {
      console.log("running update POST route");
      console.log("obj: " + req.params.obj);

      postDataWildcard(
        req.params.db,
        req.params.obj,
        req.params.tuple,
        req.params.objprop,
        req.params.objkey,
        req.params.newval
      );

      res.send(Object.assign({}, { Response: "ok - POST update" }));
    }
  );

  server.post(
    "/api/1/deletedata/db/:db/object/:obj/tuple/:tuple",
    (req, res) => {
      console.log("running (simple) delete POST route");
      console.log("obj: " + req.params.obj);

      deleteDataWildcard(
        req.params.db,
        req.params.obj,
        req.params.tuple,
        null,
        null,
        null
      );  //  the last 3 parameters can be null

      res.send(Object.assign({}, { Response: "ok - POST update (remove)" }));
    }
  );

  server.get(
    "/api/1/deletedata/db/:db/object/:obj/tuple/:tuple",
    (req, res) => {
      console.log("running (simple) delete GET route");
      console.log("obj: " + req.params.obj);

      deleteDataWildcard(
        req.params.db,
        req.params.obj,
        req.params.tuple,
        null,
        null,
        null
      );  //  the last 3 parameters can be null

      res.send(Object.assign({}, { Response: "ok - GET update (remove)" }));
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    console.log("port: " + port);
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
