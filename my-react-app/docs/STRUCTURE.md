## Projektstruktur

```

.
├── backend
│   ├── .env
│   ├── package.json
│   └── server.js
├── docs
│   ├── ARBETSFORDELNING.md
│   ├── COMPONENTS.md
│   ├── STRUCTURE.md
│   └── TECHNICAL.md
├── src
│   ├── components
│   │   ├── layout
│   │   │   ├── header.css
│   │   │   ├── Header.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── Topbar.module.css
│   │   │   ├── TopBarCard.jsx
│   │   │   └── TopBarCard.module.css
│   │   └── ui
│   │       ├── button
│   │       │   ├── Button.css
│   │       │   └── Button.jsx
│   │       ├── cards
│   │       │   ├── Card.css
│   │       │   └── Card.jsx
│   │       ├── input
│   │       │   ├── index.js
│   │       │   ├── Input.css
│   │       │   └── Input.jsx
│   │       ├── lists
│   │       │   ├── List.jsx
│   │       │   ├── List.module.css
│   │       │   ├── ListHeader.jsx
│   │       │   └── ListItem.jsx
│   │       ├── modal
│   │       │   ├── Modal.module.css
│   │       │   └── Modal.tsx
│   │       ├── profile
│   │       │   ├── Profile.css
│   │       │   └── Profile.tsx
│   │       ├── select
│   │       │   ├── Select.jsx
│   │       │   └── Select.module.css
│   │       ├── smartRecommendations
│   │       │   ├── smartRecommendations.css
│   │       │   └── SmartRecommendations.jsx
│   │       └── textArea
│   │           ├── TextArea.jsx
│   │           └── TextArea.module.css
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.tsx
│   │   ├── TimerContext.tsx
│   │   └── useAuth.js
│   ├── Features
│   │   ├── authentication
│   │   │   └── LoginForm.jsx
│   │   ├── calendar
│   │   │   ├── CalendarCard.css
│   │   │   └── CalendarCard.jsx
│   │   ├── graph
│   │   │   ├── graph.css
│   │   │   ├── graph.helpers.ts
│   │   │   ├── graph.tsx
│   │   │   └── graph.types.ts
│   │   ├── modals
│   │   │   ├── editSessionModal
│   │   │   │   └── editSessionModal.jsx
│   │   │   ├── loginModal
│   │   │   │   ├── loginModal.css
│   │   │   │   └── loginModal.jsx
│   │   │   └── sessionModal
│   │   │       └── sessionModal.jsx
│   │   ├── mood
│   │   │   ├── EnergyDisplay.tsx
│   │   │   ├── mood.css
│   │   │   └── MoodPicker.jsx
│   │   ├── quotes
│   │   │   ├── quotes.ts
│   │   │   ├── RandomQuote.css
│   │   │   └── RandomQuote.tsx
│   │   ├── sessions
│   │   │   ├── EditWorkSessionForm.jsx
│   │   │   └── WorkSessionForm.jsx
│   │   ├── timer
│   │   │   ├── Timer.css
│   │   │   ├── Timer.jsx
│   │   │   ├── timerLogic.js
│   │   │   └── useBreakTimer.tsx
│   │   └── todo
│   │       ├── Todo.css
│   │       └── Todo.jsx
│   ├── img
│   │   ├── screenshot.png
│   │   └── zoan-logo.png
│   ├── pages
│   │   ├── dashboard
│   │   │   ├── Dashboard.module.css
│   │   │   └── DashboardPage.jsx
│   │   ├── history
│   │   │   ├── HistoryPage.jsx
│   │   │   └── HistoryPage.module.css
│   │   └── settings
│   │       ├── settingComponents
│   │       │   └── userService.ts
│   │       ├── SettingsPage.css
│   │       ├── SettingsPage.test.tsx
│   │       └── SettingsPage.tsx
│   ├── storage
│   │   ├── breakSettings.ts
│   │   ├── breakSettingStorage.ts
│   │   └── localStorage.js
│   ├── supabase
│   │   ├── getSessions.js
│   │   ├── saveSession.js
│   │   └── supabase.js
│   ├── types
│   │   └── timeEntry.js
│   ├── utils
│   │   └── formatTime.js
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── setupTest.ts
│   └── vite-env.d.ts
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.js
└── vitest.config.js

```

### Beskrivning

| Mapp/Fil | Beskrivning                   |
| -------- | ----------------------------- |
| `mapp1/` | Beskriv vad mappen innehåller |
| `mapp2/` | Beskriv vad mappen innehåller |
| `fil.xx` | Beskriv vad filen gör         |
