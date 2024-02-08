import ComboBoxType from "./ComboBoxType";

export default interface Complaint {
  subject: string;
  message: string;
  type: ComboBoxType;
}
