export default class JwtResponse {
  public id: string;
  public role: string;
  public token: string;
  public refresh: string;
  public code?: string;
  public changePassword?: number;
  public statuts?:number;

  public constructor(
    token: string,
    id: string,
    refresh: string,
    role: string,
    code?: string,
    changePassword?: number,
    status?:number

  ) {
    this.token = token;
    this.refresh = refresh;
    this.id = id;
    this.role = role;
    this.code = code;
    this.changePassword = changePassword;
    this.statuts=status;

  }
}
