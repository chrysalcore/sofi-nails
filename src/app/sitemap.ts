import { MetadataRoute } from "next";
import { categories } from "./_lib/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticURLs: MetadataRoute.Sitemap = [
        {
            url: "https://sofinailsandlashesspa.com",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://sofinailsandlashesspa.com/about",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: "https://sofinailsandlashesspa.com/reservation",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
    ];

    const dynamicURLs: MetadataRoute.Sitemap = Array.from(
        categories.values(),
    ).map((category) => ({
        url: `https://sofinailsandlashesspa.com/services/${category.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
    }));

    return [...staticURLs, ...dynamicURLs];
}
