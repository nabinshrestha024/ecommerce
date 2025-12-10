# E-Commerce Platform – Branching Strategy & Commit Guidelines

This document defines the branching strategy, naming conventions, and commit message format for the e-commerce platform.

---

## Branch Structure

```
main                    # Production-ready code (protected)
└── develop             # Integration branch (protected)
    ├── BE-*            # Backend feature/fix branches
    └── FE-*            # Frontend feature/fix branches
```

### Protected Branches

| Branch    | Direct Push | Force Push | Requires PR | Required Reviewers |
|-----------|-------------|------------|-------------|-------------------|
| `main`    | ❌ No       | ❌ No      | ✅ Yes      | 2                 |
| `develop` | ❌ No       | ❌ No      | ✅ Yes      | 1                 |

---

## Branch Naming Convention

All branches **must** follow these prefixes:

### Backend Branches (BE-)

| Type    | Format                        | Example                              |
|---------|-------------------------------|--------------------------------------|
| Feature | `BE-feature/<ticket>-<desc>`  | `BE-feature/123-add-auth-module`     |
| Bugfix  | `BE-bugfix/<ticket>-<desc>`   | `BE-bugfix/456-fix-cart-total`       |
| Hotfix  | `BE-hotfix/<ticket>-<desc>`   | `BE-hotfix/789-payment-callback`     |
| Refactor| `BE-refactor/<ticket>-<desc>` | `BE-refactor/101-optimize-queries`   |

### Frontend Branches (FE-)

| Type    | Format                        | Example                              |
|---------|-------------------------------|--------------------------------------|
| Feature | `FE-feature/<ticket>-<desc>`  | `FE-feature/123-add-login-page`      |
| Bugfix  | `FE-bugfix/<ticket>-<desc>`   | `FE-bugfix/456-fix-cart-ui`          |
| Hotfix  | `FE-hotfix/<ticket>-<desc>`   | `FE-hotfix/789-checkout-error`       |
| Refactor| `FE-refactor/<ticket>-<desc>` | `FE-refactor/101-optimize-components`|

### Naming Rules

- Use **lowercase** letters
- Use **hyphens** (`-`) to separate words
- Include **ticket/issue number** when available
- Keep descriptions **short but meaningful** (2-4 words)

---

## Workflow

### Feature Development

```
1. Create branch from develop
   git checkout develop
   git pull origin develop
   git checkout -b BE-feature/add-auth-module

2. Develop and commit changes
   git add .
   git commit -m "feat(auth): add JWT token generation"

3. Push branch to remote
   git push -u origin BE-feature/123-add-auth-module

4. Create Pull Request to develop
   - Assign reviewers
   - Link related issues

5. After approval, merge to develop (squash or merge commit)
```

### Release to Production

```
1. Create PR from develop to main
2. Require 2 reviewer approvals
```
---

## Commit Message Format

We follow the **Conventional Commits** specification.

### Types

| Type       | Description                                      |
|------------|--------------------------------------------------|
| `feat`     | New feature                                      |
| `fix`      | Bug fix                                          |
| `docs`     | Documentation changes                            |
| `style`    | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring (no feature or fix)             |
| `perf`     | Performance improvement                          |
| `test`     | Adding or updating tests                         |
| `build`    | Build system or dependency changes               |
| `ci`       | CI/CD configuration changes                      |
| `chore`    | Other changes (maintenance tasks)                |

### Scopes (Examples)

**Backend:**
- `auth`, `catalog`, `cart`, `orders`, `payments`, `inventory`, `notifications`, `profile`, `reports`, `admin`

**Frontend:**
- `ui`, `auth`, `catalog`, `cart`, `checkout`, `orders`, `profile`, `admin`, `components`

### Examples

```
feat(auth): add JWT token refresh endpoint

```

```
fix(cart): correct total calculation with discounts
```

```
refactor(catalog): optimize product search query
```

```
docs(readme): update installation instructions
```

```
style(ui): format components with prettier
```

---

## Git Hooks Configuration

### Pre-commit Hook (Commit Message Validation)

Create `.husky/commit-msg` (if using Husky) or `.git/hooks/commit-msg`:

```bash
#!/bin/sh

commit_regex='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\([a-z]+\))?: .{1,72}$'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid commit message format!"
    echo ""
    echo "Expected format: <type>(<scope>): <subject>"
    echo ""
    echo "Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore"
    echo "Example: feat(auth): add login endpoint"
    echo ""
    exit 1
fi
```

### Pre-push Hook (Branch Name Validation)

Create `.husky/pre-push` or `.git/hooks/pre-push`:

```bash
#!/bin/sh

branch=$(git symbolic-ref --short HEAD)
protected_branches="^(main|develop)$"
valid_branch_regex="^(BE|FE)-(feature|bugfix|hotfix|refactor)/[a-z0-9-]+$"

# Prevent direct push to protected branches
if echo "$branch" | grep -qE "$protected_branches"; then
    echo "❌ Direct push to '$branch' is not allowed!"
    echo "Please create a PR instead."
    exit 1
fi

# Validate branch naming convention
if ! echo "$branch" | grep -qE "$valid_branch_regex"; then
    echo "❌ Invalid branch name: $branch"
    echo ""
    echo "Branch must start with BE- or FE- followed by type:"
    echo "  BE-feature/xxx, BE-bugfix/xxx, BE-hotfix/xxx, BE-refactor/xxx"
    echo "  FE-feature/xxx, FE-bugfix/xxx, FE-hotfix/xxx, FE-refactor/xxx"
    echo ""
    echo "Example: BE-feature/123-add-auth-module"
    exit 1
fi
```

---

## GitHub/GitLab Branch Protection Rules

### For GitHub

Navigate to **Settings > Branches > Add rule** for `main` and `develop`:

**main branch:**
- ✅ Require a pull request before merging
- ✅ Require approvals: 2
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes: disabled
- ❌ Allow deletions: disabled

**develop branch:**
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
- ❌ Allow force pushes: disabled
- ❌ Allow deletions: disabled

### Branch Name Pattern Rules (GitHub)

Add ruleset for branch naming:
- Pattern: `**`
- Exclude: `main`, `develop`
- Require branch name to match: `^(BE|FE)-(feature|bugfix|hotfix|refactor)/.*`

---

## Summary

| Aspect              | Rule                                                    |
|---------------------|---------------------------------------------------------|
| Backend branches    | Must start with `BE-`                                   |
| Frontend branches   | Must start with `FE-`                                   |
| Protected branches  | `main`, `develop` – no direct push                      |
| PR to main          | Requires 2 approvals                                    |
| PR to develop       | Requires 1 approval                                     |
| Commit format       | `<type>(<scope>): <subject>` (Conventional Commits)     |
| Branch format       | `{BE|FE}-{type}/{ticket}-{description}`                 |
