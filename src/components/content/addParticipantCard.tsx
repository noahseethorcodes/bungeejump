import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";

type AddParticipantCardProps = {
  name: string;
  gpaInput: string;
  onNameChange: (value: string) => void;
  onGpaChange: (value: string) => void;
  onAdd: () => void;
  minGpa: number;
  maxGpa: number;
};

export default function AddParticipantCard(
    { name, gpaInput, onNameChange, onGpaChange, onAdd, minGpa, maxGpa }: AddParticipantCardProps) {
    return (
        <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Add Participant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Input Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-slate-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Noah"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* Input GPA */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="gpa"
                    className="flex items-center justify-between text-xs text-slate-700"
                  >
                    <span>GPA</span>
                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                      {minGpa.toFixed(1)}–{maxGpa.toFixed(1)}
                    </span>
                  </Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    min={minGpa}
                    max={maxGpa}
                    placeholder="e.g. 4.50"
                    value={gpaInput}
                    onChange={(e) => onGpaChange(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  onClick={onAdd}
                  className="bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  Add to list
                </Button>
              </div>
            </CardContent>
          </Card>
    )
}
