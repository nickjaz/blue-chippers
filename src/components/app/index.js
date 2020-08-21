import React from 'react';
import players from '../../data/players.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      undrafted: [],
      drafted: []
    };

    this.initUndraftedList = this.initUndraftedList.bind(this);
    this.draftPlayer = this.draftPlayer.bind(this);
    this.randomizeSkill = this.randomizeSkill.bind(this);
    this.diceRoll = this.diceRoll.bind(this);
    this.getPlayerPotential = this.getPlayerPotential.bind(this);
  }

  componentDidMount() {
    this.initUndraftedList();
  };

  initUndraftedList() {
    let tempPlayers = players.map(p => {
      let potential = this.getPlayerPotential(p.stars);
      console.log(potential);
      p.potential = potential;

      let skill = this.randomizeSkill(p.potential.min, p.potential.max);
      p.skill = skill;
      console.log(p);
      return p;
    })

    this.setState({
      undrafted: tempPlayers
    })
  }

  draftPlayer(player) {
    let {undrafted, drafted} = this.state;

    let tempUndrafted = undrafted.filter(p => {
      return p !== player
    });

    let tempDrafted = drafted;

    tempDrafted.push(player);

    this.setState({
      undrafted: tempUndrafted,
      drafted: tempDrafted
    })
  }

  randomizeSkill(min, max) {
    let dif = max - min;
    let rand = Math.round(Math.random() * dif);

    return max - rand;
  }

  diceRoll(sides) {
    return Math.floor(Math.random() * sides);
  }

  getPlayerPotential(stars) {
    let twoDSix = this.diceRoll(6) + this.diceRoll(6);
    console.log(twoDSix);

    if (twoDSix === 2 || twoDSix === 3) {
      switch(stars) {
        case 5:
          return { min: 5, max: 7, value: 'bust' };
        case 4:
          return { min: 4, max: 6, value: 'bust' };
        case 3:
          return { min: 3, max: 5, value: 'bust' };
        case 2:
          return { min: 2, max: 4, value: 'bust' };
        case 1:
          return { min: 1, max: 3, value: 'bust' };
        default:
          return { min: 3, max: 5, value: 'bust' };
      }
    } else if (twoDSix === 11 || twoDSix === 12) {
      switch(stars) {
        case 5:
          return { min: 10, max: 10, value: 'superstar' };
        case 4:
          return { min: 8, max: 10, value: 'gem' };
        case 3:
          return { min: 7, max: 9, value: 'gem' };
        case 2:
          return { min: 6, max: 8, value: 'gem' };
        case 1:
          return { min: 5, max: 7, value: 'gem' };
        default:
          return { min: 7, max: 9, value: 'gem' };
      }
    } else {
      switch(stars) {
        case 5:
          return { min: 8, max: 10, value: '' };
        case 4:
          return { min: 7, max: 9, value: '' };
        case 3:
          return { min: 6, max: 8, value: '' };
        case 2:
          return { min: 5, max: 7, value: '' };
        case 1:
          return { min: 4, max: 6, value: '' };
        default:
          return { min: 6, max: 8, value: '' };
      }
    }
  }

  render() {
    let {undrafted, drafted} = this.state;
    let undraftedList = [];
    let draftedList = [];

    undrafted.map((p, i) => {
      undraftedList.push(
        <li className={'player ' + i} key={i} style={{"display": "inline-block", "margin": "10px"}}>
          <div>{p.name}</div>
          <div>{p.position.toUpperCase()}</div>
          <div>{p.stars}</div>
          <button onClick={() => this.draftPlayer(p)}>draft</button>
        </li>
      )
    })

    drafted.map((p, i) => {
      draftedList.push(
        <li className={'player ' + i} key={i} style={{"display": "inline-block", "margin": "10px"}}>
          <div>{p.name}</div>
          <div>{p.position.toUpperCase()}</div>
          <div>{p.skill}</div>
        </li>
      )
    })

    return (
      <div className="App">
        <div>
          {undraftedList}
        </div>
        <div>
          {draftedList}
        </div>
      </div>
    );
  }
}
