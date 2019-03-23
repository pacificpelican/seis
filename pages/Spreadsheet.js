//  danmckeown.info copyright 2017-2018
//  Spreadsheet.js
//  mlBench
import React, { Component } from "react";

import SpreadsheetCoreRecursiveClick from "./SpreadsheetCoreRecursiveClick";

let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto not available in this NodeJS version");
}

const numberScale = 100000000000000;

function noTrueArraysMan(objArr) {
  let returnArr = [];
  for (let i = 0; i < objArr.length; i++) {
    returnArr.push(objArr[i]);
  }
  return returnArr;
}

function noTrueArraysMan2(objArr) {
  let returnArr = [];
  for (let f of objArr) {
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

class Spreadsheet extends Component {
  keyLibrary = new Set();
  lastOne = [];
  constructor() {
    super();
  }

  goBack() {
    window.history.back();
  }

  UNSAFE_componentWillMount() {
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

  render(props) {
    console.log("table prop in Spreadsheet: " + this.props.table);
    let g = noTrueArraysMan(this.props.dbdataArr);

    const theStore = this.props.store;
    const theTable = this.props.table;

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
      <div id="desk-wrapper" className="mlBench-content">
        <SpreadsheetCoreRecursiveClick spreadsheetdata={g} store={theStore} table={theTable} />
        <style>{`
        
        `}</style>
      </div>
    );
  }
}

export default Spreadsheet;
