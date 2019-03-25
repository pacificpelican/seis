//  seis SpreadsheetCore copyright 2017-2018
//  SpreadsheetCore.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

let lastkey = null;

class SpreadsheetCoreRecursive extends Component {
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

    var g;
    if (this.props.spreadsheetdata[0] !== undefined) {
      g = [{}, ...this.props.spreadsheetdata];
    }
    else {
      g = [this.props.spreadsheetdata];
    }

    return (
      <div id="desk" className="mlBench-content">
        <section id="keylibrary">
          {g.map(function (interVal) {
            let valArr = Object.keys(interVal);

            let retSet = [];
            let lastOne = "";

            for (let i = 0; i < valArr.length; i++) {
              if (typeof valArr[i] === "object") {
                //         do nothing
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
        <section id="datalibrary">
          {g.map(function (interVal) {
            let keyArr = Object.keys(interVal);
            let valArr = Object.values(interVal);

            if (keyArr[0] === "key") {
              lastkey = valArr[0];
            }

            let retSet = [];

            for (let i = 0; i < keyArr.length; i++) {
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
                    <SpreadsheetCoreRecursive spreadsheetdata={valArr[i]} />
                  </span>
                );
              } 
              else {
                
                retSet.push(
                  <span key={valArr[i]} className="valSheetRow">
                    {valArr[i] + " "}
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
        <style>{`
          .spread {
            font-family: "Ubuntu Mono", "Inconsolata", "Hack", "Fira Code", Menlo, monospace;
          }
          span.valSheetRow {
            background-color: lightgray;
            margin-top: 12px;
            margin-right: 10px;
            margin-bottom: 0.6rem;
            line-height: 1.3;
          }
          span.valHeaderRow {
            background-color: lightblue;
            margin-top: 12px;
            margin-right: 10px;
            margin-bottom: 0.6rem;
            line-height: 1.3;
          }
        `}</style>
      </div>
    );
  }
}

export default SpreadsheetCoreRecursive;
