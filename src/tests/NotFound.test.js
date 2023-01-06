import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <NotFound />', () => {
  it('', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgSrc);
  });
});
