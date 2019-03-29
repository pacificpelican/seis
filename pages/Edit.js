//  seis Edit copyright 2017-2019
//  Edit.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

import { withRouter } from 'next/router';

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";

import Headernav from "./Headernav";

function reloadOnce() {
  console.log("about to reload");
  return window.location.reload();
}

class Edit extends Component {
  state = {
    Ok: true,
    entry: "",
    cryptonowNumber: 0,
    userObjectAsk: "_",
    wildMode: true
  };

  constructor(props) {
    super();

    this.handlecValueChange = this.handlecValueChange.bind(this);
  }

  handlecValueChange = event => {
    console.log(event.target.value);
    let capturedVal = event.target.value;
    this.setState({ userObjectAsk: capturedVal });
  };

  handlesubmit = event => {
    const {router} = this.props;
    console.log(router);
    console.log("about to update collection");
    let cont = this.letServerUpdate(
      router.query.store,
      router.query.table,
      router.query.tuple,
      router.query.val,
      router.query.objprop,
      this.state.userObjectAsk
    );
  };

  letServerUpdate(store, obj, tuple, objprop, objkey, newval) {
    console.log("running letServerUpdate");
    let apiUrlPrefix = "";
    let dest;

    dest =
      apiUrlPrefix +
      "/api/1/updatedata/db/" +
      store +
      "/object/" +
      obj +
      "/objprop/" +
      objprop +
      "/objkey/" +
      objkey +
      "/newval/" +
      newval +
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
    const {router} = this.props;
    this.setState({ userObjectAsk: router.query.val });
  }

  goBack() {
    window.history.back();
  }

  render(props) {
    const {router} = this.props;
    const tuple = router.query.tuple;
    let val = router.query.val;
    let store = router.query.store;
    let table = router.query.table;
    let prop = router.query.objprop;

    return (
      <div id="editContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>

        <Headernav />

        <h1 id="desk">
          apple-picker Object Prop Editor
          <span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>

        <section id="user-input">
          <Input
            id="crypto_output"
            onChange={this.handlecValueChange}
            value={this.state.userObjectAsk}
          />
          <Button
            onClick={this.handlesubmit}
            variant="contained"
            color="primary"
            id="lookupDB"
          >
            update in DB
          </Button>
        </section>
        <Card>
          <section id="propsInfo">
            <span>
              val: {val}
              <br />
              tuple: {tuple}
              <br />
              table: {table}
              <br />
              store: {store}
              <br />
              prop: {prop}
            </span>
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

export default withRouter(Edit);
