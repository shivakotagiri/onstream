import Image from "next/image";

export default function ErrorImage() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-primary dark:bg-primary">
            <Image
                src="/error-image.webp"
                fill
                alt="Error"
                className="object-contain"
                priority
            />
        </div>
    );
}