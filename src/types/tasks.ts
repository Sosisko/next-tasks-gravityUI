export interface ITasks {
  id: number;
  number: number;
  date: string;
  company: string;
  secondname: string;
  name: string;
  surname: string;
  phone: string;
  comment?: string;
  status: string;
  atiCode: number | null;
}
