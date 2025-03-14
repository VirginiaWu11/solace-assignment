export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: Degree;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date;
}

export enum Degree {
  Md = "MD",
  Msw = "MSW",
  PhD = "PhD",
}
