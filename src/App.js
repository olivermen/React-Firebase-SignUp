import React, { Component } from "react";
import logo from "./logo.png";
import movie from "./logo-movie.mp4";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import * as routes from "./constants/routes";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import { firebase, auth } from "./firebase";

const UnauthenticatedHomeContent = () => {
  return (
    <React.Fragment>
      <p></p>
    </React.Fragment>
  );
};

const AuthenticatedHomeContent = ({ authUser }) => {
  return <p>Welcome back, {authUser.email}!</p>;
};

class Home extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ authUser }) => (
          <div>
            {!authUser && <UnauthenticatedHomeContent />}
            {authUser && <AuthenticatedHomeContent authUser={authUser} />}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

class SignOut extends React.Component {
  signOut = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return auth
      .doSignOut()
      .then((response) => {
        console.log("successfully signed out", response);
      })
      .catch((err) => {
        console.log("failed to sign out", err);
      });
  };

  componentDidMount() {
    this.signOut();
  }

  render() {
    return <Redirect to={routes.HOME_PATH} />;
  }
}

const AuthenticatedNavigation = () => {
  return (
    <React.Fragment>
      <li>
        <Link to={routes.SIGN_OUT_PATH}>
          <button className="App-button" type="submit">
            Sign Out
          </button>
        </Link>
      </li>
    </React.Fragment>
  );
};

const UnauthenticatedNavigation = () => {
  return (
    <React.Fragment>
      <li>
        <Link to={routes.SIGN_UP_PATH}>
          <button className="App-button" type="submit">
            Sign Up
          </button>
        </Link>
      </li>
      <li>
        <Link to={routes.SIGN_IN_PATH}>
          <button className="App-button" type="submit">
            Sign In
          </button>
        </Link>
      </li>
    </React.Fragment>
  );
};

const Navigation = () => {
  return (
    <AuthContext.Consumer>
      {({ authUser }) => (
        <nav>
          <ul>
            {/* <li>
              <Link to={routes.HOME_PATH}>Home</Link>
            </li> */}
            {authUser && <AuthenticatedNavigation />}
            {!authUser && <UnauthenticatedNavigation />}
          </ul>
        </nav>
      )}
    </AuthContext.Consumer>
  );
};

const AuthContext = React.createContext({ authUser: null });

class AuthProvider extends React.Component {
  state = {
    authUser: null,
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{ authUser: this.state.authUser }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="App-movie">
                <video src={movie} width="1900" autoPlay loop muted />
              </div>
            </header>
            <div className="App-sign">
              <h1 className="App-h1">
                Join <img src={logo} className="App-h1-logo" alt="logo" />{" "}
              </h1>

              {/* <Navigation /> */}
              <Switch>
                <Route exact path={routes.HOME_PATH} component={SignUp} />
                <Route exact path={routes.SIGN_UP_PATH} component={SignUp} />
                <Route exact path={routes.SIGN_IN_PATH} component={SignIn} />
                <Route exact path={routes.SIGN_OUT_PATH} component={SignOut} />
              </Switch>
            </div>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
