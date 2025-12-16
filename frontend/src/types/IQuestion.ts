export interface IOption {
    text: string
    isCorrect?: boolean
    _id: string
}

export interface IDailyQuestion {
    questionText: string
    options: IOption[]
    questionId: string
}