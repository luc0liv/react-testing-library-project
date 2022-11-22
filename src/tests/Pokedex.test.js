import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import { Pokedex } from '../pages';

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

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const encountered = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(encountered).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    // const pikachu = screen.getByText(/pikachu/i);
    // expect(pikachu).toBeInTheDocument();
    // const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    // expect(nextButton).toBeInTheDocument();
    // userEvent.click(nextButton);
    // const charmander = screen.getByText(/charmander/i);
    // expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    // expect(charmander).toBeInTheDocument();
    pokemonList.forEach((pokemon) => {
      const poke = screen.getByText(pokemon.name);
      const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);
      expect(poke).toBeInTheDocument();
    });
  });

  // it('Teste se a Pokédex tem os botões de filtro', () => {
  //   renderWithRouter(<Pokedex
  //     pokemonList={ pokemonList }
  //     isPokemonFavoriteById={ favoritePokemons }
  //   />);

  // });
});
