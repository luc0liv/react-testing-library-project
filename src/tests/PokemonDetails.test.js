import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import { PokemonDetails } from '../pages';
import { PokemonData } from '../components';
import App from '../App';

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

const selectedPokemon = pokemonList.find((pokemon) => pokemon.id === 25);

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  beforeEach(() => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritePokemons }
        match={ matchProp }
        pokemonList={ pokemonList }
        onUpdateFavoritePokemon={ jest.fn() }
      />,
    );
  });
  it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const pokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(detailsLink).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    const paragraph = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritePokemons }
        match={ matchProp }
        pokemonList={ pokemonList }
        onUpdateFavoritePokemon={ jest.fn() }
      />,
    );
    const locations = screen.getByRole('heading', {
      name: `Game Locations of ${selectedPokemon.name}`,
    });
    expect(locations).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    renderWithRouter(<PokemonData pokemon={ selectedPokemon } />);

    const locationMap = screen.getAllByRole('img');
    locationMap.forEach((location) => {
      expect(location).toBeInTheDocument();
      expect(location).toHaveAttribute('src', location.src);
      expect(location).toHaveAttribute(
        'alt',
        `${selectedPokemon.name} location`,
      );
    });
  });
});

describe('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${selectedPokemon.id}`);

    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const faveFalse = screen.queryByAltText(
      `${selectedPokemon.name} is marked as favorite`,
    );
    expect(faveFalse).not.toBeInTheDocument();

    expect(check).toBeInTheDocument();
    expect(check).not.toBeChecked();

    userEvent.click(check);

    expect(check).toBeChecked();
    const faveTrue = screen.getByAltText(
      `${selectedPokemon.name} is marked as favorite`,
    );
    expect(faveTrue).toBeInTheDocument();
  });
});
