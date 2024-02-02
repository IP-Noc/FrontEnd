export default class UserDetails {
  public id: string;
  public role: string;
  public code?: string;
  public status?: Number;
  public changPwd?: Number;

  constructor(id: string, role: string, code?: string, status?: Number, changPwd?: Number) {
    this.id = id;
    this.role = role;
    this.code = code;
    this.status = status;
    this.changPwd = changPwd;
 }
}
