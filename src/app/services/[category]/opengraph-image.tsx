import { categories } from "@/app/_lib/data/categories";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export function generateStaticParams() {
    return Array.from(categories.keys()).map((category) => ({ category }));
}

export default async function Image({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category: path } = await params;
    const category = categories.get(path);
    const source = await readFile(
        join(process.cwd(), `public/imgs/${category?.img}`),
    );
    const png = await sharp(source)
        .resize(size.width, size.height, { fit: "cover" })
        .png()
        .toBuffer();

    return new ImageResponse(
        <div
            style={{
                display: "flex",
                width: size.width,
                height: size.height,
                overflow: "hidden",
            }}
        >
            <img
                src={`data:image/png;base64,${png.toString("base64")}`}
                alt={`${category?.name} image`}
                width={size.width}
                height={size.height}
            />
        </div>,
        size,
    );
}
