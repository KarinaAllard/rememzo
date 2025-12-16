import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { useNavigate } from "react-router";
import axios from "axios";

type Option = {
    text: string
    isCorrect?: boolean
    _id: string
}

type DailyQuestion = {
    questionText: string
    options: Option[]
    questionId: string
}

export const Question = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [question, setQuestion] = useState<DailyQuestion | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const today = new Date().toISOString().split("T")[0]
                const res = await axios.get(`/api/play/daily?date=${today}`)
                const data = res.data

                if (!data?.question) {
                    console.error("No question in daily scene:", data);
                    return;
                }

                setQuestion({
                    questionText: data.question.questionText,
                    options: data.question.options,
                    questionId: data.question.questionId,
                })
            } catch (error) {
                console.error("Failed to fetch question:", error)
            }
        }
        fetchQuestion()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) return;

        navigate("/play/result", {
            state: {
                selectedAnswer: selected,
                questionId: "mock-question-id",
            },
        })
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Question</h1>
            <p className="text-sm">2025-12-11</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
                <p className="text-xl text-center text-(--text-hover)">{question?.questionText}</p>

                {question?.options.map((option) => (
                    <label 
                        key={option._id} 
                        className="block w-full"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setSelected(option.text)
                            }
                        }}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value={option.text}
                            checked={selected === option.text}
                            onChange={() => setSelected(option.text)}
                            className="sr-only"
                        />
                        <Button
                            key={option.text}
                            type="button"
                            onClick={() => setSelected(option.text)}
                            className="w-full"
                            variant={selected === option.text ? "secondary" : "muted"}
                        >
                            {option.text}
                        </Button>
                    </label>
                ))}
                <Button type="submit" className="mt-4 w-full" disabled={!selected}>
                    Submit
                </Button>
            </form>
        </div>
    )
}