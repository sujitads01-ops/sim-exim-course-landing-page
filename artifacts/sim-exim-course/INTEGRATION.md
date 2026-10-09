# Enquiry form integration

## Current behavior

The form is a front-end enquiry interface only. It validates the entered details and consent, but it has no email, CRM, WhatsApp, or database destination configured. Submitting it must not claim that an enquiry was sent or show a success confirmation.

## To connect lead capture

1. Confirm which destination SIM wants to use: an institute-managed API/database, email service, CRM, or another approved channel.
2. Add a server-side submission endpoint and validate all submitted fields there. Do not send enquiries directly from the browser to a private service or expose credentials in frontend code.
3. Send the approved form fields: full name, phone/WhatsApp number, email, course selection, preferred counselling date, preferred time, and contact consent.
4. Treat the date and time as preferences only; do not create or imply a confirmed appointment.
5. Show submission success only after the endpoint confirms it accepted the enquiry. Show a clear failure state if the request fails, and avoid discarding the entered details on failure.
6. Confirm SIM's privacy notice and retention policy before storing or forwarding personal information.

SIM has supplied a public contact phone number (+91 98206 33814) and email address (sim639212@gmail.com), which are linked in the page for visitors to contact the institute directly. The form still has no submission endpoint or connected CRM, so form entries are not transmitted.
