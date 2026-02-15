# Skill.md - Custom Skills for CyberScape Academy

This document defines custom skills (commands) for use with Claude Code when working on the CyberScape Academy project.

## Available Skills

### 1. `/add-question` - Add New Exam Question

**Purpose**: Helps add a new exam question to the question bank with proper formatting and validation.

**Usage**:
```
/add-question [module] [difficulty]
```

**Example**:
```
/add-question nist medium
```

**Skill Definition**:
```yaml
name: add-question
description: Add a new exam question to the question bank
parameters:
  - name: module
    type: choice
    required: true
    choices:
      - foundations
      - governance
      - nist
      - risk
      - defense
      - incident-response
    description: Which module this question belongs to
  - name: difficulty
    type: choice
    required: true
    choices:
      - easy
      - medium
      - hard
    description: Question difficulty level

prompt: |
  You are adding a new exam question to the CyberScape Academy question bank.

  Module: {{module}}
  Difficulty: {{difficulty}}

  Follow these requirements:

  1. **Read the current questions**: First read lib/content/questions.ts to see existing questions

  2. **Create a NEW question** with:
     - Unique ID following pattern: {{module}}-q[number]
     - Question text in HEBREW (עברית)
     - 4 answer options in HEBREW
     - One correct answer (set correctIndex 0-3)
     - Detailed explanation in HEBREW explaining why the answer is correct
     - Difficulty level: {{difficulty}}

  3. **Question format**:
     ```typescript
     {
       id: '{{module}}-q[number]',
       moduleId: '{{module}}',
       text: 'השאלה בעברית?',
       options: [
         'תשובה 1',
         'תשובה 2',
         'תשובה 3',
         'תשובה 4'
       ],
       correctIndex: 0,  // Index of correct answer
       explanation: 'הסבר מפורט למה התשובה נכונה...',
       difficulty: '{{difficulty}}'
     }
     ```

  4. **Validation rules**:
     - Question must be clear and unambiguous
     - Options should be plausible (not obviously wrong)
     - Explanation must reference course material
     - Hebrew grammar must be correct
     - No duplicate questions

  5. **Add to questions.ts**: Append to the appropriate section based on module

  6. **Verify distribution**: Check that module has appropriate number of questions:
     - foundations: 4-5 total
     - governance: 3-4 total
     - nist: 5-6 total
     - risk: 3-4 total
     - defense: 3-4 total
     - incident-response: 3-4 total

  After adding, show:
  - The new question formatted
  - Current question count per module
  - Whether we've reached target (25-30 total)
```

---

### 2. `/extract-content` - Extract Content from Lecture PDF

**Purpose**: Extract and structure content from a specific lecture PDF into module lessons.

**Usage**:
```
/extract-content [lecture-number] [module-id]
```

**Example**:
```
/extract-content 3 nist
```

**Skill Definition**:
```yaml
name: extract-content
description: Extract content from lecture PDF and structure into lessons
parameters:
  - name: lecture_number
    type: number
    required: true
    description: Lecture number (1-11)
  - name: module_id
    type: choice
    required: false
    choices:
      - foundations
      - governance
      - nist
      - risk
      - defense
      - incident-response
    description: Target module (optional, will auto-detect if not provided)

prompt: |
  You are extracting content from lecture {{lecture_number}} to create module lessons for CyberScape Academy.

  Steps to follow:

  1. **Read the PDF**:
     - File path: Lectures/מצגת שיעור {{lecture_number}}.pdf
     - Use Read tool to examine the PDF content

  2. **Identify main topics**:
     - List all major topics/sections in the lecture
     - Identify key concepts, definitions, frameworks
     - Note any diagrams or visual frameworks

  3. **Map to module** ({{module_id}} if specified):
     - Determine which module(s) this content belongs to
     - If multiple modules, split content appropriately

  4. **Structure into lessons**:
     - Each lesson should be 3-5 minutes reading (300-600 words)
     - Create lesson objects following this format:
     ```typescript
     {
       id: 'lesson-slug',
       moduleId: '{{module_id}}',
       title: 'שם השיעור בעברית',
       content: {
         sections: [
           {
             heading: 'כותרת',
             paragraphs: [
               'פסקה ראשונה...',
               'פסקה שנייה...'
             ]
           }
         ],
         keyTakeaways: [
           'נקודת מפתח 1',
           'נקודת מפתח 2'
         ]
       },
       order: 1,
       estimatedTime: 4  // minutes
     }
     ```

  5. **Identify diagrams**:
     - Note any visual frameworks that need interactive diagrams
     - Suggest diagram types (cia-triad, nist-cycle, risk-matrix, etc.)

  6. **Generate questions**:
     - Create 3-5 exam questions based on this lecture content
     - Follow /add-question format

  7. **Output summary**:
     - Number of lessons created
     - Total estimated reading time
     - Diagrams identified
     - Questions generated
     - Recommended module placement

  IMPORTANT:
  - All text MUST be in Hebrew (עברית)
  - Technical terms stay in English (NIST, CIA Triad, etc.)
  - Preserve Hebrew formatting from PDFs
  - Keep content concise and exam-focused
```

