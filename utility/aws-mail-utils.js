import { config } from "@src/config";
import { logger } from "@core/logger";
import { SES } from "aws-sdk";

export class AWSMailService {
  /**
   * Send mail
   * @param from
   * @param to
   * @param subject
   * @param text
   * @param html
   * @return
   * true if success
   * false if failed
   */
  async sendMail(from, to, subject, text, html) {
    if (!to || (Array.isArray(to) && to?.length === 0)) {
      logger.info("mail to is empty");
      return false;
    }
    const params = {
      Destination: {
        ToAddresses: typeof to === "string" ? [to] : [...to],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
          Text: {
            Charset: "UTF-8",
            Data: text,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: from,
    };
    logger.info(`Send email to: `, to);

    const ses = new SES({
      apiVersion: "2010-12-01",
      region: config.ses_region,
    });

    return ses
      .sendEmail(params)
      .promise()
      .then((data) => {
        logger.success("send email success" + data.$response);
        return true;
      })
      .catch((e) => {
        logger.error("Failed to send email " + e.stack);
        return false;
      });
  }
}
