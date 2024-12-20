import chalk from 'chalk';

// Enum for log levels
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  // Format the timestamp
  private static getFormattedTimestamp(): string {
    const now = new Date();
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: false, // Use 24-hour format
    }).format(now);
  }

  private static log(level: LogLevel, message: string): void {
    const timestamp = this.getFormattedTimestamp();

    // Define colors for each log level
    let coloredMessage: string;
    switch (level) {
      case LogLevel.INFO:
        coloredMessage = chalk.blue(`[${timestamp}] [${level}] ${message}`);
        break;
      case LogLevel.WARN:
        coloredMessage = chalk.yellow(`[${timestamp}] [${level}] ${message}`);
        break;
      case LogLevel.ERROR:
        coloredMessage = chalk.red(`[${timestamp}] [${level}] ${message}`);
        break;
      case LogLevel.DEBUG:
        coloredMessage = chalk.green(`[${timestamp}] [${level}] ${message}`);
        break;
      default:
        coloredMessage = `[${timestamp}] [${level}] ${message}`;
    }

    console.log(coloredMessage);
  }

  public static info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  public static warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  public static error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  public static debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }
}

export default Logger;
