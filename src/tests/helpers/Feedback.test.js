import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { act } from 'react-dom/test-utils';
import Feedback from '../../pages/Feedback';
import 'jest-localstorage-mock';
import App from '../../App';

// beforeEach(() => {
//   localStorage.clear();
// });

describe('Tela de Feedback', () => {
  it(' testa se a tela exibe as informações corretas', async () => {
  const initialState = {
    player: {
      name: 'Diego Alves',
      gravatarEmail: 'diego.castroalves1@gmail.com',
      assertions: 2,
      score: 140
    }}
  const { history, store } = renderWithRouterAndRedux(<Feedback />, initialState 
  );
  
  const playAgainButton = screen.getByRole('button', {
    name: /play again/i
  });
  const rankingButton = screen.getByRole('button', {
    name: /ranking/i
  })
  const feedBackMessage = screen.getByText(/could be better\.\.\./i);
  const totalScore = screen.getByTestId("feedback-total-score");
  const totalAssertions = screen.getByTestId("feedback-total-question");
  const headerName = screen.getAllByTestId("header-player-name");
  expect(playAgainButton).toBeInTheDocument();
  expect(rankingButton).toBeInTheDocument();
  expect(feedBackMessage).toBeInTheDocument();
  expect(totalScore.innerHTML).toBe('140'); 
  expect(totalAssertions.innerHTML).toBe('2');
  expect(headerName[1].innerHTML).toBe('Diego Alves');


  })

  it('testa o botão de play again e o botão de ranking', async () => {
    const initialState = {
      player: {
        name: 'Diego Alves',
        gravatarEmail: 'diego.castroalves1@gmail.com',
        assertions: 2,
        score: 140
      }}
    const { history, store } = renderWithRouterAndRedux(<Feedback />, initialState 
    );
    const rankingButton = screen.getByRole('button', {
      name: /ranking/i
    })
    await waitFor(() => {
      const playAgainBtn = screen.getByTestId('btn-play-again');
      userEvent.click(playAgainBtn);
      expect(history.location.pathname).toBe('/')
    }, 2000);
   
  })

  it('testa o botão de play again e o botão de ranking', async () => {
    // Storage.prototype.setItem = jest.fn();

    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback' 
    );
    const rankingButton = screen.getByRole('button', {
      name: /ranking/i
    })
    userEvent.click(rankingButton);
    // localStorage.setItem('ranking', JSON.stringify([]));
    // expect(localStorage.setItem).toHaveBeenCalled();
    await waitFor(() => {
      expect(history.location.pathname).toBe('/ranking')
    });
  })

});
