import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'
import Landing from './containers/Landing'
import LandingCards from './components/LandingCards'
import UserManifestsContainer from './containers/UserManifestsContainer'
import ManifestContainer from './containers/ManifestContainer'
import {Row, Col, Card,Icon} from 'react-materialize'
import BasicLayout from './BasicLayout'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navigation />
      <Landing />
      <LandingCards />
    </div>
  )
}

const editCollection = (items) => {
  return (
    <div>
      <UserManifestsContainer />
    </div>
  )
}

const manageManifests = () => {
  return(
    <div>
      <ManifestContainer />
    </div>
  )
}

const test = () => {
  return (
    <div>
      <BasicLayout />

    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/test' render={test} />

            {/* login, signup, my packlists */}
            <Route path='/mycollections' render={manageManifests} />
            <Route path='/collections/:id' render={editCollection} />
            <Route exact path='/' render={Home}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
