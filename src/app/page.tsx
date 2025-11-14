"use client";

import { useMemo, useState } from "react";
import ErrorAlert from "@/components/content/errorAlert";
import AddParticipantCard from "@/components/content/addParticipantCard";
import ActionsBar from "@/components/content/actionsBar";
import { Participant, Results } from "@/types/types";
import ParticipantsCard from "@/components/content/participantsCard";
import ResultsCard from "@/components/content/resultsCard";
import { MIN_GPA, MIN_PARTICIPANTS } from "@/lib/constants";

export default function HomePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [gpaInput, setGpaInput] = useState("");
  const [maxGpaInput, setMaxGpaInput] = useState("5.0");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleAddParticipant = () => {
    setError(null);

    // Name Validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter a name.");
      return;
    }

    if (!gpaInput) {
      setError("Please enter a GPA.");
      return;
    }

    // Max GPA Validation
    const parsedMaxGpa = Number(maxGpaInput);
    if (Number.isNaN(parsedMaxGpa)) {
      setError("Please enter a valid Max GPA (e.g. 4.0).");
      return;
    }

    // GPA Validation
    const parsedGpa = Number(gpaInput);
    if (Number.isNaN(parsedGpa)) {
      setError("Please enter a valid GPA (e.g. 4.25).");
      return;
    }

    if (parsedGpa < MIN_GPA || parsedGpa > parsedMaxGpa) {
      setError(`GPA must be between ${MIN_GPA} and ${parsedMaxGpa}.`);
      return;
    }

    const newParticipant: Participant = {
      id: nextId,
      name: trimmedName,
      gpa: parsedGpa,
      maxGpa: parsedMaxGpa
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
    setMaxGpaInput("5.0");
    setError(null);
    setResults(null);
    setHasRevealed(false);
    setNextId(1);
  };

  const computedResults = useMemo<Results | null>(() => {
    if (participants.length < 1) return null;

    const normalized = participants.map(p => ({
      name: p.name,
      ratio: p.gpa / p.maxGpa,
    }));

    // Highest ratio
    const highestRatio = Math.max(...normalized.map(n => n.ratio));
    const highestNames = normalized
      .filter(n => n.ratio === highestRatio)
      .map(n => n.name);

    // Distinct sorted values
    const distinctRatios = Array.from(new Set(normalized.map(n => n.ratio)))
      .sort((a, b) => a - b);

    let secondLowestRatio: number | null = null;
    if (distinctRatios.length >= 2) {
      secondLowestRatio = distinctRatios[1];
    }

    const secondLowestNames =
      secondLowestRatio === null
        ? []
        : normalized
            .filter(n => n.ratio === secondLowestRatio)
            .map(n => n.name);

    return {
      highestNames,
      secondLowestNames,
    };
  }, [participants]);

  const handleReveal = () => {
    setError(null);

    if (participants.length < MIN_PARTICIPANTS) {
      setError(`You need at least ${MIN_PARTICIPANTS} participants to reveal results.`);
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
            maxGpaInput={maxGpaInput}
            onNameChange={setName}
            onGpaChange={setGpaInput}
            onMaxGpaChange={setMaxGpaInput}
            onAdd={handleAddParticipant}
            minGpa={MIN_GPA}
          />

          {/* Participants card */}
          <ParticipantsCard participants={participants}/>

          {/* Actions */}
          <ActionsBar 
            onReveal={handleReveal}
            onReset={handleReset}
            canReveal={participants.length >= MIN_PARTICIPANTS && !hasRevealed}
            canReset={participants.length > 0 || hasRevealed}
          />

          {/* Results card */}
          <ResultsCard results={results} hasRevealed={hasRevealed}/>
        </div>
      </div>
    </main>
  );
}