---

### 3. `/deploy-check` - Pre-Deployment Checklist

**Purpose**: Run through comprehensive checklist before deploying to Vercel.

**Usage**:
```
/deploy-check
```

**Skill Definition**:
```yaml
name: deploy-check
description: Run pre-deployment checklist and validation
parameters: []

prompt: |
  You are running a comprehensive pre-deployment check for CyberScape Academy.

  Execute the following checks IN ORDER:

  ## 1. Configuration Validation
  - [ ] Read next.config.mjs - verify `output: 'export'` is set
  - [ ] Read package.json - verify all dependencies installed
  - [ ] Check tsconfig.json - ensure strict mode enabled
  - [ ] Verify tailwind.config.ts exists and is properly configured

  ## 2. Content Validation
  - [ ] Read lib/content/modules.ts - verify 6 modules defined
  - [ ] Read lib/content/questions.ts - count questions (target: 25-30)
  - [ ] Read lib/content/simulations.ts - verify 2 simulations exist
  - [ ] Check question distribution per module

  ## 3. Type Safety Check
  - [ ] Run: npm run type-check
  - [ ] Report any TypeScript errors
  - [ ] Verify lib/types.ts has all interfaces defined

  ## 4. Build Test
  - [ ] Run: npm run build
  - [ ] Check for build errors
  - [ ] Verify 'out' directory created
  - [ ] Check bundle size (target: <500KB gzipped)

  ## 5. Static Export Validation
  - [ ] List files in out/ directory
  - [ ] Verify index.html exists
  - [ ] Check for _next/static/ assets
  - [ ] Ensure no server-side code in output

  ## 6. Hebrew RTL Check
  - [ ] Verify app/layout.tsx has dir="rtl" lang="he"
  - [ ] Check all user-facing strings are Hebrew
  - [ ] Verify RTL-aware Tailwind classes used

  ## 7. localStorage Implementation
  - [ ] Read lib/utils/progress.ts
  - [ ] Verify error handling for QuotaExceededError
  - [ ] Check SSR safety (typeof window !== 'undefined')
  - [ ] Validate type guards for localStorage data

  ## 8. Component Audit
  - [ ] All interactive components have 'use client' directive
  - [ ] No server-side features (getServerSideProps, API routes)
  - [ ] Verify lazy loading for heavy components (jsPDF)

  ## 9. Launch Checklist (from PRD)
  - [ ] All 6 modules built with content
  - [ ] 2 simulations functional
  - [ ] 20-question exam with timer working
  - [ ] Certificate generation implemented
  - [ ] Progress tracking via localStorage
  - [ ] Hebrew RTL layout verified
  - [ ] Desktop responsive design

  ## 10. Final Report

  Generate a summary report:

  ```markdown
  # CyberScape Academy - Deployment Readiness Report

  ## Status: [READY / NOT READY]

  ### ✅ Passed Checks
  - [List all passed checks]

  ### ❌ Failed Checks
  - [List any failures with details]

  ### ⚠️ Warnings
  - [List any warnings or concerns]

  ### 📊 Statistics
  - Total Modules: X/6
  - Total Questions: X/25-30
  - Total Simulations: X/2
  - Bundle Size: X KB

  ### 🚀 Next Steps
  - [What needs to be done before deployment]

  ### 📝 Deployment Command
  ```bash
  vercel --prod
  ```
  ```

  If any critical issues found, do NOT proceed with deployment.
  If all checks pass, provide the deployment command.
```

