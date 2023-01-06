import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <PokemonDetails />', () => {
  const magicString = 'More details';
  it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const heading = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação quando selecionado para ver os detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const detailsLinkAfterClick = screen.queryByRole('link', {
      name: magicString,
    });
    expect(detailsLinkAfterClick).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve renderizar um h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const heading = screen.getByRole('heading', { name: /Summary/i });
    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve renderizar um parágrafo com um resumo do Pokémon que está sendo monstrado', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const pContent = /this intelligent pokémon/i;
    const paragraph = screen.getByText(pContent);
    expect(paragraph).toBeInTheDocument();
  });

  it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const heading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const text = screen.getByText(/kanto viridian forest/i);
    expect(text).toBeInTheDocument();
  });

  it('Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const text = screen.getByText(/kanto viridian forest/i);
    expect(text).toBeInTheDocument();
    const altTextArr = screen.getAllByAltText(/pikachu location/i);
    const verifySrc = altTextArr.map((e) => e.src);
    expect(verifySrc).toEqual([
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ]);
  });

  it('A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const altTexts = screen.getAllByAltText(/pikachu location/i);
    expect(altTexts).toHaveLength(2);
  });

  it('A pagina deve renderizar um checkbox que permite favoritar o pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkbox).toBeInTheDocument();
  });

  it('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: magicString,
    });
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(checkbox);
    const img = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(img).toBeInTheDocument();
    userEvent.click(checkbox);
    const imgAfterClick = screen.queryByAltText(/pikachu is marked as favorite/i);
    expect(imgAfterClick).not.toBeInTheDocument();
  });
});
