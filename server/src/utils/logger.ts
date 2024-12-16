// src/utils/logger.ts

// Enum for log levels
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

// Basic Logger class
class Logger {
  private static log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  // Info level log
  public static info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  // Warn level log
  public static warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  // Error level log
  public static error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  // Debug level log (can be useful in development)
  public static debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }
}

export default Logger;
