import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import App from '../../App';
import { act } from 'react-dom/test-utils';

describe('Tela de Login', () => {
  it(' as informações iniciais da tela, para iniciar o jogo', async () => {

  const { history } = renderWithRouterAndRedux(<App />);

  const inputName = screen.getByTestId("input-player-name");
  const inputEmail = screen.getByTestId("input-gravatar-email");
  const button = screen.getByTestId("btn-play");

  expect(inputName).toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  userEvent.type(inputName, 'xablau');
  expect(button).toBeDisabled();

  userEvent.type(inputEmail, 'xablau');
  expect(button).toBeDisabled();

  userEvent.type(inputEmail, 'xablau@gmail.com');
  expect(button).toBeEnabled();

  userEvent.type(inputName , 'nomeTeste')
    userEvent.type(inputEmail, 'teste@teste.com')

    expect(button).not.toHaveAttribute('disabled')

    userEvent.click(button)

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    })
  })

  it('Testa se o botão está habilitado, quando os campos forem preenchidos e se ao clicar a página é redirecionada para a página de game.', async () => {
    const tokenMock = {
      response_code: 0,
      response_message:"Token Generated Successfully!",
      token:"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => tokenMock,
    });
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");

    userEvent.type(inputName);
    userEvent.type(inputEmail);

    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();

    act(() =>  userEvent.click(buttonPlay));
  });

    it('Botão Settings que leva para tela de Configuração do jogo', () => {
    renderWithRouterAndRedux(<App />);
      
    const buttonSettings = screen.getByTestId("btn-settings");

    expect(buttonSettings).toBeInTheDocument();
    
    userEvent.click(buttonSettings);
        const title = screen.getByTestId("settings-title");

    const textSetting = screen.getByRole('heading', {
        name: /settings page/i,
    });

    expect(textSetting).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    })
});
