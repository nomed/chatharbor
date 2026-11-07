#!/usr/bin/env python3
"""Bounded, dependency-free validation of ChatHarbor's *declared* governance profile.

This is not the canonical Golden Path schema validator or adoption/status report.
"""
from __future__ import annotations
import json
import re
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []

def require(test: bool, label: str) -> None:
    if not test:
        errors.append(label)

try:
    manifest = json.loads((ROOT / ".golden-path/github-work-model.json").read_text(encoding="utf-8"))
except (OSError, json.JSONDecodeError) as exc:
    print(f"FAIL: cannot read GitHub manifest: {exc}")
    sys.exit(1)

require(manifest.get("schemaVersion") == 1, "GitHub schemaVersion must be 1")
require(manifest.get("connector") == "golden-path.connector.github", "connector must be GitHub")
require(manifest.get("repository") == "nomed/chatharbor", "repository identity mismatch")
require(manifest.get("fieldAuthority") == "project_owned", "field authority must be Project-owned")
require(manifest.get("typeAuthority") == "work_type_project_field", "type authority mismatch")
require(manifest.get("projectOwnedWorkModel") == "connectors/github/project-owned-work-model.v1.json", "work model source mismatch")
require(isinstance(manifest.get("authorizedProjects"), list), "authorizedProjects must be an array")
if isinstance(manifest.get("authorizedProjects"), list):
    projects = manifest["authorizedProjects"]
    require(projects == ["nomed/7"], "selected Project must be nomed/7 until reviewed change")
    for project in projects:
        require(isinstance(project, str) and re.fullmatch(r"[^/]+/[0-9]+", project) is not None,
                "Project must use owner/numeric-id format")
for name in ("executionClaims", "workBranchRegistration", "integrationPromotion"):
    require(isinstance(manifest.get(name), dict), f"{name} must be an object")
    if isinstance(manifest.get(name), dict):
        require(manifest[name].get("enabled") is False, f"{name} must stay disabled until separately activated")

required = [
    "AGENTS.md", ".context/manifest.yaml", ".context/standards/golden-path.md",
    ".context/product/product-brief.md", ".context/product/work-graph-proposal.md",
    ".context/rfcs/RFC-0001-chatharbor-v1.md",
    ".context/decisions/ADR-0001-local-first.md",
    ".context/decisions/ADR-0002-archive-portability.md",
    ".context/decisions/ADR-0003-recovery-registry.md",
    ".context/decisions/ADR-0004-ios-baseline.md",
    ".context/architecture/recovery-drill.md",
    ".context/standards/ios-engineering.md",
]
for filename in required:
    require((ROOT / filename).is_file(), f"missing {filename}")

try:
    context = (ROOT / ".context/manifest.yaml").read_text(encoding="utf-8")
except OSError as exc:
    errors.append(f"cannot read context manifest: {exc}")
else:
    # Text-level checks only. This does not parse YAML or validate a full schema.
    for marker in ("schema_version: 1", "context_root: .context", "system_of_record: github"):
        require(marker in context, f"context manifest missing {marker}")
    for name in ("execution_claims:", "work_branch_registration:", "integration_promotion:"):
        require(name in context, f"context manifest missing {name}")

if errors:
    print("FAILED: bounded repository checks")
    for error in errors:
        print(f" - {error}")
    sys.exit(1)

print("PASSED: bounded repository checks; this is NOT Golden Path conformance.")
print(f"Authorized Projects declared: {len(manifest['authorizedProjects'])}")
print("Official schema validation, GitHub Project inspection, and adoption reporting remain separate gates.")
