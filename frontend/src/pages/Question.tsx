import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { useNavigate } from "react-router";
import type { IDailyQuestion } from "../types/IQuestion";
import { fetchDailyQuestion } from "../services/questionService";
import { isDailyAttemptCompleted, markDailyAttemptCompleted } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";
import { useGame } from "../game/GameContext";

export const Question = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [question, setQuestion] = useState<IDailyQuestion | null>(null)
    const navigate = useNavigate()
    const today = useToday();
    const { setPhase } = useGame();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                if (isDailyAttemptCompleted(today)) {
                    navigate("/play/result", { replace: true });
                    return;
                }
                const data = await fetchDailyQuestion(today);

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
    }, [today, navigate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected || !question) return;

        markDailyAttemptCompleted(today);

        const selectedOption = question.options.find(opt => opt.text === selected)

        sessionStorage.setItem(
            "dailyResult",
            JSON.stringify({
                selectedAnswer: selected,
                isCorrect: selectedOption?.isCorrect || false,
                questionId: question.questionId,
            })
        );

        navigate("/play/result", { replace: true });
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Question</h1>
            <p className="text-sm">{today}</p>
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