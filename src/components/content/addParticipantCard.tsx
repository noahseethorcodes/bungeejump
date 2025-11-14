import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { MIN_PARTICIPANTS } from "@/lib/constants";

type AddParticipantCardProps = {
  name: string;
  gpaInput: string;
  maxGpaInput: string;
  onNameChange: (value: string) => void;
  onGpaChange: (value: string) => void;
  onMaxGpaChange: (value: string) => void;
  onAdd: () => void;
  minGpa: number;
};

export default function AddParticipantCard(
    { name, gpaInput, maxGpaInput, onNameChange, onGpaChange, onMaxGpaChange, onAdd, minGpa }: AddParticipantCardProps) {
    return (
        <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Add Participant
              </CardTitle>
              <p className="mt-1 text-[11px] text-slate-500">
                At least {MIN_PARTICIPANTS} participants must be added before the results can be revealed
              </p>
            </CardHeader>
            <CardContent className="space-y-4">

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

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Input GPA */}
                <div className="space-y-1.5">
                  <Label htmlFor="max-gpa" className="text-xs text-slate-700">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    min={minGpa}
                    placeholder="e.g. 4.50"
                    value={gpaInput}
                    onChange={(e) => onGpaChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="text-sm"
                  />
                </div>

                {/* Input Max GPA */}
                <div className="space-y-1.5">
                  <Label htmlFor="max-gpa" className="text-xs text-slate-700">Max GPA</Label>
                  <Input
                    id="max-gpa"
                    type="number"
                    step="0.1"
                    min={1}
                    max={10}
                    placeholder="e.g. 4.0 or 5.0"
                    value={maxGpaInput}
                    onChange={(e) => onMaxGpaChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  onClick={onAdd}
                  className="bg-emerald-600 text-white hover:bg-emerald-500 hover:cursor-pointer"
                >
                  Add to list
                </Button>
              </div>
            </CardContent>
          </Card>
    )
}
