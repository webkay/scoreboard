/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

console.log('Hello World from Webpacker')

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

// import '../src/application.css';

var PLAYERS = [
  {name: "International House of Pancakes", score: 31, id: 1},
  {name: "Tatsu Ramen", score: 33, id: 2},
  {name: "Jersey Mike's Subs", score: 42, id: 3}
];

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

function Counter (props) {
  return (
    <div className="counter">
      <div className="counter-score"> {props.score} </div>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

var Application = createReactClass({
  propTypes: {
    title: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      title: 'Scoreboard'
    };
  },
  getInitialState: function() {
    return {
      players: this.props.initialPlayers
    };
  },
  componentDidMount: function() {
    var request = new Request('/players', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request).then(function(response){
      return response.json();
    }).then(function(players){
      this.setState({
        players: players
      });
    }.bind(this)).catch(function(error){

      console.error(error);
    });
  },
  onChange: function(e) {
    e.preventDefault();
    this.setState({
      player: e.target.value
    })
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div>
          {this.state.players.map(function (player, index) {
            return (<Player name={player.name} key={player.id} />);
          }.bind(this))}
        </div>
      </div>
    );
  }
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application initialPlayers={PLAYERS} />,
    document.body.appendChild(document.createElement('div')),
  )
})
