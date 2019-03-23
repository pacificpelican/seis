//  danmckeown.info copyright 2017-2018
//  Desk.js
//  mlBench
import React, { Component } from "react";

import Spreadsheet from "./Spreadsheet";

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';

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

class Desk extends Component {
  state = {
    Ok: true,
    cryptonowNumber: 0,
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

  getCryptoNowNotHex() {
    var retVal;
    let that = this;
    crypto.randomBytes(32, (err, buf) => {
      if (err) throw err;
      let rVal = buf.toString("ascii");
      console.log(
        `${buf.length} bytes of random ASCII data: ${buf.toString("hex")}`
      );
      let rValHTML = `<span>${rVal}</span>`;
      var re = / /;
      let newstr = rVal.replace(re, "");
      retVal = newstr;
      that.setState({
        cryptonowNH: retVal
      });
    });
    return retVal;
  }

  runDBlookup(dbOBJ, db='seisdb') {
    let that = this;
    let dest = "/api/1/getdbdata/db/" + db + "/object/" + dbOBJ;
    console.log("FETCH REQUEST URL:")
    console.log(dest);
    fetch(dest, {})
      .then(function(response) {
        if (response.ok) {
          for (var e in response.json) {
            console.log(e);
          }

          return response.json();
        }
        throw new Error("Network did not respond.");
        return response.blob();
      })
      .then(function(myReturn) {
        //      console.log(myReturn);
        that.setState({ dbdata: myReturn, dbdataArr: myReturn });
      });
  }

  goBack() {
    window.history.back();
  }

  handlecValueChange(event) {
    let capturedVal = event.target.value;
    this.setState({ userObjectAsk: capturedVal });
  }

  handleLookupButton(event) {
    let cont = this.runDBlookup(this.state.userObjectAsk);
  }

  UNSAFE_componentWillMount() {
    var newCrypto3 = math_floor_random_number(numberScale);
    this.setState(prevState => ({
      cryptonowNumber: newCrypto3
    }));
  }

  componentDidMount() {
    var newCrypto2 = this.getCryptoNowNotHex();
    this.setState(prevState => ({
      cryptonowNH: newCrypto2
    }));
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
      //    console.log(o);

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

    const mapX = this.forEachDbEntry(g);

    let fowlfivedata = "btc-eth-bch-ltc-dsh-data";

    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="deskContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>
        <h1 id="desk">
          apple-picker Яecursive Object Desk<span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>
        <aside>
          database tables to look up: dataset
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
          <Spreadsheet dbdataArr={this.state.dbdataArr} table={this.state.userObjectAsk} store="accountsdb" />
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
