Prepare a pull request title and description for the current branch, based on committed changes and the project's PR template.

## Steps

1. Run these commands in parallel to gather context:
   - `git log main...HEAD --oneline` — list commits since main
   - `git diff main...HEAD --stat` — files changed
   - `git diff main...HEAD` — full diff for understanding intent

2. Analyze the commits and changes to determine:
   - The **type** of change (feat, fix, refactor, chore, docs, style, perf, test)
   - The **scope** if applicable (component, page, config, etc.)
   - Whether it is a breaking change

3. Produce a **PR title** following Conventional Commits:
   ```
   <type>(<scope>): <short description in imperative mood>
   ```
   Examples: `feat(home): rewrite intro copy`, `fix(nav): resolve mobile overflow`, `chore(deps): update nuxt to 4.3`

4. Fill out the PR description using this exact template structure, ticking the relevant checkbox(es) with `x`:

```markdown
### 🔗 Linked issue

<!-- If it resolves an open issue, please link the issue here. For example "Resolves #123" -->

### ❓ Type of change

- [ ] 📖 Documentation (updates to the documentation or readme)
- [ ] 🐞 Bug fix (a non-breaking change that fixes an issue)
- [ ] 👌 Enhancement (improving an existing functionality)
- [ ] ✨ New feature (a non-breaking change that adds functionality)
- [ ] 🧹 Chore (updates to the build process or auxiliary tools and libraries)
- [ ] ⚠️ Breaking change (fix or feature that would cause existing functionality to change)

### 📚 Description

<!-- Describe your changes in detail -->
```

   - Replace the Description comment with a concise paragraph explaining **what** changed and **why**.
   - If no issue is linked, leave the Linked issue section as-is (with the comment).
   - Everything must be written in **English**.

5. Output the title and description ready to copy-paste, clearly separated.
