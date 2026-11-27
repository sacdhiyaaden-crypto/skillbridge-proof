# SkillBridge build plan

## User experience
- Replace the home placeholder with a complete, mobile-first SkillBridge candidate dashboard.
- Add a top-level Candidate / Employer demo switch; the employer view will present a compact skills verification workspace.
- Build the four candidate evidence paths: timed scenario assessment, trade-proof upload with checklist, portfolio gallery, and endorsement-link sharing.
- Keep interactions low-bandwidth friendly and usable on touch screens, with accessible labels and clear feedback.

## Design
- Establish the emerald, slate, and crisp-white visual system in the global stylesheet, then use semantic tokens throughout the page.
- Use a compact navigation rail on wider screens and an accessible bottom navigation on mobile.

## Technical details
- Keep this as a frontend-only demo with local React state; no backend, accounts, or external media are needed for the requested demo.
- Add route-specific metadata for `/`, update project guidance for the single-page demo structure, then run the relevant route test and verify the live preview at mobile and desktop sizes.
