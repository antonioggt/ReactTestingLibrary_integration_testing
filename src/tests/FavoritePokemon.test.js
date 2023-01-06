import { render, screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';

describe('Testa o componente <FavoritePokemon />', () => {
  it('', () => {
    render(FavoritePokemon);
    const notFoundTxt = screen.getByText('No favorite Pokémon found');
    const heading = screen.getByRole('heading', {
      name: /favorite pokémon/i,
    });
    expect(notFoundTxt).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
