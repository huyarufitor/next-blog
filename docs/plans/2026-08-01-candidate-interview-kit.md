# Candidate Interview Kit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a reusable Vue frontend interview bank, one scorecard, and five resume-specific 60-minute interview guides.

**Architecture:** Store all interview artifacts under the git-ignored `content/notes-local/interviews/` directory so candidate material stays local and outside production builds. Use a shared question ID system so candidate guides can reference the common bank while keeping resume-specific evidence-chain questions self-contained.

**Tech Stack:** Markdown, existing local-only knowledge base conventions.

---

### Task 1: Create the common interview bank

**Files:**
- Create: `content/notes-local/interviews/frontend-interview-question-bank.md`

1. Organize questions by JavaScript/TypeScript, Vue, admin systems, H5/JSBridge, engineering, networking, Node.js, and AI-assisted development.
2. Add expected answer, follow-ups, and positive/risk signals for every core question.
3. Mark questions as required, optional, or bonus and assign stable IDs.

### Task 2: Create the scorecard

**Files:**
- Create: `content/notes-local/interviews/interview-scorecard.md`

1. Define weighted dimensions matching the role.
2. Define 1-5 anchors and hard rejection signals.
3. Add an interview record template and recommendation rules.

### Task 3: Create five candidate guides

**Files:**
- Create: `content/notes-local/interviews/candidates/chen-guofeng.md`
- Create: `content/notes-local/interviews/candidates/hong-yuzhou.md`
- Create: `content/notes-local/interviews/candidates/liu-peng.md`
- Create: `content/notes-local/interviews/candidates/qi-weiwei.md`
- Create: `content/notes-local/interviews/candidates/zhang-yang.md`

1. Build a 60-minute timeline for each candidate.
2. Select shared baseline questions for consistent comparison.
3. Add resume evidence-chain questions, expected strong evidence, and risk signals.
4. Adapt the interaction format for online versus onsite interviews.

### Task 4: Create the local index and verify privacy

**Files:**
- Create: `content/notes-local/interviews/README.md`

1. Link the bank, scorecard, and five candidate guides.
2. Verify no phone numbers or email addresses appear in the output.
3. Verify all candidate guides contain a complete 60-minute structure.
4. Run `git status --short --ignored content/notes-local/interviews` and confirm every artifact is ignored.
