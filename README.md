**[seis](http://seis.pacificio.com)**

*an object cycle manager by [Dan McKeown](http://danmckeown.info)*
*copyright 2019*

**[About](/About)**

---

<section id="propsInfo">
  <h3>6️⃣</h3>
  <h3>seis</h3>
  <h6>
    an object cycle manager by 
    <a href="http://danmckeown.info">Dan McKeown</a>
  </h6>
  <br />
  <span id="copright">copyright 2019</span>
  <br /><br />
  <li>
    You can view objects by entering them into the input at 
    <a href="/Objectbrowser">Objectbrowser</a>
  </li>
  <li>
    After visualizing the object with the `enter your JSON` button you
    can persist the data by pressing the `save to DB` button
  </li>
  <li>
    Database is saved by default to the 
    <a href="../db/seisdb.json">/db/seisdb.json</a> file
  </li>
  <li>
    These saved objects can be viewed at <a href="/Desk">Desk</a> 
    (search for seis as the database object name) in chronological
    order
  </li>
  <li>
    Edit, View and Delete are given the URL parameters they require to work via
    clicks on the links in Desk output
  </li>
  <li>Clicking on the red X will take you to the Delete page where you can confirm deletion (of that entire object)</li>
  <li>
    When an object is created, along with the normal metadata, a
    special locator property is added. This is used as a kind of ID
    for editing and deleting
  </li>
</section>

---

<article id="appTree">
  <h3>App Component Tree</h3>
  <ul>
    <li>
      <a href="./Objectbrowser">Objectbrowser</a> → SpreadsheetObjectbrowser → SpreadsheetCoreRecursive
    </li>
    <li>
      <a href="./Desk">Desk</a> → Spreadsheet → SpreadsheetCoreRecursiveClick
    </li>
    <li>
      <a href="./View">View</a> → SpreadsheetCoreRecursive
    </li>
  </ul>
  <h3>API</h3>
  <ul id="routes">
    <li>
      GET database object collection:{" "}
      <code>/api/1/getdbdata/db/seisdb/object/seis</code>
      <span className="info">
        <a href="/Desk">Desk</a>, <a href="/Spiral">Spiralviewer</a>
      </span>
    </li>
    <li>
      GET one database object by locator:{" "}
      <code>/api/1/getdbdata/db/seisdb/object/seis/tuple/14206</code>
      <span className="info">
        <a href="/View">View</a>
      </span>
    </li>
    <li>
      POST create new database object:{" "}
      <code>
        /api/1/saveobjectdata/db/seisdb/obj/seis/newdata/%22%20%7B%20%5C%22name%5C%22%3A%20%5C%22Bogey%5C%22%20%7D%22
      </code>
      <span className="info">
        <a href="/Objectbrowser">Objectbrowser</a>
      </span>
    </li>
    <li>
      POST (shallow) create new database object:{" "}
      <code>/api/1/saveobjectdatashallow/db/spiraldb/obj/notes/newdata/%7B%22note%22%3A%22I%20love%20the%20cat!%22%2C%22savedAt%22%3A1554680275455%7D</code>
      <span className="info">
        <a href="/Spiral">Spiral</a>
      </span>
    </li>
    <li>
      POST update existing database object by locator property:{" "}
      <code>
        /api/1/updatedata/db/seisdb/object/seis/objprop/Bogey/objkey/name/newval/Belle/tuple/99372
      </code>
      <span className="info">
        <a href="/Edit">Edit</a>
      </span>
    </li>
    <li>
      POST delete existing database object by locator property:{" "}
      <code>/api/1/deletedata/db/seisdb/object/seis/tuple/15540</code>
      <span className="info">
        <a href="/Delete">Delete</a>
      </span>
    </li>
  </ul>
</article>

---

<footer id="deskFooter">
  powered by{" "}
  <b>
    {" "}
    <a href="https://seis.pacificio.com">SEIS</a>{" via "}
    <a href="http://mlBench.pacificio.com">mlBench</a>{" "}
    <a href="https://bitbucket.org/pacificpelican/mlbench/src/master/">💻</a>/
    <a href="http://applepicker.pacificio.com">apple-picker</a>{" "}
    <a href="https://bitbucket.org/pacificpelican/apple-picker/src/master/">
      💻
    </a>
  </b>
</footer>

===
===
Seis uses[NextJS](https://nextjs.org/) with [custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing) and [ExpressJS](https://expressjs.com/) and was scaffolded using [create-next-app](https://open.segment.com/create-next-app/).  The UI is built with [ReactJS](https://reactjs.org/) components.  The app's JSON databases are powered by [LokiJS](http://lokijs.org/#/).
===

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```
