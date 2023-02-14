import userEvent from '@testing-library/user-event';
import React from 'react';
import {  screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { questionsResponse, invalidTokenQuestionsResponse } from '../../cypress/mocks/questions';


const INITIAL_STATE = {
  player: {
    name: 'Diego Alves',
    gravatarEmail: 'diego.castroalves1@gmail.com',
    assertions: 0,
    score: 0,
  }
};

describe('Tela de Game', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockImplementation(() => questionsResponse),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa se os elementos da página game são exibidos de forma correta', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => {
      const categoryElement = screen.getByTestId('question-category');
      expect(categoryElement).toBeInTheDocument()
      const correctBtn = screen.getByTestId('correct-answer');
      userEvent.click(correctBtn);
      const next = screen.getByTestId('btn-next');
      expect(next).toBeInTheDocument();
      userEvent.click(next);
      const wrongBtn = screen.getAllByTestId(/wrong-answer/i);
      expect(wrongBtn).toHaveLength(3);
    });
  });

  

  

  it(' testa o caso do token vir inválido', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockImplementation(() => invalidTokenQuestionsResponse),
    });
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });


 
  })
 it(' testa o caso de todas as respostar terem sido respondidas corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
  await waitFor(() => {
    const correctBtn = screen.getByTestId('correct-answer');
    userEvent.click(correctBtn);


  });
  for (let index = 0; index < 5; index += 1) {
    const correctBtn = screen.getByTestId('correct-answer');
    userEvent.click(correctBtn);
    const next = screen.getByTestId('btn-next');
    userEvent.click(next);  }
    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback');
    });

  



 
  })






});