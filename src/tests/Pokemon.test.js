import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokemon />', () => {
  const magicString = 'More details';
  it('Testa se é renderizado um card com as informações de um pokémon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText(/pikachu/i);
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokeSprite = screen.getByAltText(/pikachu sprite/i);
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeSprite).toBeInTheDocument();
  });

  it('Teste se existe um link "More Details" na pagina inicial e se ao clicar no link de detalhes é feito o redirecionamento da aplicação para a pagina de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toBe('http://localhost/pokemon/25');
    userEvent.click(detailsLink);
    const heading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a URL exibida no navegador muda para /pokemon/<id> do pokemon que esta sendo exibido', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const favPoke = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favPoke);
    const favoritedPoke = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoritedPoke).toBeInTheDocument();
    const imgSrc = '/star-icon.svg';
    expect(favoritedPoke).toHaveAttribute('src', imgSrc);
  });

  it('Testa a img do Pokémon', () => {
    renderWithRouter(<App />);
    const img = screen.getByAltText(/pikachu sprite/i);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgSrc);
  });

  it('Testa se renderiza um texto com o tipo do pokemon', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe('Electric');
  });
});
