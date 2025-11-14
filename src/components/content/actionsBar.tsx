import { Button } from "../ui/button";

type ActionsBarProps = {
  onReveal: () => void;
  onReset: () => void;
  canReveal: boolean; // participants.length >= 2
  canReset: boolean;  // participants.length > 0 || hasRevealed
};

export default function ActionsBar(
    { onReveal, onReset, canReveal, canReset} : ActionsBarProps
) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
              onClick={onReveal}
              disabled={!canReveal}
            >
              Reveal results
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-slate-300 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-60"
              onClick={onReset}
              disabled={!canReset}
            >
              Reset
            </Button>
          </div>
    )
}