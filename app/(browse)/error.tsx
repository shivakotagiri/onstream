"use client";

import ErrorContent from "@/components/error-content";
import ErrorImage from "@/components/error-image";

export default function ErrorPage() {
    return (
        <div className="grid min-h-screen w-screen grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-8 py-16">
                <ErrorContent />
            </div>
            <div className="hidden lg:block">
                <ErrorImage />
            </div>
        </div>
    );
}