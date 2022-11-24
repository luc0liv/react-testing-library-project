import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import { PokemonDetails } from '../pages';

const favoritePokemons = {
  4: false,
  10: false,
  23: true,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const matchProp = {
  path: '/pokemon/:id',
  url: '/pokemon/25',
  isExact: true,
  params: { id: '25' },
};

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favoritePokemons }
      match={ matchProp }
      pokemonList={ pokemonList }
      onUpdateFavoritePokemon={ () => favoritePokemons }
    />);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favoritePokemons }
      match={ matchProp }
      pokemonList={ pokemonList }
      onUpdateFavoritePokemon={ () => favoritePokemons }
    />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(detailsLink).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favoritePokemons }
      match={ matchProp }
      pokemonList={ pokemonList }
      onUpdateFavoritePokemon={ () => favoritePokemons }
    />);

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favoritePokemons }
      match={ matchProp }
      pokemonList={ pokemonList }
      onUpdateFavoritePokemon={ () => favoritePokemons }
    />);

    const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(paragraph).toBeInTheDocument();
  });
});
