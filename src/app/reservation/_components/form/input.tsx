import { type Input } from "../../_lib/data/inputs";

export default function Input({ name, type, placeholder, isInLine, minLength}: Input) {
    return (
        <label className='label flex flex-col' htmlFor={name}>
            {isInLine? 
                <input
                    className="px-4 py-3 text-dark border border-secondary/50 rounded-lg focus-visible:outline-none focus-visible:border-2 focus-visible:border-secondary placeholder:text-secondary/80 invalid:not-empty:text-main invalid:not-empty:border-main invalid:focus-visible:not-empty:border-main transition-colors"
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    required
                    minLength={minLength}
                /> :
                <textarea
                    className="px-4 py-3 text-dark border border-secondary/50 rounded-lg focus-visible:outline-none focus-visible:border-2 focus-visible:border-secondary placeholder:text-secondary/80 resize-none overflow-y-auto invalid:not-empty:text-main invalid:not-empty:border-main invalid:focus-visible:not-empty:border-main transition-colors"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    rows={6}
                    required
                ></textarea>
            }
        </label>
    )
}