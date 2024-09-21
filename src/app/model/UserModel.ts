import { InstituteData } from './School';

export default class UserModel {
  public _id: string;
  public email: string;
  public status: number;
  public phone: string;
  public identityPhoto: string;
  public username: string;
  public role: string;
  public instituteData?: InstituteData;
  public studentData?: object;
  isOnline?: boolean; // assuming you have a field to indicate user activity
  // ... any other properties you may have

  selected?: boolean = false; // initial value as false
  CompanyData: any;

  constructor(
    _id: string,
    email: string,
    status: number,
    phone: string,
    identityPhoto: string,
    username: string,
    role: string,
    instituteData?: InstituteData,
    studentData?: object
  ) {
    this._id = _id;
    this.email = email;
    this.status = status;
    this.phone = phone;
    this.identityPhoto = identityPhoto;
    this.username = username;
    this.role = role;
    this.instituteData = instituteData;
    this.studentData = studentData;
  }


}