---

### 4. `/test-exam` - Test Exam Flow

**Purpose**: Manually test the complete exam flow end-to-end.

**Usage**:
```
/test-exam
```

**Skill Definition**:
```yaml
name: test-exam
description: Test the complete exam flow including timer, questions, and certificate
parameters: []

prompt: |
  You are testing the complete exam flow for CyberScape Academy.

  Perform the following test sequence:

  ## 1. Exam Setup Test
  - [ ] Read app/exam/page.tsx
  - [ ] Verify QuizEngine component is used
  - [ ] Check timer is set to 30 minutes (1800 seconds)
  - [ ] Verify 20 questions are randomly selected

  ## 2. Question Randomization Test
  - [ ] Read lib/utils/shuffle.ts (or equivalent)
  - [ ] Verify Fisher-Yates shuffle algorithm
  - [ ] Check that questions are selected proportionally from all modules
  - [ ] Ensure no duplicate questions in same exam

  ## 3. Timer Logic Test
  - [ ] Read components/exam/QuizEngine.tsx
  - [ ] Verify countdown logic (decrements every second)
  - [ ] Check auto-submit when timer reaches 0
  - [ ] Verify timer warning at 5 minutes (300 seconds)
  - [ ] Ensure timer persists if user refreshes (or warn about data loss)

  ## 4. Answer Selection Test
  - [ ] Verify answers array initialized to nulls
  - [ ] Check that selecting an option updates state
  - [ ] Verify user can change answers before submission
  - [ ] Check that unanswered questions remain null

  ## 5. Flag/Bookmark Test
  - [ ] Verify flag functionality exists
  - [ ] Check that flagged questions are marked visually
  - [ ] Ensure flags help user review before submitting

  ## 6. Submission Logic Test
  - [ ] Check submit button disabled until all questions answered
  - [ ] Verify confirmation dialog before submission
  - [ ] Check that submission calculates score correctly
  - [ ] Verify time spent is recorded

  ## 7. Grading Logic Test
  - [ ] Read exam results calculation code
  - [ ] Verify score = number of correct answers (0-20)
  - [ ] Check pass threshold: score >= 14 (70%)
  - [ ] Ensure explanations shown for all questions

  ## 8. Results Display Test
  - [ ] Read app/exam/results/page.tsx
  - [ ] Verify score displayed prominently
  - [ ] Check pass/fail message shown
  - [ ] Verify all questions shown with correct/incorrect indicators
  - [ ] Check explanations displayed for each question

  ## 9. Certificate Generation Test
  - [ ] Read components/exam/CertificateGenerator.tsx
  - [ ] Verify jsPDF is imported and used
  - [ ] Check certificate only generated if passed (score >= 14)
  - [ ] Verify certificate includes:
     - Student name (from localStorage)
     - Final score
     - Date
     - Certificate ID
  - [ ] Test PDF download functionality

  ## 10. localStorage Integration Test
  - [ ] Verify exam attempt saved to localStorage
  - [ ] Check examAttempts array structure
  - [ ] Verify XP awarded for passing
  - [ ] Check rank updated if threshold reached

  ## Test Report

  Generate a test report:

  ```markdown
  # Exam Flow Test Report

  ## Summary
  - Tests Passed: X/10
  - Critical Issues: X
  - Warnings: X

  ## Test Results

  ### ✅ Passed Tests
  [List all passed tests]

  ### ❌ Failed Tests
  [List any failures with details and fix recommendations]

  ### 🐛 Issues Found
  1. [Issue description]
     - Severity: Critical/High/Medium/Low
     - File: [file path]
     - Line: [line number]
     - Fix: [recommended fix]

  ### 📝 Test Scenarios to Run Manually
  1. Start exam and let timer reach 0 (auto-submit)
  2. Answer all questions and submit manually
  3. Pass exam (score >= 14) and download certificate
  4. Fail exam (score < 14) and verify no certificate
  5. Refresh browser during exam (test data persistence/loss)

  ## Recommended Actions
  [List any required fixes before launch]
  ```

  If critical issues found, provide specific code fixes.
```

