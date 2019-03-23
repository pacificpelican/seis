//  danmckeown.info copyright 2017-2018
//  SpreadsheetCore.js
//  mlBench
import React, { Component } from "react";
import Link from 'next/link';

let lastkey = null;

class SpreadsheetCoreRecursiveClick extends Component {
  table = null;

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    let bg = document.getElementById("basicComponentDiv");
    bg.style.visibility = "hidden";
  }

  closeModal() {
    let bg = document.getElementById("basicComponentDiv");
    bg.style.visibility = "visible";
    this.setState({ modalIsOpen: false });
  }

  render(props) {

    let theStore = 'accountsdb';
    let theTable = this.props.table;

    var g;
    if (this.props.spreadsheetdata[0] !== undefined) {
      g = [{}, ...this.props.spreadsheetdata];
    }
    else {
      g = [this.props.spreadsheetdata];
    }

    return (
      <div id="desk" className="mlBench-content">
        <section className="keylibrary">
          {g.map(function (interVal) {
            let valArr = Object.keys(interVal);

            let retSet = [];
            let lastOne = "";

            for (let i = 0; i < valArr.length; i++) {
              if (typeof valArr[i] === "object") {
                //         console.log("valArr[i] is an object");
              } else {
                retSet.push(
                  <span key={valArr[i]} className="valHeaderRow">
                    {valArr[i] + " "}
                  </span>
                );
                lastOne = valArr;
              }
            }
          })}
        </section>
        <section className="datalibrary">
          {g.map(function (interVal) {
            let keyArr = Object.keys(interVal);
            let valArr = Object.values(interVal);

            let retSet = [];

            for (let i = 0; i < keyArr.length; i++) {

              // if (keyArr[i] === "$loki") {
              //   lastkey = valArr[i];
              // }

              if (keyArr[i] === "locator") {
                lastkey = valArr[i];
              }

              if (typeof keyArr[i] === "object") {
              } else {
                retSet.push(
                  <span key={keyArr[i]} className="valHeaderRow">
                    {keyArr[i] + " "}
                  </span>
                );
              }
              if (i === keyArr.length - 1) {
                retSet.push(<div className="endDividerHead" />);
              }
            }

            for (let i = 0; i < valArr.length; i++) {
              if (typeof valArr[i] === "object") {
                retSet.push(
                  <span key={valArr[i]} className="valSheetRow">
                    <SpreadsheetCoreRecursiveClick spreadsheetdata={valArr[i]} table={theTable} store={theStore} />
                  </span>
                );
              }
              else {

                retSet.push(
                  <span key={valArr[i]} className="valSheetRow">
                    {/* <Link href="/Edit" tuple={lastkey} val={valArr[i]}>
                      <a>{valArr[i] + " "}</a>
                    </Link> */}
                    <Link href={{ pathname: '/Edit', query: { tuple: lastkey, val: valArr[i], store: theStore, table: theTable, objprop: keyArr[i]} }}>
                      <a>{valArr[i] + " "}</a>
                    </Link>
                    {/* <a href={"/Edit/tuple/" + lastkey + "/val/" + valArr[i]}></a> */}
                  </span>
                );
              }
              if (i === keyArr.length - 1) {
                retSet.push(<div className="endDivider" />);
              }
            }

            return [...retSet];
          })}
        </section>
        <style jsx>{`
          .spread {
            font-family: "Ubuntu Mono", "Inconsolata", "Hack", "Fira Code", Menlo, monospace;
          }
          .keylibrary {
            display: flex;
            flex-direction: row;
          }
          span.valHeaderRow {
            background-color: lightblue;
            margin-top: 12px;
            margin-right: 10px;
            margin-bottom: 0.6rem;
            line-height: 1.3;
            text-align: left;
            padding-right: calc(1rem + 2.1vw);
          }
          span.valSheetRow {
            background-color: lightgray;
            margin-top: 12px;
            margin-right: 10px;
            margin-bottom: 0.6rem;
            line-height: 1.3;
            text-align: left;
            padding-right: calc(1rem);
          }
          span.valSheetRow a {
            text-decoration: none;
            color: black;
          }
        `}</style>
      </div>
    );
  }
}

export default SpreadsheetCoreRecursiveClick;
