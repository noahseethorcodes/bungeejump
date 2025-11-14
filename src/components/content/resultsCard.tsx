import type { Results } from "@/types/types";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type ResultsCardProps = {
  results: Results | null;
  hasRevealed: boolean;
};

export default function ResultsCard({ results, hasRevealed }: ResultsCardProps) {
  if (!hasRevealed || !results) return null;

  return (
    <Card className="border-emerald-300 bg-white shadow-md shadow-emerald-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-emerald-700">
          Results
        </CardTitle>
        <p className="mt-1 text-[11px] text-slate-500">
          Only positions are shown — exact GPA values are kept private.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Highest */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Highest Scorer
          </h3>

          <p className="text-sm text-slate-600">
            {results.highestNames.length > 1
              ? "Tied between:"
              : "Awarded to:"}
          </p>

          <ul className="flex flex-wrap gap-2 text-sm">
            {results.highestNames.map((name) => (
              <li
                key={name}
                className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800"
              >
                {name}
              </li>
            ))}
          </ul>
        </section>

        <Separator className="bg-slate-200" />

        {/* Second-lowest */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Second-Lowest Scorer
          </h3>

          {results.secondLowestNames.length === 0 ? (
            <p className="text-sm text-slate-600">
              All GPAs are identical — cannot determine a distinct second-lowest scorer.
            </p>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                {results.secondLowestNames.length > 1
                  ? "Tied between:"
                  : "Belongs to:"}
              </p>

              <ul className="flex flex-wrap gap-2 text-sm">
                {results.secondLowestNames.map((name) => (
                  <li
                    key={name}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
