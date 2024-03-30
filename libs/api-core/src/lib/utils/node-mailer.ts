import * as aws from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';

import { env } from '../config/index';

const FROM_ADDRESS = 'Eztrack Notifications <noreply@eztrackapp.com>';

let nodemailerTransporter: nodemailer.Transporter<SESTransport.SentMessageInfo>;

const getTransporter =
  (): nodemailer.Transporter<SESTransport.SentMessageInfo> => {
    if (!nodemailerTransporter) {
      const ses = new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
        credentials: {
          accessKeyId: env.EMAIL_USERNAME,
          secretAccessKey: env.EMAIL_PASSWORD,
        },
      });

      nodemailerTransporter = nodemailer.createTransport({
        SES: { ses, aws },
        sendingRate: 10,
      });
    }
    return nodemailerTransporter;
  };

export const sendEmail = async (params: {
  to: string;
  subject: string;
  text: string;
}) => {
  const { to, subject, text } = params;

  return getTransporter()
    .sendMail({
      from: FROM_ADDRESS,
      to,
      subject: `${env.isProduction ? '' : '[DEV SITE] '}${subject}`,
      text,
    })
    .then(() => undefined);
};
