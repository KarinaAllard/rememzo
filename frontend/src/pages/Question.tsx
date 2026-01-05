import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import type { IDailyQuestion } from "../types/IQuestion";
import { fetchDailyQuestion } from "../services/questionService";
import { markDailyAttemptCompleted } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";
import { useGameController } from "../hooks/useGameController";
import { useGame } from "../game/GameContext";
import { submitAttemptAnswer } from "../services/attemptService";
import { getAttemptIdentity } from "../game/identity";
import { useUser } from "../context/UserContext";

export const Question = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [question, setQuestion] = useState<IDailyQuestion | null>(null)
    const [loading, setLoading] = useState(false);

    const today = useToday();
    const { goToPhase } = useGameController();
    const { attemptId } = useGame();
    const { refreshUser } = useUser();
    const identity = getAttemptIdentity();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await fetchDailyQuestion(today);

                if (!data?.question) {
                    console.error("No question in daily scene:", data);
                    return;
                }

                setQuestion({
                    questionText: data.question.questionText,
                    options: data.question.options,
                    questionId: data.questionId,
                })
            } catch (error) {
                console.error("Failed to fetch question:", error)
            }
        }
        fetchQuestion()
    }, [today])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected || !question) return;

        setLoading(true);
        try {
            const selectedOption = question.options.find(opt => opt.text === selected);
            const correct = selectedOption?.isCorrect ?? false;

            if ("userId" in identity && attemptId) {
                await submitAttemptAnswer(attemptId, {
                    questionId: question.questionId,
                    selectedOption: selected,
                    correct,
                });

                refreshUser();
            } else if ("guestId" in identity) {
                sessionStorage.setItem(
                    "dailyResult",
                    JSON.stringify({
                        selectedOption: selected,
                        correct: selectedOption?.isCorrect || false,
                        questionId: question.questionId,
                    })
                );

            }
            
            markDailyAttemptCompleted(today, attemptId ?? undefined);


            goToPhase("result");
        } catch (error: any) {
            console.error("Failed to submit answer:", error);
        } finally {
            setLoading(false);
        };
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
                            variant={selected === option.text ? "selected" : "option"}
                        >
                            {option.text}
                        </Button>
                    </label>
                ))}
                <Button type="submit" className="mt-4 w-full" disabled={!selected || loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    )
}