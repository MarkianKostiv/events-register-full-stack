import { FormDataProp } from "./FormDataProp";
export interface Participant extends FormDataProp {
  id: number;
  createdAt: string | number | Date;
}
