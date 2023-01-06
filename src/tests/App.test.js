import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <App />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    const favoritePokemonLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  it('Se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const buttons = screen.getAllByRole('button');
    const heading = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(buttons).toHaveLength(9);
    expect(heading).toBeInTheDocument();
  });

  it('Se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    const textContent = 'One can filter Pokémon by type, and see more details for each one of them';
    const text = screen.getByText(textContent);
    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(text).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it('Se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoritePokemonLink);
    const textContent = 'No favorite Pokémon found';
    const text = screen.getByText(textContent);
    const heading = screen.getByRole('heading', {
      name: 'Favorite Pokémon',
      level: 2,
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(text).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it('Se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not-found');
    });
    const notFoundTxt = screen.getByRole('heading', { name: /page requested not found/i });
    const image = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(notFoundTxt).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
