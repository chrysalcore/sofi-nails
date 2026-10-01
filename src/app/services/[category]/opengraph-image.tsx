import { categories } from "@/app/_lib/data/categories";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/jpeg";

export const alt =
    "Treatments at Sofi Nails & Lashes Spa, a beauty salon in Salem, VA";

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

    return new Response(
        await sharp(source)
            .resize(size.width, size.height, { fit: "cover" })
            .jpeg({ quality: 80, mozjpeg: true })
            .toBuffer(),
        { headers: { "Content-Type": contentType } },
    );
}
