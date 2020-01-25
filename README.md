# **[seis](https://seis.pacificio.com)**

**Creator, Reader, Updater and Destroyer of JavaScript objects**

Licensed under [ISC License](LICENSE) copyright (c) 2018-2019 [Dan McKeown](https://danmckeown.info).

<h3>6️⃣</h3>
<img src="./SeisLogoBanner.jpg" alt="logo-parrot" />
<h6>
  an object cycle manager by 
  <a href="https://danmckeown.info">Dan McKeown</a>
</h6>

## Table Of Contents
- [Features](#features)
- [QuickStart](#quickstart)
- [Requirements](#requirements)
- [Usage](#usage)
- [Installation](#installation)
- [About](#about)

## features
<article id="appTree">
  <h3>App Component Tree</h3>
  <ul>
    <li>
      <a href="/pages/Objectbrowser.js">Objectbrowser</a> → SpreadsheetObjectbrowser → SpreadsheetCoreRecursive
    </li>
    <li>
      <a href="/pages/Desk.js">Desk</a> → Spreadsheet → SpreadsheetCoreRecursiveClick
    </li>
    <li>
      <a href="/pages/View.js">View</a> → SpreadsheetCoreRecursive
    </li>
  </ul>
  <h3>API</h3>
  <ul id="routes">
    <li>
      GET database object collection: 
      <code>/api/1/getdbdata/db/seisdb/object/seis</code>
      <span className="info">
        <a href="/pages/Desk.js">Desk</a>, <a href="/pages/Spiral.js">Spiralviewer</a>
      </span>
    </li>
    <li>
      GET one database object by locator: 
      <code>/api/1/getdbdata/db/seisdb/object/seis/tuple/14206</code>
      <span className="info">
        <a href="/pages/View.js">View</a>
      </span>
    </li>
    <li>
      POST create new database object: 
      <code>
        /api/1/saveobjectdata/db/seisdb/obj/seis/newdata/%22%20%7B%20%5C%22name%5C%22%3A%20%5C%22Bogey%5C%22%20%7D%22
      </code>
      <span className="info">
        <a href="/pages/Objectbrowser.js">Objectbrowser</a>
      </span>
    </li>
    <li>
      POST (shallow) create new database object: 
      <code>/api/1/saveobjectdatashallow/db/spiraldb/obj/notes/newdata/%7B%22note%22%3A%22I%20love%20the%20cat!%22%2C%22savedAt%22%3A1554680275455%7D</code>
      <span className="info">
        <a href="/pages/Spiral.js">Spiral</a>
      </span>
    </li>
    <li>
      <span>POST update existing database object by locator property:</span>
      <code>
        /api/1.6/updatedata/db/seisdb/object/seis/objprop/%2522birds%2522/objkey/wha/newval/birbs/tuple/11749
      </code>
      <span className="info">
        <a href="/pages/Edit2.js">Edit2</a>
      </span>
    </li>
    <li>
      POST delete existing database object by locator property: 
      <code>/api/1/deletedata/db/seisdb/object/seis/tuple/15540</code>
      <span className="info">
        <a href="/pages/Delete.js">Delete</a>
      </span>
    </li>
  </ul>
</article>

## quickstart
```bash
npm install
npm run dev
open http://localhost:3010
```

## requirements
- NodeJS
- NPM

## installation
- Check [NodeJS](https://nodejs.org/en/) version: `node --version`
- Check [NPM](https://www.npmjs.com/) version: `npm --version`
- Clone the Git repo: `git clone <repo-url>`

## usage
<section id="propsInfo">
  <li>
    You can view objects by entering them into the input at 
    <a href="/pages/Objectbrowser.js">Objectbrowser</a>
  </li>
  <li>
    After visualizing the object with the `enter your JSON` button you
    can persist the data by pressing the `save to DB` button
  </li>
  <li>
    Database is saved by default to the 
    <a href="/db/seisdb.json">/db/seisdb.json</a> file
  </li>
  <li>
    These saved objects can be viewed at <a href="/pages/Desk.js">Desk</a> 
    (search for seis as the database object name) in chronological
    order
  </li>
  <li>
    `Edit2`, `View` and `Delete` are given the URL parameters they require to work via
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
For a similar project (all v1 data APIs should be compatible) but for MongoDB, see [OkConcept0](https://github.com/pacificpelican/okconcept0).
---

## about

Seis is from [Pacific IO](https://pacificio.com) and uses [NextJS](https://nextjs.org/) for front-end with [custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing) and [ExpressJS](https://expressjs.com/) and was scaffolded using [create-next-app](https://open.segment.com/create-next-app/).  The UI is built with [ReactJS](https://reactjs.org/) components.  The app's JSON databases are powered by [LokiJS](http://techfort.github.io/LokiJS/).
