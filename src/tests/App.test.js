import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App.js', () => {
  it('É exibido na tela um link com o texto Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('É exibido na tela um link com o texto About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('É exibido na tela um link com o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const faveLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(faveLink).toBeInTheDocument();
  });
});
