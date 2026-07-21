import { contactItemList } from "@/lib/data/contact";

export default function Banner() {
    const data = contactItemList.slice(3);

    return (
        <ul className="relative flex flex-wrap gap-12 bg-[color-mix(in_srgb,#c39870_70%,#fff)] fill-white px-[15dvw] py-2 text-white">
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
                                <h2 className="text-sm font-bold tracking-widest uppercase">
                                    {item.name}
                                </h2>
                                <p>{item.text}</p>
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
