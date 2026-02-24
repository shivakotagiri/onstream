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
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
                /* Base Resets */
                body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
                
                /* Font Styling */
                body, td, th { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
                
                /* Mobile Optimization */
                @media only screen and (max-width: 480px) {
                    .wrapper { width: 100% !important; padding: 20px !important; }
                    .content { padding: 30px 20px !important; }
                    .button { width: 100% !important; display: block !important; }
                }
            </style>
        </head>
        <body style="margin:0; padding:0; background-color:#F2F2F2; color:#1a1a1a;">

            <div style="display:none; font-size:1px; color:#333333; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
                Secure link to reset your onStream password.
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F2F2F2;">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        
                        <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:480px; margin:0 auto;">
                            
                            <tr>
                                <td align="center" style="padding-bottom: 30px;">
                                    <div style="font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #888888;">
                                        ONSTREAM
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="content" style="background-color:#ffffff; padding: 48px; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td align="center" style="padding-bottom: 24px;">
                                                <div style="background-color: #F7F7F7; border-radius: 50%; width: 64px; height: 64px; line-height: 64px;">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/8472/8472244.png" width="24" height="24" alt="Key" style="vertical-align: middle; opacity: 0.7;">
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                    <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; text-align: center; color: #000000; letter-spacing: -0.5px;">
                                        Reset your password
                                    </h1>

                                    <p style="margin: 0 0 32px; font-size: 15px; line-height: 26px; text-align: center; color: #555555;">
                                        We received a request to reset your password for your <strong>${user.email || "onStream"}</strong> account.
                                    </p>

                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td align="center">
                                                <a href="${url}" class="button" style="background-color:#000000; color:#ffffff; display:inline-block; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size:14px; font-weight:600; line-height:46px; text-align:center; text-decoration:none; width:240px; border-radius:8px; letter-spacing: 0.5px;">
                                                    Reset password
                                                </a>
                                                </td>
                                        </tr>
                                    </table>

                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td style="padding: 32px 0;">
                                                <div style="height: 1px; background-color: #EAEAEA; line-height: 1px;">&nbsp;</div>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="margin: 0; font-size: 13px; line-height: 20px; color: #888888; text-align: center;">
                                        If the button above doesn't work, verify by copying and pasting this link into your browser:
                                    </p>
                                    <p style="margin: 12px 0 0; font-size: 13px; line-height: 20px; text-align: center; word-break: break-all;">
                                        <a href="${url}" style="color: #555555; text-decoration: underline;">${url}</a>
                                    </p>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding-top: 24px;">
                                    <p style="margin: 0; font-size: 12px; line-height: 20px; color: #999999;">
                                        This link will expire in 60 minutes.<br>
                                        Not you? You can safely ignore this email.
                                    </p>
                                    <p style="margin: 16px 0 0; font-size: 12px; color: #999999;">
                                        © ${new Date().getFullYear()} onStream Inc.
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
