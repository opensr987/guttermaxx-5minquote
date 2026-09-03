# GutterMaxx 5MinQuote

Public-facing 5-minute instant quote frontend for GutterMaxx, deployed at `go.guttermaxx.com`.

## Overview
Customer-facing flow: address entry → residential/coverage pre-checks (§4b) → abuse/fraud gate (§4) → manual Bypass review (§4c) → Vexcel measurement + canopy pull → priced sales deck.

Full architecture: see the "5MinQuote Architecture and Umang Answers" doc shared with the GutterMaxx team.

## Stack
- Next.js, deployed on Vercel
- Supabase (project `oqkayoudqccaklpnxyve`) for data storage
- Twilio Verify for OTP
- Smarty US Address Verification API (RDI)
- ATTOM Property Data API (parcel/owner/land-use)

## Status
Scaffolding — implementation in progress.
