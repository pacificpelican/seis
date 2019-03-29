//  seis copyright 2017-2019
//  About.js
import React, { Component } from "react";

import Card from "@material-ui/core/Card";

import Headernav from "./Headernav";

function reloadOnce() {
  console.log("about to reload");
  return window.location.reload();
}

class About extends Component {
  state = {
    Ok: true,
    entry: ""
  };

  constructor(props) {
    super();
  }

  goBack() {
    window.history.back();
  }

  render(props) {
    return (
      <div id="editContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>

        <Headernav />

        <h1 id="desk">
          About
          <span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>

        <Card>
          <section id="propsInfo">
            <h3>seis</h3>

            <h6>
              an object cycle manager by <a href="http://danmckeown.info">Dan McKeown</a>
            </h6>
            <br />
            <span id="copright">copyright 2019 all rights reserved</span>
            <br />
            <li>
              You can view objects by entering them into the input at{" "}
              <a href="/Objectbrowser">Objectbrowser</a>
            </li>
            <li>
              After visualizing the object with the `enter your JSON` button you
              can persist the data by pressing the `save to DB` button
            </li>
            <li>Database is saved to the <a href="../db/seisdb.json">/db/seisdb.json</a> file</li>
            <li>
              These saved objects can be viewed at <a href="/Desk">Desk</a>{" "}
              (search for seis as the database object name) in chronological
              order
            </li>
            <li>Edit and Delete are given the parameters they require to work via clicks on the links in Desk output</li>
            <li>When an object is created, along with the normal metadata, a special locator property is added.  This is used as a kind of ID for editing and deleting</li>
          </section>
        </Card>

        <footer id="deskFooter">
          powered by <b>mlBench/apple-picker Spreadsheetcore</b>
        </footer>

        <footer id="seisFooter">
          <a href="https://pacificio.com">pacificIO</a>
        </footer>

        <style jsx global>{`
          h1#desk,
          aside {
            font-family: Futura, "Ubuntu", "Lucida Grande", "Roboto", Helvetica,
              sans-serif;
          }
          footer#deskFooter {
            margin-top: 2em;
            font-family: Ubuntu, Roboto, Helvetica, sans-serif;
          }
          section#user-input {
            margin-bottom: calc(3vh + 10px);
          }
          #lookupDB {
            margin-left: calc(1vh + 10px);
          }
          #results {
            font-family: "Inconsolata", "Anonymous Pro", "Hack", Menlo,
              monospace;
          }
          div#deskContainer {
            background: #f7f8f9;
          }
          section#propsInfo {
            font-family: "Roboto", "Ubuntu Sans", "Segoe UI", "Lucida Sans",
              Helvetica, sans-serif;
          }
        `}</style>
      </div>
    );
  }
}

export default About;
