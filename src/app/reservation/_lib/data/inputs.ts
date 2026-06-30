export interface Input {
    label: string
    name: string
    type: string
    placeholder: string
    isInLine: boolean
    minLength?: number
    defaultValue?: string
}

export const inputsList: Input[] = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Anna Smith',
        isInLine: true,
        minLength: 3
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'annasmith@gmail.com',
        isInLine: true
    },
    {
        label: 'Date',
        name: 'date',
        type: 'datetime-local',
        placeholder: '01/01/2000',
        isInLine: true
    },
    {
        label: 'Subject',
        name: 'subject',
        type: 'text',
        placeholder: 'Manicure',
        isInLine: true,
        minLength: 10
    },
    {
        label: 'Description',
        name: 'description',
        type: '',
        placeholder: 'I want to...',
        isInLine: false
    }
]