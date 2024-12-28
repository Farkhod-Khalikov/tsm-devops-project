export default class Logger {
  static log(message: any, data = null) {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`, data);
  }

  static error(message: any, data = null) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, data);
  }
}
