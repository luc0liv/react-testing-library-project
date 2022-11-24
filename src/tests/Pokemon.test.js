import React from 'react';
import { screen } from '@testing-library/react';
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
});
