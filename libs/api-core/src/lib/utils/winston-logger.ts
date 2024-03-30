import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

// logs dir
const logDir: string = join(__dirname, '../../../../logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),

    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };

/**
To integrate AWS CloudWatch with your existing Express/TypeScript application setup that uses Winston for logging, you'll need to extend your winston-logger.ts configuration to include a transport that sends logs to AWS CloudWatch. This involves using the winston-cloudwatch package, which seamlessly integrates with Winston to stream your logs directly to CloudWatch Logs.

First, ensure you have the necessary AWS permissions and the AWS SDK configured correctly in your environment. You'll need your AWS Access Key ID, Secret Access Key, and the AWS Region set up, preferably using environment variables or the AWS credentials file to keep your credentials secure.

Step 1: Install winston-cloudwatch
You'll need to install winston-cloudwatch along with aws-sdk (if it's not already installed) to enable the integration.

bash
Copy code
npm install winston-cloudwatch aws-sdk
Step 2: Configure AWS Credentials
Ensure your AWS credentials are configured. This can be done in several ways, but the most common approach for an application is to use environment variables or the AWS credentials file.

Environment Variables: Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION in your environment.

AWS Credentials File: Located at ~/.aws/credentials on Linux & macOS or C:\Users\USERNAME\.aws\credentials on Windows.

Step 3: Update winston-logger.ts
Modify your winston-logger.ts to include the CloudWatch transport. Here's how you can do it:

typescript
Copy code
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import WinstonCloudWatch from 'winston-cloudwatch';
import { env } from '@config';

// AWS SDK is automatically configured by winston-cloudwatch
// through environment variables or the credentials file.

// logs dir
const logDir: string = join(__dirname, env.LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // Local log files setup remains unchanged
    // Add your winston-daily-rotate-file transports

    // CloudWatch transport
    new WinstonCloudWatch({
      logGroupName: 'your-log-group-name', // Create this log group in AWS CloudWatch first
      logStreamName: 'your-log-stream-name', // This could be based on your environment
      awsRegion: process.env.AWS_REGION || 'us-east-1',
      jsonMessage: true,
    }),
  ],
});

// Console transport setup remains unchanged
// Add your console transport if needed for local development

export { logger };
In this setup, replace 'your-log-group-name' and 'your-log-stream-name' with the appropriate values for your AWS CloudWatch Logs configuration. Ensure that the log group exists in CloudWatch, as winston-cloudwatch will not create it for you.

Step 4: Adjust Logging as Needed
Since you're now logging to CloudWatch, consider the volume and type of logs you're sending to avoid unnecessary costs. AWS CloudWatch charges based on the amount of data ingested, stored, and transferred. You might want to adjust the logging level or the information you log based on the environment.

Conclusion
By integrating CloudWatch with your existing Winston setup, you gain the ability to monitor and analyze your application logs in real-time within AWS's ecosystem. This setup enhances your application's observability, allowing you to respond promptly to incidents and understand your application's behavior in production. Remember to monitor your usage and costs associated with CloudWatch Logs to maintain control over your AWS expenses.
 */
