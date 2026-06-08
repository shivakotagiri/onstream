"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IGif } from "@giphy/js-types";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

interface LoadStickersProps {
    searchedQuery: string,
    onSubmit: (data: string) => void;
    isDisabled: boolean,
    isChatDelayed: boolean,
    isDelayBlocked: boolean,
    setIsDelayBlocked: Dispatch<SetStateAction<boolean>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function LoadStickers({ searchedQuery, onSubmit, isChatDelayed, isDelayBlocked, setOpen, setIsDelayBlocked, isDisabled }: LoadStickersProps) {
    const [stickers, setStickers] = useState<IGif[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const loadMore = async (currentOffesetNumber: number, isNewSearch: boolean = false) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = searchedQuery.trim() !== "" ? 
            await gf.search(searchedQuery, {
                type: "stickers",
                offset: currentOffesetNumber,
                limit: 25,
            }):
            await gf.trending({
                type: "stickers",
                offset: currentOffesetNumber,
                limit: 25,
            });

            const data = res.data;

            setStickers((prev) => {
                if(isNewSearch) return data;

                const existingIds = new Set(prev.map((gif) => gif.id)); // i am creating a new set from all the gifs in the prev array of setState.
                const newStickers = data.filter((gif) => !existingIds.has(gif.id)); //storing new stickers of only non-duplicate ones.
                return [...prev, ...newStickers]; // now storing new + existing in stickers state.
            });

            setOffset((prev) => prev + 25);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setOffset(0);
        loadMore(0, true);
    }, [searchedQuery]);

    const handleScroll = () => {
        const el = containerRef.current;
        if (!el || loading) return;

        const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;

        if (reachedBottom) {
            loadMore(offset);
        }
    };

    function handleSubmit(value: string) {
        if (!value || isDisabled) return;

        if (isChatDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit(JSON.stringify({
                    value,
                    type: "sticker"
                }));
            }, 3000);
        } else {
            onSubmit(JSON.stringify({
                value,
                type: "sticker"
            }));
        }
        setOpen(false);
    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-scroll"
        >
        {stickers.map((sticker) => (
            <img
                key={sticker.id}
                src={sticker.images.fixed_width.url}
                alt={sticker.title}
                className="w-full aspect-square rounded-lg overflow-hidden"
                loading="lazy"
                onClick={() => handleSubmit(sticker.images.fixed_width.url)}
            />
        ))}
        </div>
    );
}