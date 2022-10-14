export class LogService {
  static logError(message: object): void {
    // tslint:disable-next-line:no-consoles no-console
    console.error(message);
  }

  static logInfo(message: object): void {
    // tslint:disable-next-line:no-console¬ no-console
    console.log(message);
  }
}
