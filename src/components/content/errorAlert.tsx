import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

type ErrorAlertProps = {
  message: string | null;
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
    if (message == null) return null;
    
    return (
        <div className="mb-4">
            <Alert variant="destructive">
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </div>
    )
}