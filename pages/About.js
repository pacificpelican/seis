//  seis copyright 2017-2019
//  About.js
import React, { Component } from "react";
import Link from "next/link";

import Spreadsheet from "./Spreadsheet";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import { Tab } from "@material-ui/core";

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

  handlecValueChange = event => {
    console.log(event.target.value);
    let capturedVal = event.target.value;
    this.setState({ userObjectAsk: capturedVal });
  };

  handlesubmit = event => {
    console.log("about to update collection");
    let cont = this.letServerUpdate(
      this.props.url.query.store,
      this.props.url.query.table,
      this.props.url.query.tuple,
      this.props.url.query.val,
      this.props.url.query.objprop,
      this.state.userObjectAsk
    );
  };

  letServerUpdate(store, obj, tuple, objprop, objkey, newval) {
    console.log("running letServerUpdate");
    let apiUrlPrefix = "";
    let dest;
    //  /api/1/deletedata/db/:db/object/:obj/tuple/:tuple
    dest =
      apiUrlPrefix +
      "/api/1/deletedata/db/" +
      store +
      "/object/" +
      obj +
      "/tuple/" +
      tuple;

    console.log("dest: " + dest);

    fetch(dest, { method: "post" })
      .then(function(response) {
        if (response.ok) {
          console.log("response ok");
          return response.json();
        } else {
          throw new Error(response.Error);
        }
      })
      .then(function(myReturn) {
        console.log(myReturn);
      });
  }

  componentDidMount(props) {
    this.setState({ userObjectAsk: this.props.url.query.val });
  }

  goBack() {
    window.history.back();
  }

  render(props) {
    const tuple = this.props.url.query.tuple;
    let val = this.props.url.query.val;
    let store = this.props.url.query.store;
    let table = this.props.url.query.table;
    let prop = this.props.url.query.objprop;

    return (
      <div id="editContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>

        <header id="topheader">
          <nav id="topnav">
            <ul id="navlist">
              <li id="website">
                <a href="../../../..">SEIS</a>
              </li>
              <li>
                <a href="https://bitbucket.org/pacificpelican/seis/src/master/">
                  Bitbucket
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <h1 id="desk">
          apple-picker Object Deleter
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
              an object cycle manager by [Dan McKeown](http://danmckeown.info)
            </h6>
            <br />
            <span id="copright">copyright 2019</span>
            <br />
            <li>
              You can view objects by entering them into the input at{" "}
              <a href="/Objectbrowser">Objectbrowser</a>
            </li>
            <li>
              After visualizing the object with the `enter your JSON` button you
              can persist the data by pressing the `save to DB` button
            </li>
            <li>
              These saved objects can be viewed at <a href="/Desk">Desk</a>{" "}
              (search for seis as the database object name) in chronological
              order
            </li>
          </section>
        </Card>

        <footer id="deskFooter">
          powered by <b>mlBench Spreadsheetcore</b> by{" "}
          <a href="http://danmckeown.info">Dan McKeown</a>
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
