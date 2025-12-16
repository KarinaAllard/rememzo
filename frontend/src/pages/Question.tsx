import { useState } from "react"
import { Button } from "../components/Button"
import { useNavigate } from "react-router";

export const Question = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const options = ["A", "B", "C", "D", "E", "F"];
    const navigate = useNavigate()

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
                <p className="text-xl text-center text-(--text-hover)">How many [blank] were in the scene?</p>

                {options.map((option) => (
                    <label 
                        key={option} 
                        className="block w-full"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setSelected(option)
                            }
                        }}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selected === option}
                            onChange={() => setSelected(option)}
                            className="sr-only"
                        />
                        <Button
                            key={option}
                            type="button"
                            onClick={() => setSelected(option)}
                            className="w-full"
                            variant={selected === option ? "secondary" : "muted"}
                        >
                            Option {option}
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