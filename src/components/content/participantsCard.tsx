import type { Participant } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type ParticipantsCardProps = {
  participants: Participant[];
};

export default function ParticipantsCard({ participants } : ParticipantsCardProps) {
    return (
        <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {participants.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No one has joined yet. Start by adding a name and GPA above.
                </p>
              ) : (
                <>
                  <p className="text-xs text-slate-500">
                    Showing who has submitted — GPAs stay hidden until reveal.
                  </p>
                  <ul className="space-y-1.5">
                    {participants.map((p, index) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[11px] text-slate-700">
                            {index + 1}
                          </span>
                          <span className="font-medium text-slate-900">
                            {p.name}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-emerald-600">
                          Submitted
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
    )
}