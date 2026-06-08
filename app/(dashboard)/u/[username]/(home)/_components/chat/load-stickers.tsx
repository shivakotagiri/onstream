"use client";

import { Dispatch, ReactEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { IGif } from "@giphy/js-types";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

interface LoadStickersProps {
    onSubmit: (data: string) => void;
    isDisabled: boolean,
    isChatDelayed: boolean,
    isDelayBlocked: boolean,
    setIsDelayBlocked: Dispatch<SetStateAction<boolean>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function LoadStickers({ onSubmit, isChatDelayed, isDelayBlocked, setOpen, setIsDelayBlocked, isDisabled }: LoadStickersProps) {
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
                rating: "y",
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
        }
    };

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