# CirkleUp landing site — handoff for a new chat
Last updated: 29 Oct 2026. Upload this file plus the repo files (and milestone docs) into the new chat.

## Who and what
- User: Eric, project manager. Developer: Husnain (FlutterFlow/Firebase). Business/client-side contact: Carl (CD). Client owner is separate and has no legal budget.
- Project: cirkleup.com static site (GitHub Pages, repo `cirkleup-landing`; folders `css/`, `js/`, `share/`; forms to Formspree `xdabakqy`). App: invite-only, App Store id6768386988 (live), Google Play com.cirkleup.app (status to confirm).

## Task status
1 download buttons: Done | 2 invite number (5): Done | 3 demo/earnings: Done | 5 lineage wording: Done
4 trust pages: FAQ, Terms, Privacy, Support, Child Safety all written, no placeholders left; lawyer review still recommended
8 invite path: documented + test script (docs/INVITE-PATH-AND-SAFETY.md); needs real-build test
9 safety tools: confirmed by Eric (report comments/people, block, delete in Account Settings); Husnain to verify details
(Tasks 6 and 7 were never on the list.)

## Confirmed facts
- Split: new creator's first 30 days 80% creator / 10% direct referrer (taken from the creator's share) / 10% platform; after 30 days 90/10. Direct invites only, event tickets only for now. Earnings pending until the event ends. Recorded correctly (Eric confirmed).
- "90%" always carries an asterisk; say "referral bonus"/"grace period", never "residual"/"network income". (Older one-time-bonus doc from 30 Aug is superseded.)
- Invite codes: single-use, delivered by email; 5 per new member by default.
- Withdrawals/payouts NOT built (next milestone). Coins bought through App Store/Google Play have no cash value.
- Deletion: Profile > Account Settings > Delete Account. Blocked users: same area.
- Support email info@cirkleup.com.

## Open items
| Item | Owner |
|---|---|
| Registered address for CirkleUp LLC (name is in Terms/Privacy; address not shown) and confirm Delaware is the right governing law (currently assumed, Eric said leave it) | Carl |
| Short one-time lawyer review of Terms (liability cap set to greater of 12-month spend or US$100, a standard template wording) before scaling | Carl / Eric |
| Enforce 18+ for hosting paid events and withdrawing earnings (policy now stated in Terms/FAQ/Child Safety) | Husnain |
| Build the 30-day earnings review when an account with unpaid balance is deleted (policy stated in Terms/FAQ) | Husnain |
| Minimum age really 13 from DOB? Extra rules for under-18? | Husnain |
| Deletion behavior matches Privacy "Data Retention" text; Play Store build live; share links on iOS and Android; post reporting | Husnain |
| Where members see their 5 single-use codes; invite email automation (see FOR-HUSNAIN.md) | Husnain / Eric |
| Signup screen links to cirkleup.com/terms and /privacy | Husnain |
| Official "Get it on Google Play" badge to replace img/google-play-badge.png | Eric |
| Next milestone: withdrawals, optional image/video scanning, age assurance | Husnain |
| Hero still says "Claim Your Invite" with an email form; since the team is past the waitlist stage, decide whether to put the store badges first and the email form second | Eric |
| Remaining soft claims: "Algorithm-free: Always", "You own your audience data: Fully yours" | Eric / Carl |
| Formspree "Reference: #XXXX" is not a real ID | Eric |
| Who updates Privacy/Terms/Support URLs in App Store Connect and Play Console | Eric / Husnain |

## Before going live
1. Upload all files in the outputs folder to the repo (icons, og-image, new cirkleUp.mp4, manifest included). 2. (Terms placeholders are filled and the DRAFT banner is removed.) 3. Add Privacy/Terms/Support URLs in App Store Connect and Play Console. 4. Test the invite path and view every page on desktop and phone (nothing has been viewed in a browser yet). 5. Add official App Store / Google Play badge images (current buttons are text-only).

## Security
The WhatsApp exports contain passwords, login codes and invite codes in plain text. Rotate them and don't share the exports. Chat exports end 31 Aug; Sep-Oct messages are not available.
