import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const text1Content = 'One can filter Pokémon by type, and see more details for each one of them';
    const text2Content = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const text2 = screen.getByText(text2Content);
    const text1 = screen.getByText(text1Content);
    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(text2).toBeInTheDocument();
    expect(text1).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgSrc);
  });
});
