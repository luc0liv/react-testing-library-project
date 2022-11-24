import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

const pokemonProps = {
  pokemon: {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { measurementUnit: 'kg', value: '6.0' },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [{
      location: 'Kalocationnto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' },
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  isFavorite: true,
  showDetailsLink: true,
};

const { pokemon, isFavorite } = pokemonProps;

describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('O tipo correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const eletricType = screen.getByText(/electric/i);
    expect(eletricType).toBeInTheDocument();
  });

  it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);
    const { averageWeight: { value, measurementUnit } } = pokemon;
    const weightText = screen.getByText(`Average weight: ${value} ${measurementUnit}`);

    expect(weightText).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const pokemonImage = screen.getByRole('img', { name: `${pokemon.name} sprite` });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pokemon.id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  it('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const faveIcon = screen.getByRole('img', { name: `${pokemon.name} is marked as favorite` });
    expect(faveIcon).toBeInTheDocument();
    expect(faveIcon).toHaveAttribute('src', '/star-icon.svg');
  });

  it('A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite, onde <Pokemon> é o nome do Pokémon exibido.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const faveIcon = screen.getByRole('img', { name: `${pokemon.name} is marked as favorite` });
    expect(faveIcon).toBeInTheDocument();
    expect(faveIcon).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
