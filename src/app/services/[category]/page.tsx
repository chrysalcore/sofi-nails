import { Metadata } from "next";
import Service from "./_components/service";
import { serviceList } from "@/app/_lib/data/services";
import { categories } from "@/app/_lib/data/categories";
import { serviceKeywords } from "@/app/_lib/keywords";

const SITE_NAME = "Sofi Nails & Lashes Spa";

type Props = {
    params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category: path } = await params;
    const category = categories.get(path);
    const title = `${category?.title} | ${SITE_NAME}`;

    return {
        title,
        description: category?.desc,
        keywords: serviceKeywords[path],
        alternates: {
            canonical: `/services/${path}`,
        },
        openGraph: {
            title,
            description: category?.desc,
            url: `https://sofinailsandlashesspa.com/services/${path}`,
            siteName: SITE_NAME,
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: category?.desc,
        },
    };
}

export default async function ServicePage({ params }: Props) {
    const { category } = await params;

    const services = serviceList.find(
        (item) => item.category.path === category,
    )?.services;

    return (
        <ul className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services?.map((item) => (
                <Service {...item} key={item.info[0].name} />
            ))}
        </ul>
    );
}
