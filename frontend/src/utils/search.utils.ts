import type { SearchArtist, SearchPainting, SearchExhibition } from '../api/search.api';

const normalize = (s: string) => s.toLowerCase().trim();
const matches = (text: string, query: string) =>
    normalize(text).includes(normalize(query));

export const filterSearchResults = (
    data: { artists: SearchArtist[]; paintings: SearchPainting[]; exhibitions: SearchExhibition[] },
    query: string
) => {
    const q = query.trim();
    if (!q) return data;

    return {
        artists: data.artists.filter(
            (a) =>
                matches(a.name, q) ||
                matches(a.surname, q) ||
                matches(a.second_name ?? '', q)
        ),
        paintings: data.paintings.filter(
            (p) =>
                matches(p.title, q) ||
                matches(p.description ?? '', q)
        ),
        exhibitions: data.exhibitions.filter(
            (e) =>
                matches(e.title, q) ||
                matches(e.description ?? '', q)
        ),
    };
};
