import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const pokemonEmptyList = [];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonEmptyList } />);
    const message = screen.getByText(/no favorite pokémon found/i);
    expect(message).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    const message = screen.queryByText(/no favorite pokémon found/i);
    expect(message).not.toBeInTheDocument();
    pokemonList.forEach((pokemon) => {
      const poke = screen.getByRole('img', { name: `${pokemon.name} is marked as favorite` });
      expect(poke).toBeInTheDocument();
    });
  });
});
