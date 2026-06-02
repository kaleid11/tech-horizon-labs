---
name: Email delivery (Resend)
description: Why email sends can silently fail in this project and how recipients are wired.
---

# Email delivery via Resend

## "Resend not connected" means the connector isn't bound to this Repl
The Resend connector can be authorized at the account level yet have
connection status `not_added` (not bound to this specific Repl/deployment).
When that happens, `getCredentials()` in `server/email.ts` throws
"Resend not connected" and **every** email silently fails — contact
notifications, auto-replies, and audit emails alike.

**Why:** the credential proxy only serves secrets to Repls registered as
permitted consumers. Account-level auth alone is not enough.

**How to apply:** if email isn't arriving, first check the connection is
bound, not just that Resend is "installed". Fix by running `addIntegration`
then `proposeIntegration` for the Resend connection, then restart the
workflow. Confirm via an end-to-end contact POST and check logs for no
send failures. Separately, production delivery also requires the sending
domain (techhorizonlabs.com) to be "Verified" in the Resend dashboard.

## Internal notification recipients
Internal alerts (contact + audit notifications) must go to the business
inbox `NOTIFY_EMAIL` (env `NOTIFY_EMAIL` || hello@techhorizonlabs.com),
**not** the Resend "from" address, with `replyTo` set to the submitter so
staff can reply directly. A past bug sent `to: fromEmail`, so submissions
never reached the team.
