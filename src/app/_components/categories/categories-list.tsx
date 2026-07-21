import Category from "./category";
import { categories } from "../../_lib/data/categories";

export default function CategoriesList() {
    const categoriesList = [...categories.values()];

    return (
        <>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {categoriesList.map((value) => (
                    <Category {...value} key={value.path} />
                ))}
            </ul>
            <div className="bg-main/15 border-main/30 flex flex-col items-center self-stretch rounded-2xl border p-8 text-center">
                <h3 className="text-main text-xl font-semibold uppercase">
                    Important!
                </h3>
                <strong className="text-main/80 max-w-160 font-normal">
                    Please note that all hair removal prices listed are per
                    session, and multiple sessions are typically required for
                    optimal results; package discounts are available for
                    commitments of 6 or more sessions, and a complimentary
                    consultation is recommended before your first treatment.
                </strong>
            </div>
        </>
    );
}
