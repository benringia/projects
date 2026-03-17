# Vue Component

Use this when asking Claude Code to create a new component.

```
Create a Vue 3 component called [ComponentName] using <script setup>.

It should:
- [describe the main purpose]
- Accept props: [list props and types]
- Emit events: [list events if any]

Follow the conventions in CONTEXT.md.
```

---

# Debug Helper

Use this when you're stuck on a bug.

```
Here's the relevant code:

[paste code]

Expected behavior: [what should happen]
Actual behavior: [what's happening instead]
Error message (if any): [paste error]

Please:
1. Identify the likely cause
2. Suggest a fix with explanation
3. Point out any related issues you notice
```

---

# Liquid + JS Filter

Use this for the blog filtering work.

```
I have a Liquid template that renders [describe items].
I need to filter them by [field] using JavaScript.

Current HTML output structure:
[paste example HTML]

Current JS:
[paste current script]

Goal: [describe what you want the filter to do]
```

---

# Code Review

```
Please review this code for:
- Bugs or edge cases I may have missed
- Vue best practices
- Performance issues
- Anything that might break in production

[paste code]
```

---

# Refactor Request

```
Refactor this code to be [cleaner / more readable / more performant].
Keep the same behavior. Explain what you changed and why.

[paste code]
```
