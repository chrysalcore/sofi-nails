import { categories } from "../../_lib/data/categories";
import CategoryShort from "./category-short";

export default function CategoriesListShort() {
    return (
        <ul className="text-dark/70 scroll-none flex max-w-full snap-mandatory snap-center gap-4 overflow-auto rounded-lg p-4">
            {[...categories.values()].map((item) => (
                <CategoryShort {...item} key={item.name} />
            ))}
        </ul>
    );
}
