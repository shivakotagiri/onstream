"use client";

import { useEffect, useRef, useState } from "react";
import { IGif } from "@giphy/js-types";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

export function LoadStickers() {
  const [stickers, setStickers] = useState<IGif[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);

    try {
        const { data } = await gf.trending({
            type: "stickers",
            offset,
            limit: 25,
            rating: "pg-13",
        });

        setStickers((prev) => {
            const existingIds = new Set(prev.map((gif) => gif.id));
            const newStickers = data.filter(
                (gif) => !existingIds.has(gif.id)
            );
            return [...prev, ...newStickers];
        });

        setOffset((prev) => prev + 25);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }};

    useEffect(() => {
        loadMore();
    }, []);

    const handleScroll = () => {
        const el = containerRef.current;
        if (!el || loading) return;

        const reachedBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 100;

        if (reachedBottom) {
            loadMore();
        }
    };

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
            />
        ))}
        </div>
    );
}