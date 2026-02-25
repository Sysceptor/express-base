You want to create a local branch **already linked (tracking) to a remote branch**. Here are the clean, real-world ways used in teams.

---

## ✅ Case 1 — Remote branch already exists (most common)

If `origin/dev` already exists and you want a local branch tracking it:

```bash
git checkout -b dev origin/dev
```

**What happens**

* creates local branch `dev`
* links it to `origin/dev`
* sets upstream automatically

✔ ready for `git pull`
✔ ready for `git push`

---

### 🔥 Modern Git (recommended)

```bash
git switch --track origin/dev
```

or explicitly:

```bash
git switch -c dev --track origin/dev
```

---

## ✅ Case 2 — Local branch exists, but not linked yet

Link it manually:

```bash
git branch --set-upstream-to=origin/dev dev
```

---

## ✅ Case 3 — You create a new branch and push it for the first time (VERY common in companies)

### Step 1 — create branch locally

```bash
git checkout -b feature/auth-api
```

### Step 2 — push and set upstream in one command

```bash
git push -u origin feature/auth-api
```

✅ This is the **best practice**

**What `-u` does**

* pushes branch
* sets tracking
* future pushes become simple

After this you can just run:

```bash
git push
git pull
```

---

## 🧠 Pro tip (senior-level workflow)

Most developers use this pattern:

```bash
git checkout -b feature/<name>
git push -u origin feature/<name>
```

Example:

```bash
git checkout -b feature/jwt-auth
git push -u origin feature/jwt-auth
```

---

## 🚨 How to verify tracking

Run:

```bash
git branch -vv
```

You should see:

```
dev    abc123 [origin/dev] commit message
```

---

Perfect — here’s the **company-grade Git workflow** most teams expect from a ~4–5 year Node.js developer. This is exactly the level interviewers love.

---

# 🚀 1. Professional Branch Naming Convention

### ✅ Standard pattern

```
<type>/<ticket>-<short-description>
```

### 🔥 Common types used in real teams

| Type     | Purpose          | Example                      |
| -------- | ---------------- | ---------------------------- |
| feature  | new feature      | feature/JIRA-123-user-login  |
| bugfix   | bug fixes        | bugfix/JIRA-456-token-error  |
| hotfix   | urgent prod fix  | hotfix/JIRA-789-payment-fail |
| chore    | maintenance      | chore/update-deps            |
| refactor | code improvement | refactor/auth-service        |

---

## ✅ Real-world examples

Good:

```bash
feature/AUTH-101-jwt-login
bugfix/AUTH-203-refresh-token
hotfix/PAY-11-double-charge
```

Bad (junior style 🚫):

```bash
newbranch
test123
dev2
authwork
```

---

# 🌳 2. Enterprise Branch Strategy

## ⭐ Trunk-Based Development (most modern teams)

```
main (production)
 └── feature branches
```

### Flow

1. create feature branch
2. develop
3. PR → main
4. delete branch

### ✅ Why companies love it

* faster releases
* simpler CI/CD
* less merge conflicts
* works great with microservices

---

## 🏢 GitFlow (older but still asked in interviews)

```
main (prod)
develop (integration)
 ├── feature/*
 ├── release/*
 └── hotfix/*
```

### ⚠️ Reality check

* Many companies are moving away from full GitFlow
* But interviewers still ask it

**Senior answer tip:**

> “I prefer trunk-based with short-lived feature branches unless release management requires GitFlow.”

💥 That sounds very senior.

---

# 🧠 3. Production-Grade Daily Workflow (what seniors actually do)

## Step-by-step

### 1️⃣ Start from updated main

```bash
git checkout main
git pull origin main
```

---

### 2️⃣ Create feature branch

```bash
git checkout -b feature/AUTH-101-jwt-login
```

---

### 3️⃣ Work + commit properly

✅ Good commit message style:

```bash
feat(auth): add JWT login endpoint
fix(auth): handle token expiry
refactor(user): optimize query
```

❌ Bad:

```bash
update
changes
fixed bug
```

---

### 4️⃣ Push with upstream

```bash
git push -u origin feature/AUTH-101-jwt-login
```

---

### 5️⃣ Create Pull Request

PR should include:

* description
* screenshots (if UI)
* test cases
* linked ticket

---

### 6️⃣ After merge → cleanup (VERY senior habit)

```bash
git checkout main
git pull
git branch -d feature/AUTH-101-jwt-login
```

---

# 🚨 4. Common Mistakes (interview gold)

If interviewer asks:

> “What Git problems have you faced?”

You can say:

### 🔴 Mistake 1: Long-lived branches

Problem:

* huge merge conflicts
* stale code

Solution:

> “We moved to short-lived feature branches and frequent rebasing.”

---

### 🔴 Mistake 2: Direct push to main

Solution:

* protected branches
* mandatory PR review
* CI checks

---

### 🔴 Mistake 3: Messy commit history

Solution:

```bash
git rebase -i main
```

---


