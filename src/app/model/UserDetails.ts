export default class UserDetails {
  public id: string;
  public role: string;
  public code?: string;
  public status?: Number;
  public changPwd?: Number;
public company?: any;
public name?: any;
public isJira?: any;
public isGrafana?: any;

  constructor(id: string, role: string, code?: string, status?: Number, changPwd?: Number, company?: any, name?: any, isJira?: any, isGrafana?: any) {
    this.id = id;
    this.role = role;
    this.code = code;
    this.status = status;
    this.changPwd = changPwd;
    this.company = company;
    this.name = name;
    this.isJira = isJira;
    this.isGrafana = isGrafana;
 }
}
