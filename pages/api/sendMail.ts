// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { IncomingMessage } from "http";
import nodemailer from "nodemailer";

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

const parseFormData = async (request: IncomingMessage): Promise<{ err: any; fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise((resolve, reject) => {
    const form = formidable({});

    form.parse(request, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ code: 400, msg: "Bad Request." });

  try {
    const {
      fields: { name, email, subject, msg },
    } = await parseFormData(req);

    if (!name || !email || !subject || !msg) {
      return res.redirect("/send-mail?status=400");
    }

    let transporter = nodemailer.createTransport({
      host: process.env.NEXT_MAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NEXT_MAIL_USER, // generated ethereal user
        pass: process.env.NEXT_MAIL_PW, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"lukasstaub.xyz" <' + process.env.NEXT_MAIL_FROM + ">", // sender address
      to: process.env.NEXT_MAIL_TO, // list of receivers
      subject: `New message from lukasstaub.xyz: ${subject} - ${name}`, // Subject line
      text: `${msg}\n\nFrom: ${name} (${email})`, // plain text body
    });

    return res.redirect("/send-mail?status=200");
  } catch (e) {
    console.error(e);
    return res.redirect("/send-mail?status=500");
  }
}
