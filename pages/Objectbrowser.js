//  seis Objectbrowser copyright 2017-2019
//  Objectbrowser.js
//  via apple-picker, mlBench, and danmckeown.info #5
import React, { Component } from "react";
import { TextInput, Button, Pane } from "evergreen-ui";
import SpreadsheetObjectbrowser from "./SpreadsheetObjectbrowser";

let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto not available in this NodeJS version");
}

function reloadOnce() {
  console.log("about to reload");
  return window.location.reload();
}

class Objectbrowser extends Component {
  state = {
    Ok: true,
    cryptonowNumber: 0,
    userObjectAsk: "",
    dbdata: "-",
    dbdataArr: [],
    dbdataArrState: [],
    indexURL: "",
    lastHeader: []
  };
  keyLibrary = new Set();
  lastOne = [];
  constructor() {
    super();

    this.x = `<header id='topheader'>
    <nav id='topnav'>
      <ul id='navlist'>
        <li id="website"><a href='../../../..'>SEIS</a></li>
        <li><a href="https://bitbucket.org/pacificpelican/seis/src/master/">Bitbucket</a></li>
      </ul>
    </nav>
    </header>`;

    this.handlecValueChange = this.handlecValueChange.bind(this);
    this.handleLookupButton = this.handleLookupButton.bind(this);
  }

  getCryptoNow() {
    var retVal;
    let that = this;
    crypto.randomBytes(8, (err, buf) => {
      if (err) throw err;
      let rVal = buf.toString("hex");
      console.log(
        `${buf.length} bytes of random hex data: ${buf.toString("hex")}`
      );
      let rValHTML = `<span>${rVal}</span>`;
      retVal = rVal;
      that.setState({
        cryptonow: retVal
      });
    });
    return retVal;
  }

  goBack() {
    window.history.back();
  }

  requestSaveToDatabase = () => {
    let objectToSaveTo;
    if (typeof objectToSaveTo !== "undefined" && objectToSaveTo !== null) {
      objectToSaveTo = this.props.saveObject;
    } else {
      objectToSaveTo = "seis";
    }

    console.log("objectToSaveTo");
    console.log(objectToSaveTo);

    let filteredObject;

    filteredObject = this.state.dbdataArr;
    console.log(filteredObject.toString());
    this.saveObjectToDatabase(objectToSaveTo, filteredObject);
  };

  saveObjectToDatabase = (
    objectTo = "seis",
    newdata = "{data: 'none'}",
    db = "seisdb"
  ) => {
    console.log("new data to be written");
    console.log(newdata);

    let newdataString = encodeURIComponent(JSON.stringify(newdata));

    console.log(newdataString);

    let dest =
      "/api/1/saveobjectdata/db/" +
      db +
      "/obj/" +
      objectTo +
      "/newdata/" +
      newdataString.toString();

    console.log("fetch save request: " + dest);
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
  };

  handlecValueChange(event) {
    let capturedVal = event.target.value;
    this.setState({ dbdataArr: capturedVal });
  }

  handleLookupButton(event) {
    let capturedVal = this.state.dbdataArr;
    this.setState({ dbdataArrState: capturedVal });
  }

  componentDidMount() {}

  render() {
    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="deskContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>
        <div dangerouslySetInnerHTML={{ __html: this.x }} />
        <h1 id="desk">
          mlBench Objectbrowser
          <span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>
        <section id="user-input">
          <TextInput
            type="object"
            id="crypto_output"
            onChange={this.handlecValueChange}
            value={this.state.dbdataArr}
          />
          <br />
          <Button onClick={this.handleLookupButton} id="lookupDB">
            enter your JSON
          </Button>
        </section>
        <aside id="dbRequest">
          <Button id="btn-save" onClick={this.requestSaveToDatabase}>
            Save to DB
          </Button>
        </aside>
        <div id="objectCopy" className="dataReadout">
          <Pane>
            <details>
              <summary>object</summary>
              <p>{this.state.dbdataArrState}</p>
            </details>
          </Pane>
        </div>
        <SpreadsheetObjectbrowser dbdataArr={this.state.dbdataArrState} />
        <style jsx global>{`
          h1#desk {
            font-family: Futura, "Ubuntu", "Lucida Grande", "Roboto", Helvetica,
              sans-serif;
          }
          div#desk-wrapper.mlBench-content div#desk {
            width: 80vw;
            display: grid;
            grid-auto-columns: 75vw;
            grid-gap: 10px;
            grid-auto-rows: auto;
            background: azure;
          }
          section#datalibrary {
            display: flex;
            flex-flow: wrap;
            align-items: center;
          }
          i.notColor {
            background: azure;
          }
          nav#topnav #website {
            background: #ffcaa3;
          }
          section#user-input, aside#dbRequest, Input {
            margin-top: calc(5px + 0.4vh);
            margin-bottom: calc(7px + 0.4vh);
          }
        `}</style>
      </div>
    );
  }
}

export default Objectbrowser;
