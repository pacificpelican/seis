//  seis Desk copyright 2017-2019
//  Desk.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

import Spreadsheet from "./Spreadsheet";

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';

import Headernav from "./Headernav";

function reloadOnce() {
  console.log("about to reload");
  return window.location.reload();
}

function eqSet(as, bs) {
  //  via https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

class Desk extends Component {
  state = {
    Ok: true,
    userObjectAsk: "",
    dbdata: "-",
    dbdataArr: [],
    indexURL: "",
    lastHeader: []
  };
  keyLibrary = new Set();
  lastOne = [];

  constructor() {
    super();

    this.handlecValueChange = this.handlecValueChange.bind(this);
    this.handleLookupButton = this.handleLookupButton.bind(this);
  }

  runDBlookup(dbOBJ, db = 'seisdb') {
    let that = this;
    let dest = "/api/1/getdbdata/db/" + db + "/object/" + dbOBJ;
    console.log("FETCH REQUEST URL:")
    console.log(dest);
    fetch(dest, {})
      .then(function (response) {
        if (response.ok) {
          for (var e in response.json) {
            console.log(e);
          }

          return response.json();
        }
        throw new Error("Network did not respond.");
        return response.blob();
      })
      .then(function (myReturn) {
        that.setState({ dbdata: myReturn, dbdataArr: myReturn });
      });
  }

  goBack() {
    window.history.back();
  }

  pickSeis = () => {
    this.setState({ userObjectAsk: "seis"});
  }

  handlecValueChange(event) {
    let capturedVal = event.target.value;
    this.setState({ userObjectAsk: capturedVal });
  }

  handleLookupButton(event) {
    let cont = this.runDBlookup(this.state.userObjectAsk);
  }

  componentDidMount() {
    
  }

  forEachDb(objArr) {
    for (let o of objArr) {
      let keyset = Object.keys(o);

      if (keyset !== this.keyLibrary.keys()) {
        for (let z of keyset) {
          this.keyLibrary.add(z);
        }
      }
    }
    return null;
  }

  forEachDbEntry(objArr) {
    let retArr = [];

    for (let o of objArr) {
      let innerSet = new Set(Object.keys(o));
      let innerLibrary = new Set([...this.keyLibrary]);

      if (eqSet(innerSet, innerLibrary)) {
        console.log("matches keyLibrary");
      } else {
        console.log("fails to match keyLibrary");
      }

      let keyset = new Set(Object.keys(o));

      if (keyset !== this.keyLibrary.keys()) {
        for (let z of keyset) {
          this.keyLibrary.add(z);
        }
      }
    }
    return null;
  }

  render() {
    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="deskContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>
        <Headernav />
        <h1 id="desk">
          apple-picker Яecursive Object Desk<span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>
        <aside>
          app database table: <span id="clickSeis" onClick={this.pickSeis}>seis</span>
          <br />
          <br />
        </aside>
        <section id="user-input">
          <Input
            id="crypto_output"
            onChange={this.handlecValueChange}
            value={this.state.userObjectAsk}
          />
          <Button variant="contained" color="primary" onClick={this.handleLookupButton} id="lookupDB">
            lookup in DB
          </Button>
        </section>
        <Card id="results">
          <Spreadsheet dbdataArr={this.state.dbdataArr} table={this.state.userObjectAsk} store="seisdb" />
        </Card>

        <footer id="deskFooter">
          powered by <b>mlBench Spreadsheetcore</b> by <a href="http://danmckeown.info">Dan McKeown</a>
        </footer>

        <style jsx global>{`
          h1#desk, aside {
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
            font-family: "Inconsolata", "Anonymous Pro", "Hack", Menlo, monospace;
          }
          div#deskContainer {
            background: #f7f8f9;
          }
        `}</style>
      </div>
    );
  }
}

export default Desk;
