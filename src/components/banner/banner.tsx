import { contactItemList } from "@/lib/data/contact";
import { CurveDivider } from "../global/curve-divider";

export default function Banner() {
    const data = contactItemList.slice(3);

    return (
        <div className="bg-deep relative overflow-clip fill-white px-[15dvw] py-28 text-white md:py-40">
            <CurveDivider edge="top" />
            <ul className="flex flex-wrap gap-12">
                {data.map((item) => {
                    return (
                        <li
                            className="grow basis-[min(15rem,100%)]"
                            key={item.name}
                        >
                            <a
                                className="flex flex-col items-center gap-2 text-center"
                                href={item.href}
                                rel="noopener noreferrer"
                            >
                                {item.icon}
                                <div className="flex flex-col items-center">
                                    <h2 className="eyebrow">{item.name}</h2>
                                    <p>{item.text}</p>
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
            <CurveDivider edge="bottom" />
        </div>
    );
}
