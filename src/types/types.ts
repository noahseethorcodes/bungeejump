export type Participant = {
  id: number;
  name: string;
  gpa: number;
  maxGpa: number;
};

export type Results = {
  highestNames: string[];
  secondLowestNames: string[];
};
