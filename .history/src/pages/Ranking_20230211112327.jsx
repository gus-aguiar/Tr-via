// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGravatar } from '../helpers/apiTrivia';

class Ranking extends Component {
  state = {
    imageGravatar: '',
  };

  async componentDidMount() {
    const imageGravatar = await getGravatar();
    this.setState({ imageGravatar });
  }

  render() {
    const { imageGravatar } = this.state;
    // const {player}=this.props
    // const playerValues = Object.values(player)
    // const playersReturn = [...playerValues,imageGravatar]
    // console.log(playersReturn);

    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <Link to="/">
          <button data-testid="btn-go-home">
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
