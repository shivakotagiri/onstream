"use server";
import { GiphyFetch } from "@giphy/js-fetch-api";
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API!);
export async function getStickers(value: string) {
    const data = await gf.search(value, {
        type: "stickers",
        offset: 10,
        limit: 25,  
    });
    return data;
}