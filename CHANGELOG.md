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


## Update after reading the team chat (Done)
- **Store link bug:** the App Store URL used the Eswatini storefront (`/sz/`), which can show "not available" elsewhere. Changed to a storefront-neutral link in `index.html`, `js/share.js`, `404.html`, `share/index.html`.
- **Invite number:** chat spec says every new member starts with 5 invite codes (trust tier based), so wording changed from "Founding members get 5" to "Every new member starts with 5" (hero, final CTA, FAQ, Support). "Founding member status" -> "A vouched-for community"; tree root label "FOUNDING" -> "INVITER".
- **Age conflict resolved (13+):** the app enforces min age 13 (DOB). Privacy Policy section 7 changed from 18+ to 13+; Terms states 13 with a lawyer note on under-18s and payouts.
- **Deletion/contact:** account deletion exists in-app (Apple requirement), so Privacy, Support, FAQ and Terms now say so; `contact@` -> `info@`.
- **FAQ/Terms placeholders filled from chat:** Liberty Coins (bought via App Store/Google Play, spent on tickets/paid features; XP separate), reporting/blocking/moderation, age. Added an Apple/Google clause to Terms.
- **Still open:** payout details (Stripe is mentioned, no withdrawal flow described), whether coins can be cashed out, company legal name/address, governing law, liability cap, Child Safety page claims, DRAFT banners on faq/terms.
- **Tasks 8 and 9:** see `docs/INVITE-PATH-AND-SAFETY.md` (how the invite path works per chat, gaps, test script, safety checklist).
- **Security:** the chat export contains passwords, login codes and invite codes in plain text. Rotate them and avoid sharing the export.

## Big update after Eric's answers (Done)
- **Confirmed by Eric:** 80/10/10 for a new creator's first 30 days with the referral bonus coming out of the new creator's share (platform keeps flat 10%); report/block live (report comments and people; blocked users can no longer interact); account deletion at Profile > Account Settings > Delete Account; invite codes are single-use and delivered by email; 80/10/10 recorded and earnings pending until event ends; withdrawals NOT built yet (next milestone); Terms/Privacy links can be added in-app; App Store live.
- **FAQ:** DRAFT banner removed (no placeholders left). Payouts answer now says withdrawals are not available yet and will be announced; coins have no cash value; single-use invite codes by email; deletion path; blocking.
- **Terms:** payout placeholder replaced with "not yet available" wording; coins no cash value; deletion path. Still DRAFT: company name/address, governing law, liability cap, lawyer review, unpaid-balance-on-deletion decision.
- **Privacy:** Data Retention rewritten with what is deleted and what may be kept (security/moderation records up to 90 days; transaction/financial records as law requires; backups rolled within 90 days). Deletion path added. Husnain must confirm the app actually behaves this way.
- **Child Safety:** rewritten to what the app does (13+ via DOB, in-app reporting, blocking, moderation by team, deletion). Removed unsupported claims: AI image/video scanning, ID-scan age verification, blocked channels, under-13 chat lock, "GmbH", ads section, 18+ channels.
- **Homepage:** invite path text updated (code by email, single-use); comparison table "Bot-free: Guaranteed" -> "Invite-only"; video preload set to metadata; og:image/twitter card added.
- **Assets (new files to upload):** favicon-16x16.png (837 KB -> 0.5 KB), favicon-32x32.png (883 KB -> 1.5 KB), apple-touch-icon.png (864 KB -> 23 KB), android-chrome-192x192.png and 512x512.png (new, the manifest referenced missing files), og-image.png (new), cirkleUp.mp4 (12.3 MB -> ~1 MB, audio removed since it autoplays muted; keep the original as a backup), site.webmanifest (name, icons, dark theme colors).
- **Still open:** company legal name/address, governing law, liability cap and lawyer review (Carl); minimum age and under-18 rules, image/video scanning, Play Store build and share-link status (Husnain); moderation response time wording; unverified marketing claims ("2,400+ creators", "YouTube 45% / Spotify 70%", "reach down 90%", ~55% table).

## Store badges (Done, interim)
- Replaced the text buttons with badge images (`img/app-store-badge.png`, `img/google-play-badge.png`) in the hero and final CTA of `index.html`; same store links.
- The Apple badge is the current "Download on the App Store" design. The Google badge in the zip is the old "Android app on Google play" design (third-party seeklogo file). Replace it with the official "Get it on Google Play" badge from Google's badge page, using the same file name (img/google-play-badge.png), no code change needed.

## Answers from the group (Done)
- **Company:** "CirkleUp LLC" in Terms, Privacy overview/contact, Child Safety byline and all footers. No address given, so none shown.
- **Governing law:** kept Delaware (Privacy) and made Terms match; removed Privacy's reference to a non-existent arbitration clause and "Terms & Conditions" wording.
- **Liability cap:** standard wording: greater of amount paid in the previous 12 months or US$100. Recommend a short one-time lawyer review before scaling.
- **18+:** hosting paid events and withdrawing earnings limited to 18+ (Terms, FAQ, Child Safety).
- **Deletion with unpaid balance:** up to 30 days review to confirm earnings are valid, then confirmed earnings paid once withdrawals exist (Terms, FAQ).
- **Reports:** no promised time; wording stays "we prioritize reports involving children".
- **Marketing claims:** removed "2,400+ creators" (hero, stats bar, meta description), fake avatar stack, "YouTube 45% / Spotify 70%" (also factually shaky), "reach down 90%", the ~55% table figures (now "Varies"), "Platforms take 45%". Stat now shows "5 invites for every new member".
- **Waitlist stage:** removed all "invites drop every Monday" claims (homepage, success modal, how-it-works, FAQ, Support). Copy now: have a code, download and enter it; otherwise request an invite and we email a code when a spot opens.
- **Terms:** DRAFT banner removed; no placeholders remain.

## Past-waitlist layout, 18+ everywhere, reports first (Done)
- **Homepage:** store badges now come first in the hero and final CTA ("I have an invite - download the app"); the email form is second, relabelled "No invite code yet? Request one" with "Request an Invite" buttons, so people can still ask for an invite. Nav link now "Download the app".
- **Minimum age 18 everywhere:** Privacy, Terms, FAQ, Child Safety. Removed the 13-17 wording and the separate "18+ for paid events/withdrawals" lines (now redundant).
- **Reports:** "reports involving children are reviewed first" in Child Safety and FAQ; no promised time.
- **App must change:** signup DOB gate 13 -> 18, store age ratings, existing under-18 users. See FOR-HUSNAIN.md.
