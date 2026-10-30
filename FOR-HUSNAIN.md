# For Husnain — app-side changes and confirmations

## Links for the app (signup screen, settings, store listings)
- Terms: https://cirkleup.com/terms
- Privacy Policy: https://cirkleup.com/privacy
- Support: https://cirkleup.com/support
- FAQ: https://cirkleup.com/faq
- Child Safety: https://cirkleup.com/child-safety
(Publish the site first so the links work. Terms is still a draft until placeholders are filled.)

## Invite code recommendation (invite codes are single-use and emailed)
1. Best long term: an "Invite friends" screen in the app listing the member's 5 codes with status (unused / used by @username) and a Share button. Members then never need the admin to send codes.
2. For waitlist approvals: an admin panel action "Approve and send invite" that generates a single-use code and emails it automatically (Firebase Trigger Email extension, SendGrid or similar), using a template that links to the App Store/Google Play. This replaces manual emailing.
3. Interim, no build: generate codes in the admin panel and send them by email from the Formspree submissions list (copy-paste or mail merge). Fine for a small weekly batch, but it won't scale.
Avoid writing scripts directly into the app; keep it in the admin panel and Cloud Functions.

## Next milestone items to scope
- Withdrawal / payout flow (method, minimum, fees, identity and tax checks; what happens to an unpaid balance at deletion).
- Automatic image/video scanning and/or age assurance, if wanted. Currently NOT in the app, so the Child Safety page no longer claims them.

## New policy to implement (stated publicly in Terms/FAQ)
- 18+ only for hosting paid events and for withdrawing earnings (check DOB).
- If an account with an unpaid earned balance is deleted: hold the balance up to 30 days for review, then pay confirmed earnings once withdrawals exist.

## Update: minimum age is now 18 (site says 18+ everywhere)
- Raise the signup date-of-birth gate from 13 to 18.
- Update the Apple age-rating questionnaire and Google Play target audience / content rating to match an 18+ app.
- Decide what happens to any existing accounts under 18 (notice, then removal) and tell Eric.
- The separate "18+ for paid events and withdrawals" rule is no longer needed, since everyone is 18+.
