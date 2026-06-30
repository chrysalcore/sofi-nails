"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { inputsList } from "../../_lib/data/inputs";
import { sendEmail } from "../../_lib/helper/actions";
import Input from "./input";

const initialState = { success: false, error: null }

function Form() {
    const [state, action, isLoading] = useActionState(sendEmail, initialState)
    const searchParams = useSearchParams()
    const defaultSubject = searchParams.get("subject") ?? ""

    return (
        <form className='self-start grow basis-[min(15rem,100%)] grid grid-cols-1 gap-4 p-4 w-full text-secondary bg-secondary/25 rounded-lg' action={action}>
            {inputsList.map(item => (
                <Input
                    {...item}
                    key={`${item.name}`}
                    defaultValue={item.name === "subject" ? defaultSubject : undefined}
                />
            ))}
            <button disabled={isLoading} className="flex justify-center items-center gap-2 button text-white fill-white bg-main rounded-2xl" type="submit">
                {isLoading? 'Submiting' : 'Submit'}
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 -960 960 960">
                    <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"/>
                </svg>
            </button>
            {state.error && <p className="flex justify-center p-4 text-center text-white bg-main/50 border border-main/70 rounded-lg">{state.error}</p>}
            {state.success && <p className="flex justify-center p-4 text-center text-emerald-700 bg-emerald-200/50 border border-emerald-700/70 rounded-lg">Email sended successfully</p>}
        </form>
    )
}

export default Form