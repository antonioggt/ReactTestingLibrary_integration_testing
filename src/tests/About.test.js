import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
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
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(text2).toBeInTheDocument();
    expect(text1).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
