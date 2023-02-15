import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
// https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

describe('Teste componente <Ranking />', () => {
  describe('1. Testa se os elementos do ranking são renderizados corretamente', () => {
    const MOCK_STATE = {
      login: {
      player: {
        score: '350',
        assertions: '4',
      }
    }
  }
    test('1.2 - Verifica se os elementos texto de ranking, pontuação total e o nome do jogador é renderizado', () => {

      const MOCK_LOCALSTORAGE = {
        name: "William Nunes",
        score: 134,
        picture: "https://www.gravatar.com/avatar/827e383ec40fec501bd3359e4f1ed727",
      }
      localStorage.setItem('ranking', JSON.stringify([MOCK_LOCALSTORAGE]))

      renderWithRouterAndRedux(<App />, MOCK_STATE, '/ranking');
      
      const rankingTitle = screen.getByTestId('ranking-title');
      const playerName = screen.getByTestId(`player-name-0`);
      const score = screen.getAllByTestId(`player-score-0`)[0];

      expect(rankingTitle).toBeInTheDocument();
      expect(playerName).toBeInTheDocument();
      expect(score).toBeInTheDocument();
    });

    test('1.3 - Verifica se o botão de jogar novamente direciona para à página de login', () => {

      localStorage.clear();
       const { history } = renderWithRouterAndRedux(<App />, MOCK_STATE, '/ranking');

      const btnHome = screen.getByTestId('btn-go-home');

      userEvent.click(btnHome);

      expect(history.location.pathname).toBe('/');
    
    });
  });
});