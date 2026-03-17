# Obsidian Vault Starter

Drop this folder structure into your project repo, then open the project root as an Obsidian vault.

## Setup steps

1. Copy these folders into your project root
2. Open Obsidian → "Open folder as vault" → select your project folder
3. Fill in CONTEXT.md with your project details
4. Start a daily log: duplicate `logs/_template.md`, rename it to today's date (e.g. `2025-01-15.md`)

## Using with Claude Code

At the start of a Claude Code session, paste this:

```
Read CONTEXT.md for project context, then help me with: [your task]
```

Or for architecture questions:

```
Read CONTEXT.md and docs/ARCHITECTURE.md, then [your question]
```

## Folder guide

| Folder | Purpose |
|---|---|
| `CONTEXT.md` | Single source of truth about the project — feed to Claude Code |
| `docs/` | Architecture decisions, technical notes |
| `prompts/` | Reusable Claude prompt templates |
| `logs/` | Daily dev logs — what you worked on, what you learned |
| `assets/` | Screenshots, diagrams, images |
