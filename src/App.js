import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";

import Main from "./components/main.js";

import "./App.css";
import BookmarksPage from "./components/BookmarksPage.js";
import EnterPage from "./components/EnterPage.js";

const VK = window.VK;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };

    this.setAuth = this.setAuth.bind(this);
  }

  componentDidMount() {
    VK.Auth.getLoginStatus((res) => {
      if (res.status === "connected") {
        this.setState({ isAuth: true });
      }
    });
  }

  setAuth(res) {
    this.setState({ isAuth: res });
  }

  render() {
    let page = this.state.isAuth ? (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/bookmarks">
            <BookmarksPage onTurnBar={this.turnBar} />
          </Route>
        </Switch>
      </HashRouter>
    ) : (
      <EnterPage onAuth={this.setAuth} />
    );

    return (
      <div>
        <div
          className="modal fade"
          id="infoModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  О приложении
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="centeredText">
                  Приложение создано в
                  <br />
                  <a className="linkStyle" href="https://vk.com/warmay_studio">
                    <b>Май-студии</b>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="aboutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  О группе
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Самый лучший паблик о мультфильмах
              </div>
            </div>
          </div>
        </div>

        <img
          className="background"
          src="https://wallpaperaccess.com/full/2028393.jpg"
          alt="background"
        />
        <div className="wrapper">
          {/* <img
            className="wrapperBackground"
            src="https://i.pinimg.com/564x/bd/8c/17/bd8c17ee1fddcc9f15917ee86ebea856.jpg"
            alt="background"
          /> */}
          <div className="headerLineTop">дисней головного мозга</div>
          <div className="headerLineBot">
            <a className="linkStyle" href="https://vk.com/magic_page">
              <div className="btnInfo">
                <i className="fas fa-home"></i> на страницу
              </div>
            </a>
          </div>
          <div className="headerLeft"></div>
          <div className="headerRight"></div>
          <div className="header"></div>
          <div className="body">{page}</div>
          <div
            type="button"
            className="footer"
            data-toggle="modal"
            data-target="#infoModal"
          >
            о приложении
          </div>
        </div>
      </div>
    );
  }
}

export default App;
