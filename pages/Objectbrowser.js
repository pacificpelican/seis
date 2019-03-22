//  apple-picker Objectbrowser copyright 2017-2019
//  Objectbrowser.js
//  via mlBench and danmckeown.info #5
import React, { Component } from "react";

import SpreadsheetObjectbrowser from "./SpreadsheetObjectbrowser";

let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto not available in this NodeJS version");
}

const numberScale = 100000000000000;

function math_floor_random_number(scale) {
  var newdigit = Math.floor(Math.random() * scale + 1);
  return newdigit;
}

function noTrueArraysMan(objArr) {
  let returnArr = [];
  for (let i = 0; i < objArr.length; i++) {
    returnArr.push(objArr[i]);
  }
  return returnArr;
}

function noTrueArraysMan2(objArr) {
  let returnArr = [];
  for (let f in objArr) {
    returnArr.push(f);
  }
  return returnArr;
}

function createMarkup(html) {
  return { __html: html };
}

function reloadOnce() {
  console.log("about to reload");
  return window.location.reload();
  return false;
}

function eqSet(as, bs) {
  //  via https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
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
        <li id="website"><a href='https://pacificio.com'>Get Your Web Site</a></li>
        <li><a href='http://eepurl.com/8auar'>Email List</a></li>
        <li><a href="https://github.com/pacificpelican">GitHub</a></li>
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
    let g = noTrueArraysMan(this.state.dbdataArr);

    const map1 = g.map(
      x =>
        '<span class="spread btc">Bitcoin: ' +
        x.btcprice +
        "</span> " +
        '<span class="spread eth">Ethereum:' +
        x.ethprice +
        "</span>"
    );

    let fowlfivedata = "btc-eth-bch-ltc-dsh-data";

    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="deskContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>
        <div dangerouslySetInnerHTML={{ __html: this.x }}></div>
        <h1 id="desk">
          mlBench Objectbrowser<span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>
        <section id="user-input">
          <input
            type="object"
            id="crypto_output"
            onChange={this.handlecValueChange}
            value={this.state.dbdataArr}
          />
          <br />
          <button onClick={this.handleLookupButton} id="lookupDB">
            enter your JSON
          </button>
        </section>
        <div id="objectCopy" className="dataReadout">
          <details>
            <summary>object</summary>
            <p>{this.state.dbdataArrState}</p>
          </details>
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
        `}</style>
      </div>
    );
  }
}

export default Objectbrowser;
