import { createContext, useContext, useState } from "react";

type CompareContextType = {
  pokemonsIds: number[];
  togglePokemonId: (pokemonId: number) => void;
};

export const CompareContext = createContext<CompareContextType>({
  pokemonsIds: [],
  togglePokemonId: (_pokemonId: number) => {
    throw new Error("Missing <CompareProvider> in the tree");
  },
});

export function useCompare() {
    return useContext(CompareContext);
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [pokemonsIds, setPokemonsIds] = useState<number[]>([]);

    function togglePokemonId(pokemonId: number) {
        if (pokemonsIds.includes(pokemonId)) {
            setPokemonsIds(pokemonsIds.filter((id) => id !== pokemonId));
        } else if (pokemonsIds.length < 2) {
            setPokemonsIds([...pokemonsIds, pokemonId]);
        }
    }

    return (
        <CompareContext.Provider value={{ pokemonsIds, togglePokemonId }}>
            {children}
        </CompareContext.Provider>
    );
}