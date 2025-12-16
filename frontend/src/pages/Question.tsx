import { useState } from "react"
import { Button } from "../components/Button"

export const Question = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const options = ["Option A", "Option B", "Option C", "Option D", "Option E", "Option F"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selected) {
            console.log("Submitted:", selected);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Question</h1>
            <p className="text-sm">2025-12-11</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
                <p className="text-xl text-center text-(--text-hover)">How many [blank] were in the scene?</p>

                {options.map((option) => (
                    <Button
                        key={option}
                        type="button"
                        onClick={() => setSelected(option)}
                        variant={selected === option ? "secondary" : "muted"}
                    >
                        {option}
                    </Button>
                ))}
                <Button type="submit" className="mt-w-full" disabled={!selected}>
                    Submit
                </Button>
            </form>
        </div>
    )
}