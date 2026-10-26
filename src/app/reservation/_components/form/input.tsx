import { type Input } from "../../_lib/data/inputs";

export default function Input({
    name,
    type,
    placeholder,
    isInLine,
    minLength,
    defaultValue,
}: Input) {
    return (
        <label className="flex flex-col" htmlFor={name}>
            {isInLine ? (
                <input
                    className="text-dark border-secondary/50 focus-visible:border-secondary placeholder:text-secondary/80 user-invalid:text-main user-invalid:border-main user-invalid:focus-visible:border-main w-full rounded-lg border px-4 py-3 transition-colors focus-visible:border-2 focus-visible:outline-none"
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    required
                    minLength={minLength}
                    defaultValue={defaultValue}
                />
            ) : (
                <textarea
                    className="text-dark border-secondary/50 focus-visible:border-secondary placeholder:text-secondary/80 user-invalid:text-main user-invalid:border-main user-invalid:focus-visible:border-main resize-none overflow-y-auto rounded-lg border px-4 py-3 transition-colors focus-visible:border-2 focus-visible:outline-none"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    rows={6}
                    required
                    defaultValue={defaultValue}
                ></textarea>
            )}
        </label>
    );
}
