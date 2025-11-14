import type { Results } from "@/types/types";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type ResultsCardProps = {
  results: Results | null;
  hasRevealed: boolean;
};

export default function ResultsCard( {results, hasRevealed} : ResultsCardProps) {
    if (!hasRevealed || !results) return null;

    return (
        <Card className="border-emerald-300 bg-white shadow-md shadow-emerald-100">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-emerald-700">
                  Results
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Highest GPA */}
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Highest GPA
                  </h3>
                  <p className="text-2xl font-semibold text-slate-900">
                    {results.highestGpa.toFixed(2)}
                  </p>
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

                {/* Second-lowest GPA */}
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Second-lowest GPA
                  </h3>
                  {results.secondLowestGpa === null ? (
                    <p className="text-sm text-slate-600">
                      All GPAs are the same, so a distinct second-lowest score
                      can&apos;t be determined.
                    </p>
                  ) : (
                    <>
                      <p className="text-2xl font-semibold text-slate-900">
                        {results.secondLowestGpa.toFixed(2)}
                      </p>
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

                <p className="mt-1 text-[11px] text-slate-500">
                  “Second-lowest” means the second distinct GPA value from the
                  bottom. If there are only two distinct GPAs, the second-lowest
                  is the higher one.
                </p>
            </CardContent>
        </Card>
    )
}