import { type FAQ } from "../../_lib/data/faq";

export default function FAQQuestion({ question, answer, list, note }: FAQ) {
    return (
        <li className="bg-faq flex flex-col gap-2 rounded-xl p-4">
            <details className="group" name="faq">
                <summary className="relative flex cursor-pointer list-none justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
                    <span className="line-clamp-1 group-open:line-clamp-2">
                        {question}
                    </span>
                    <svg
                        className="min-w-4 -rotate-90 fill-white transition-transform group-open:rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        height={16}
                        width={16}
                        viewBox="0 -960 960 960"
                    >
                        <path d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z" />
                    </svg>
                </summary>
                <div className="bg-secondary/25 mt-2 flex flex-col gap-2 rounded-lg p-2 text-sm">
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
                    {note && <strong className="faq-list__text">{note}</strong>}
                </div>
            </details>
        </li>
    );
}
