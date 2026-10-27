# CirkleUp landing — revision log

Status key: Done / In progress / Blocked / Needs-you

## Task 2 — One invite number everywhere (Done)
- **Decision:** 5 invites for founding members (matched 2 of the 3 existing mentions).
- **Changed (`index.html`):** hero "what next" line said "access + 3 invites" -> now "access + 5 invites".
- **Verified:** searched the file for "invite" numbers; hero note, hero what-next and final CTA checklist all say 5.
- **Follow-up:** `support.html` FAQ is vague on the number; align it in task 4. Confirm 5 matches what the app really grants.

## Task 3 — Demo / earnings display (Done)
- **Removed:** "This month's earnings $0" badge and its counter script (it animated to $2,840), the "+$847 earned" floating badge, the "+$2,840/mo" badge in the lineage tree, "14 new members".
- **Replaced with:** neutral "Your Cirkle / Invite-only" strip, "90% yours" and "Real community" badges, generic sample posts (Creator / Musician / Filmmaker, no fake names, times or like counts).
- **Verified:** no `$` amounts or counter code remain in `index.html`.
- **Follow-up (task 5):** tree still shows initials (L.P., M.R. ...) and hero avatar stack shows initials; rework with the lineage wording.

## Task 1 — Download buttons (Done)
- **Added (`index.html`):** "I have an invite — download the app" block with App Store and Google Play buttons in the hero (anchor `#download`) and under the final CTA form; "Have an invite?" link in the nav (hidden on very small screens).
- **Store URLs:** copied from `share.js` (App Store id6768386988, Google Play com.cirkleup.app).
- **Verified:** HTML parses; not yet checked visually in a browser (check hero on desktop and mobile).
- **Follow-up:** buttons are text-only; swap in the official App Store / Google Play badge images if you want them.

## Task 5 — Lineage wording (Done)
- **Lead message is now:** creators keep 90% of their own earnings (10% platform fee); invites described as a vouched-for community.
- **Removed:** "builds under you forever", "permanent network", "position gets more valuable", "∞ levels deep", "Position locked: Forever", "Founding spot locked in". Feature card renamed "Permanent lineage system" -> "Invite network". Tree labels now "Member" / "Circle 1" / "Circle 2" (no initials, no "Tier").
- **Verified:** searched file for forever / permanent / locked / builds under / more valuable / tier / infinity; only CSS class names and "permanent, searchable library" remain.
- **Correction after Milestone 5 doc:** members DO earn a referral bonus (10% of a direct invitee's ticket sales for 30 days; invitee earns 80% in that window, then 90%). Every "90%" on the homepage now carries an asterisk with a footnote (above the footer and under the lineage section), per the marketing rule. Copy now names the referral bonus and says earnings come from ticketed events (shop/tournaments/gifting not live yet), and avoids "residual" / "network income".
- **Left as is:** comparison table claims ("Guaranteed" bot-free, ~55% figures) and the hero avatar initials; revisit in task 4.

## Task 4 — Trust pages (In progress: drafts done, placeholders need your input)
- **Added:** `faq.html` (incl. payouts, referral bonus, cancellations/refunds, Liberty Coins, safety, deletion) and `terms.html` (draft). Both have a yellow DRAFT banner and highlighted [PLACEHOLDERS] that MUST be filled before publishing.
- **Linked:** footer of homepage (FAQ, Terms), and footers of support, privacy and child-safety pages. Removed the dead "About" link. Support FAQ now says 5 invites and points to the FAQ.
- **Needs-you (placeholders):** company legal name + address, minimum age, payout details, Liberty Coins definition, liability cap, governing law, block/moderation details.
- **Not yet fixed in Privacy / Child Safety:** 18+ vs 13+ age conflict, contact@ vs info@ for deletion, entity/governing-law mismatch, empty "Objectives" heading, @import placement. Waiting on your decisions.
- **Store listings:** add the Privacy, Terms and Support URLs in App Store Connect and Play Console (cannot be done from this repo).
## Task 8 — Invite path end to end (Needs-you: app/backend access)
## Task 9 — Safety tools (Needs-you: confirm in app)
