import { sendEmail } from "./send-email"

export async function sendPasswordResetEmail({
  user,
  url
}: {
  user: {
    email: string
    name: string
  }
  url: string
}) {
  return sendEmail({
    to: user.email,
    subject: "Reset your onStream password",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Password Reset</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
                <tr>
                    <td style="padding:24px; text-align:center; background:#0f172a;">
                    <h1 style="margin:0; color:#ffffff; font-size:20px;">
                        onStream Password Reset
                    </h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding:32px; color:#1f2937;">
                    <p style="margin:0 0 16px;">
                        Hi ${user.name || "there"},
                    </p>
                    <p style="margin:0 0 16px;">
                        We received a request to reset your onStream account password.
                        Click the button below to set a new password.
                    </p>
                    <div style="text-align:center; margin:32px 0;">
                        <a href="${url}"
                        style="
                            background:#2563eb;
                            color:#ffffff;
                            text-decoration:none;
                            padding:12px 24px;
                            border-radius:6px;
                            display:inline-block;
                            font-weight:600;
                        ">
                        Reset Password
                        </a>
                    </div>

                    <p style="margin:0 0 16px; font-size:14px; color:#4b5563;">
                        This password reset link will expire shortly for security reasons.
                    </p>

                    <p style="margin:0; font-size:14px; color:#4b5563;">
                        If you didn’t request a password reset, you can safely ignore this email.
                    </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:24px; text-align:center; font-size:12px; color:#6b7280; background:#f9fafb;">
                    <p style="margin:0;">
                        © ${new Date().getFullYear()} onStream. All rights reserved.
                    </p>
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>
    `,
    text: `Hi ${user.name || "there"},\n We received a request to reset your onStream account password.\n Open the link below to set a new password: \n ${url} \n If you didn’t request this, you can safely ignore this email. \n — onStream Team`
  })
}
