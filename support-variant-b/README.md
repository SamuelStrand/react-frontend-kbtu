# Final Exam — React (Variant B)

You are given a React technical task using a ready starter project (React 18+, JavaScript).  
The project already includes a mock API, Redux Toolkit, basic layout, and one finished feature as an example.

This exam is **open book**: you may use the internet and your previous homework.  
**Phones, chats, and talking to other students are not allowed.**

> ⚠️ IMPORTANT RULES
> - **Changing mock server code or `db.json` data is strictly prohibited.**
> - You may be asked to **explain any line of your code** during the defense.

---

## How to run the project

### 1) Install dependencies
```bash
npm install
```

### 2) Run frontend + mock API together
The project includes a combined command to start server and client.

Run it with:
```bash
npm run all
```

- Mock API will run on the port defined in `server.cjs`
- React application will run on the Vite dev server

---

## Mock API (do not change)

### Available endpoints

- `GET /cases?page=&limit=&state=&severity=&q=`
- `GET /cases/:id`
- `GET /case-log?caseId=`
- `PATCH /cases/:id`

> ❗ Backend logic and mock data **must not be modified**.  
> All fixes must be done on the frontend side only.

---

## Technical Task (25 points total)

Your task is to finish and refactor one feature so it works consistently with the rest of the application.

---

### A) Case Details view (5 points)

Implement a **Case Details** view as a separate page.

Requirements:
- The page must be opened from the cases list
- Load case data by id (`GET /cases/:id`)
- Load case change history (`GET /case-log?caseId=`)
- Show full case information and history

---

### B) Change case status (10 points)

Add the ability to **change case status** from the Case Details page.

Requirements:
- Use `PATCH /cases/:id`
- After status change, UI must update correctly
- You may use **optimistic update** OR **refetch after update**
- All logic must use **Redux Toolkit async thunks**
- **No API calls inside React components**

---

### C) List state bug fix (5 points)

Find and fix a bug where:

- After changing case status (not equal to `open`)
- The cases list state becomes inconsistent:
    - page number
    - applied filters

⚠️ This is a **frontend-only fix**. Backend code must not be changed.

---

### D) UI consistency (5 points)

Keep UI styling consistent with the rest of the app:
- layout
- paddings
- buttons
- dropdowns
- table styles

---

## Defense (15 points)

During the defense you must show that your code works and explain what you did.

### Practical questions — 10 points
- 4 questions total
- 1 question for each task requirement
- **2.5 points per question**

### Theoretical question — 5 points
- One question about:
    - React
    - Redux Toolkit
    - async HTTP
    - SPA navigation

---

Good luck!
