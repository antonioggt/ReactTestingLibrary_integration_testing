import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const poke1 = screen.getByText(/pikachu/i);
    expect(poke1).toBeInTheDocument();
    userEvent.click(nextBtn);
    const poke2 = screen.getByText(/charmander/i);
    expect(poke2).toBeInTheDocument();
    userEvent.click(nextBtn);
    const poke3 = screen.getByText(/caterpie/i);
    expect(poke3).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);
    const lengthPoke = screen.getAllByText(/pikachu/i);
    expect(lengthPoke).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();

    const eletricBtn = screen.getByRole('button', {
      name: /electric/i,
    });
    expect(eletricBtn).toBeInTheDocument();

    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(fireBtn).toBeInTheDocument();

    const bugBtn = screen.getByRole('button', {
      name: /bug/i,
    });
    expect(bugBtn).toBeInTheDocument();

    const poisonBtn = screen.getByRole('button', {
      name: /poison/i,
    });
    expect(poisonBtn).toBeInTheDocument();

    const psychicBtn = screen.getByRole('button', {
      name: /psychic/i,
    });
    expect(psychicBtn).toBeInTheDocument();
    const normalBtn = screen.getByRole('button', {
      name: /normal/i,
    });
    expect(normalBtn).toBeInTheDocument();

    const dragonBtn = screen.getByRole('button', {
      name: /dragon/i,
    });
    expect(dragonBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(resetBtn).toBeInTheDocument();
  });

  it('Os botões devem ser capturados pelo data-testid=pokemon-type-button, exceto o botão All', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(7);
  });

  it('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const text = screen.getByText(/pikachu/i);
    expect(text).toBeInTheDocument();
  });
});
