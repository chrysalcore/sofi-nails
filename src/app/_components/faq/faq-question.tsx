import { Icon } from "@/components/global/icon";
import { type FAQ } from "../../_lib/data/faq";

export default function FAQQuestion({ question, answer, list, note }: FAQ) {
    return (
        <li className="flex flex-col gap-2">
            <details className="group" name="faq">
                <summary className="relative flex cursor-pointer list-none justify-between gap-4 text-left font-medium [&::-webkit-details-marker]:hidden">
                    <span>{question}</span>
                    <Icon
                        name="chevron-down"
                        className="ease-smooth mt-1 size-4 min-w-4 transition-transform duration-300 group-open:rotate-180"
                    />
                </summary>
                <div className="mt-3 flex flex-col gap-2">
                    {answer && <p>{answer}</p>}
                    {list && (
                        <ul className="list-disc">
                            {list.map((li) => (
                                <li className="list-inside list-disc" key={li}>
                                    {li}
                                </li>
                            ))}
                        </ul>
                    )}
                    {note && <strong>{note}</strong>}
                </div>
            </details>
        </li>
    );
}
