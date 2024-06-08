import { Resend } from 'resend';

const resend = new Resend('re_RMjmCxpW_JaMdScBCYsyC7P3SdY8GtxcX');

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello World',
    html: '<strong>ready!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();