export default class APIResponse {
  error?: String;
  message?: String;

  constructor(message?: string, error?: string) {
    this.error = error;
    this.message = message;
  }
}