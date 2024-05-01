export interface ITasks {
  id: number;
  date: string;
  company: string;
  secondname: string;
  name: string;
  surname: string;
  phone: string;
  comment?: string;
  status: string;
  atiCode: number;
}
export interface IFormData {
  name: string;
  secondname: string;
  surname: string;
  company: string;
  phone: string;
  comment?: string;
  status: string;
  atiCode: number | undefined;
}
