"use client";

import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

export default function Sample2() {
    // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
    const gf = new GiphyFetch('cqBKR9DjmZEymlxJzCkjJ5TQFHG3UFfW');

    // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
    const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 })

    // Render the React Component and pass it your fetchGifs as a prop
    return (
        <Grid width={800} columns={3} fetchGifs={fetchGifs} />
    )
}