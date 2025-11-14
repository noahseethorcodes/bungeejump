export type Participant = {
  id: number;
  name: string;
  gpa: number;
};

export type Results = {
  highestGpa: number;
  highestNames: string[];
  secondLowestGpa: number | null;
  secondLowestNames: string[];
};
