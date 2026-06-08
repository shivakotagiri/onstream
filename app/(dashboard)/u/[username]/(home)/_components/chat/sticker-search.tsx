import { Search } from "@/components/search";
import { useState } from "react";

export default function StickerSearch() {
    const [value, setValue] = useState<string>("");
    return (
        <Search placeholder="Search stickers" value={value} setValue={setValue} />
    )
}