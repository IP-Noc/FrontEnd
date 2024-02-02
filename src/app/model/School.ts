export class InstituteData {
  public _id: string;
  public name: string;
  public domain: string;
  public location: string;
  public director: string;

  public constructor(
    _id: string,
    name: string,
    domain: string,
    location: string,
    director: string
  ) {
    this._id = _id;
    this.name = name;
    this.domain = domain;
    this.location = location;
    this.director = director;
  }
}

export default class School {
  public _id: string;
  public email: string;
  public status: number;
  public phone: string;
  public identityPhoto: string;
  public username: string;
  public role: string;
  public instituteData: InstituteData;

  constructor(
    _id: string,
    email: string,
    status: number,
    phone: string,
    identityPhoto: string,
    username: string,
    role: string,
    instituteData: InstituteData
  ) {
    this._id = _id;
    this.email = email;
    this.status = status;
    this.phone = phone;
    this.identityPhoto = identityPhoto;
    this.username = username;
    this.role = role;
    this.instituteData = instituteData;
  }
}
