# ADR-0002 — Preserve source exports and portable evidence

- **Status:** Proposed
- **Date:** 2026-11-07

## Context
Chat exports can be incomplete, contain attachments selectively, and change format.

## Decision proposed
Store original files immutably, derive normalized records without destroying originals, attach SHA-256 checksums and manifest schema versions, and surface import warnings. Export open-format manifests independently of the application.

## Consequences
Additional storage and format-maintenance work; history cannot be declared complete from a successful parse alone.