---

### 5. `/add-simulation` - Add Simulation Scenario

**Purpose**: Add a new decision node to an existing simulation or create a new simulation scenario.

**Usage**:
```
/add-simulation [simulation-id] [node-type]
```

**Example**:
```
/add-simulation ransomware decision
```

**Skill Definition**:
```yaml
name: add-simulation
description: Add a new node to a simulation scenario
parameters:
  - name: simulation_id
    type: choice
    required: true
    choices:
      - ransomware
      - social-engineering
    description: Which simulation to modify
  - name: node_type
    type: choice
    required: true
    choices:
      - decision
      - outcome
    description: Type of node to add

prompt: |
  You are adding a new {{node_type}} node to the {{simulation_id}} simulation.

  Follow these steps:

  ## 1. Read Current Simulation
  - [ ] Read lib/content/simulations.ts
  - [ ] Find {{simulation_id}} simulation
  - [ ] List all existing nodes and their connections
  - [ ] Identify where the new node should connect

  ## 2. Design the New Node

  For DECISION nodes:
  ```typescript
  {
    id: 'unique-node-id',
    type: 'decision',
    content: 'תיאור המצב או ההחלטה הנדרשת בעברית',
    terminalLog: 'Terminal output shown when reaching this node',
    options: [
      {
        label: 'אפשרות 1 בעברית',
        nextNodeId: 'next-node-1'
      },
      {
        label: 'אפשרות 2 בעברית',
        nextNodeId: 'next-node-2'
      }
    ]
  }
  ```

  For OUTCOME nodes:
  ```typescript
  {
    id: 'unique-outcome-id',
    type: 'outcome',
    content: 'תיאור התוצאה בעברית',
    outcome: {
      type: 'success' | 'partial' | 'failure',
      feedback: 'הסבר חינוכי למה ההחלטה הובילה לתוצאה זו',
      xpReward: 50  // XP based on outcome
    }
  }
  ```

  ## 3. Validation Rules
  - [ ] Node ID must be unique within simulation
  - [ ] All text in Hebrew except technical terms
  - [ ] Decision nodes must have 2-4 options
  - [ ] All nextNodeId references must exist
  - [ ] Outcome nodes must have appropriate XP rewards:
     - Success: 50-100 XP
     - Partial: 25-50 XP
     - Failure: 0-10 XP

  ## 4. Educational Value Check
  - [ ] Node teaches a specific cyber policy concept
  - [ ] Feedback references course material
  - [ ] Consequences are realistic and educational
  - [ ] Aligns with NIST CSF or other frameworks

  ## 5. Update Simulation
  - [ ] Add the new node to simulation.nodes array
  - [ ] Update any existing nodes that should link to it
  - [ ] Verify no dead-end paths (all decisions lead to outcomes)
  - [ ] Test flow from start to all possible outcomes

  ## 6. Output Summary
  ```markdown
  # Simulation Node Added

  **Simulation**: {{simulation_id}}
  **Node Type**: {{node_type}}
  **Node ID**: [generated-id]

  ## Node Content
  [Display the full node object]

  ## Updated Flow
  [Show ASCII diagram of simulation flow with new node]

  ## Testing Checklist
  - [ ] Manually test path to this node
  - [ ] Verify terminal logs display correctly
  - [ ] Check Hebrew text renders properly
  - [ ] Confirm XP awarded correctly
  - [ ] Test all branching paths
  ```
```

---

## How to Use Skills

### In Claude Code CLI
```bash
# List available skills
/skills

# Use a skill
/add-question nist medium

# Use skill without parameters (will prompt)
/extract-content
```

### In Cursor or Other Editors
Add this comment at the top of your message:
```
@skill add-question nist medium
```

## Creating New Skills

To add a new skill:

1. Define the skill in this file following the YAML format above
2. Test with sample data
3. Document usage examples
4. Add to skills list in your IDE configuration

---

**Version**: 1.0
**Last Updated**: 2026-02-11
**Skills Available**: 5
