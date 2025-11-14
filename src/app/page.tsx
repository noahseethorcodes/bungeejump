"use client";

import { useMemo, useState } from "react";
import ErrorAlert from "@/components/content/errorAlert";
import AddParticipantCard from "@/components/content/addParticipantCard";
import ActionsBar from "@/components/content/actionsBar";
import { Participant, Results } from "@/types/types";
import ParticipantsCard from "@/components/content/participantsCard";
import ResultsCard from "@/components/content/resultsCard";

const MIN_GPA = 0.0;
const MAX_GPA = 5.0;

export default function HomePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [gpaInput, setGpaInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleAddParticipant = () => {
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter a name.");
      return;
    }

    if (!gpaInput) {
      setError("Please enter a GPA.");
      return;
    }

    const parsedGpa = Number(gpaInput);
    if (Number.isNaN(parsedGpa)) {
      setError("Please enter a valid GPA (e.g. 4.25).");
      return;
    }

    if (parsedGpa < MIN_GPA || parsedGpa > MAX_GPA) {
      setError(`GPA should be between ${MIN_GPA} and ${MAX_GPA}.`);
      return;
    }

    const newParticipant: Participant = {
      id: nextId,
      name: trimmedName,
      gpa: parsedGpa,
    };

    setParticipants((prev) => [...prev, newParticipant]);
    setNextId((prev) => prev + 1);
    setName("");
    setGpaInput("");
    setHasRevealed(false);
    setResults(null);
  };

  const handleReset = () => {
    setParticipants([]);
    setName("");
    setGpaInput("");
    setError(null);
    setResults(null);
    setHasRevealed(false);
    setNextId(1);
  };

  const computedResults = useMemo<Results | null>(() => {
    if (participants.length < 1) return null;

    const gpas = participants.map((p) => p.gpa);
    const highestGpa = Math.max(...gpas);

    const distinctSorted = Array.from(new Set(gpas)).sort((a, b) => a - b);

    let secondLowestGpa: number | null = null;
    if (distinctSorted.length >= 2) {
      secondLowestGpa = distinctSorted[1];
    }

    const highestNames = participants
      .filter((p) => p.gpa === highestGpa)
      .map((p) => p.name);

    const secondLowestNames =
      secondLowestGpa === null
        ? []
        : participants
            .filter((p) => p.gpa === secondLowestGpa)
            .map((p) => p.name);

    return {
      highestGpa,
      highestNames,
      secondLowestGpa,
      secondLowestNames,
    };
  }, [participants]);

  const handleReveal = () => {
    setError(null);

    if (participants.length < 3) {
      setError("You need at least 3 participants to reveal results.");
      return;
    }

    if (!computedResults) {
      setError("Unable to compute results. Please add some participants.");
      return;
    }

    setResults(computedResults);
    setHasRevealed(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-white text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-6 space-y-2 text-center sm:mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Bungee Jump!
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Let everyone enter their GPA privately, then reveal only the{" "}
            <span className="font-semibold text-emerald-600">highest</span> and{" "}
            <span className="font-semibold text-emerald-600">
              second-lowest
            </span>{" "}
            scores.
          </p>
        </header>

        {/* Error alert */}
        <ErrorAlert message={error} />

        <div className="space-y-4 sm:space-y-5">
          <AddParticipantCard 
            name={name}
            gpaInput={gpaInput}
            onNameChange={setName}
            onGpaChange={setGpaInput}
            onAdd={handleAddParticipant}
            minGpa={MIN_GPA}
            maxGpa={MAX_GPA}
          />

          {/* Participants card */}
          <ParticipantsCard participants={participants}/>

          {/* Actions */}
          <ActionsBar 
            onReveal={handleReveal}
            onReset={handleReset}
            canReveal={participants.length >= 3 && !hasRevealed}
            canReset={participants.length > 0 || hasRevealed}
          />

          {/* Results card */}
          <ResultsCard results={results} hasRevealed={hasRevealed}/>
        </div>
      </div>
    </main>
  );
}
