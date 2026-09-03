# GutterMaxx 5MinQuote

Public-facing 5-minute instant quote frontend for GutterMaxx, deployed at `go.guttermaxx.com`.

## Overview
Customer-facing flow: address entry → residential/coverage pre-checks (§4b) → abuse/fraud gate (§4) → manual Bypass review (§4c) → Vexcel measurement + canopy pull → priced sales deck.

Full architecture: see the "5MinQuote Architecture and Umang Answers" doc shared with the GutterMaxx team.

## Stack
- Next.js, deployed on Vercel at `go.guttermaxx.com`
- Supabase (dedicated project `guttermaxx-5minquote`, ref `ahjljgwhrxkmhtfnosoo`) for data storage — separate from `guttermaxx-connector`'s project
- Twilio Verify for OTP
- Smarty US Address Verification API (RDI)
- ATTOM Property Data API (parcel/owner/land-use)
- Backend API: `guttermaxx-5minquote-worker` (separate repo, Vercel serverless functions) — bypass gate + Vexcel canopy-callback intake

## The "slide deck" flow
The customer-facing quote experience *is* the deck — an in-browser, animated slide sequence (landing page = Slide 1), not a downloadable file. Lives entirely in this repo as the pipeline progresses: property photo reveal → canopy overlay → measurement summary → price reveal → financing. Driven by data written to the dedicated Supabase project by `guttermaxx-5minquote-worker` as each submission's pre-checks, Bypass gate, and Vexcel packets complete.

## Status
Scaffolding — implementation in progress.
