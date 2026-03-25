## Komponenter

Här beskrivs projektets viktigaste komponenter och vad de gör.

---

### Components

#### Smarta Rekommendationer

**Syfte:**

Smarta rekommendationer-komponenten hjälper användaren att få förslag på arbetsläge och arbetstid baserat på hur de mår. Användaren skriver in sitt humör eller tillstånd, och komponenten genererar en rekommendation som kan innehålla arbetsläge (Deep Work eller Chill), föreslagen arbetstid och ett kort tips. Komponenten används för att ge motivation, vägledning och förbättra fokus under arbetsdagen.

**Fil:** `src/components/ui/smartRecommendations.jsx`

**Beskrivning:**

Använder react hooks (useState) för att lagra användarens input, rekommenderat arbetsläge, tid och tips. Komponenten skickar användarens input via ett POST-anrop till backend (/recommend) som returnerar en rekommendation. Resultatet visas dynamiskt i UI:t med rubrik, tid och tips. UI-komponenter som TextArea och Button används för input och interaktion. Komponenten hanterar även fel, till exempel om backend inte kan generera en rekommendation, och visar då ett standardförslag.

**Backend**

En Express-server (server.js) tar emot POST-anrop från frontend, skickar användarens meddelande till OpenRouter AI (GPT-4) och returnerar ett svar. Servern avgör om meddelandet är relevant, klassificerar arbetsläge, föreslår arbetstid och ger ett kort tips. Fel hanteras genom loggning och standardmeddelande till frontend.

### Contexts

#### SessionsContexts

**Syfte:** Den här Context:en hanterar dataflödet mellan Supabase/Local Storage och UI på historik-sidan och innehåller all logik för visning av data samt skapande av nya poster och redigering och borttagning av befintliga.

**Filer:**

- `src/contexts/types.ts`
- `src/contexts/SessionsContext.ts`
- `src/contexts/SessionsProvider.tsx`
- `src/contexts/useSessions.ts`

**Använder:**

- React.createContext
- React.useContext

**Beskrivning:**

`types.ts` - Innehåller alla typdefinitioner som används i SessionsContext, varje komponent i Context:en importerar den/de typer som den behöver.

`SessionsContext.ts`- Skapar Context:en och äger typdefinitionen av dess Context Values.

`SessionsProvider.tsx` - Innehåller datan som hämtas från lagring (alltså tidigare loggade arbetssessioner), funktioner för att anropa Supabase och kommunicera med Local Storage samt Context:ens egna states, vilka helt enkelt är statusen för dataöverföring ("isLoading", "isOk" och "isFailed").

`useSessions.ts` - Den custom hook som exponerar Context:ens data, states och actions.

##### Ett exempel på dataflöde och funktion (en inloggad användare redigerar en post):

Sidan laddas in och SessionProviderns load-action anropas direkt, och databasen anropas därefter.

```Page_load_and_data_fetch
HistoryPage                  SessionsContext                    Supabase
-----------                  ---------------                    --------
useSessions -(read action)-> SessionsProvider  -(fetch data)->  User's sessions
```

SessionsContext får tillbaka alla loggade arbetssessioner (poster) som hör till den inloggade användaren från Supabase och talar om för UI på HistoryPage att det finns data att visa. List-komponenten på sidan renderar ut alla poster.

```Data_retrieval_and_distribution
Supabase               SessionsContext                          HistoryPage
--------               ---------------                          -----------
(array of posts)->     SessionsProvider   -(array of posts)->   UI
```

Användaren klickar på en post i listan, klick-eventet fångas upp av List-komponenten som öppnar en modal med ett formulär för redigering och bifogar det unika id-numret för den valda posten. Modalen plockar ut den posten från listan som Context:en redan hämtat och fyller i fälten i formuläret med postens data i förväg.

```User_action_and_UI_reaction
UI              List component  -(post id)->  Modal                   Form
--              --------------                -----                   ----
(user click)->  Click handler                 useSessions  -(post)->  UI
(post id)
```

Användaren redigerar datan i ett eller flera fält och klickar på en submit-knapp, modalen samlar datan från formulärets fält och anropar SessionsProviderns update-action med postens uppdaterade data, ett update-kommando skickas till Supabase med den nya datan.

```User_submission_and_Context_reaction
Form -(submit)-> Modal                 SessionsContext            Supabase
----             -----                 ---------------            --------
(form data)->    useSessions -(post)-> SessionsProvider -(post)-> User's sessions
```

Supabase utför update-kommandot och skickar tillbaka "ok". Context:en begär då en ny uppdaterad lista från databasen som sedan skickas till HistoryPage där List-komponenten renderas om med den redigerade posten.

```Database_update_and_list_refresh
Supabase                 SessionsContext                          HistoryPage
--------                 ---------------                          -----------
Updates post  -(ok!)->   SessionsProvider
Posts   <-(fetch data)   SessionsProvider
(array of posts)->       SessionsProvider   -(array of posts)->   UI
```

---

#### ThemeContext.tsx (Light/DarkMode)

**Syfte:**
ThemeContext-komponenten hanterar applikationens tema (ljus eller mörk). Den låter användaren växla mellan light och dark mode och sparar inställningen lokalt så att temat behålls mellan sessioner. Alla komponenter som använder ThemeContext kan läsa det aktuella temat och ändra UI dynamiskt. När användaren togglar temat uppdateras värdet i contexten och sparas automatiskt i localStorage, vilket gör att appen startar med rätt tema vid nästa besök.

**Fil:** `src/contexts/ThemeContext.tsx`

**Beskrivning:**

React hooks (useState, useEffect) används för att lagra och uppdatera temat. localStorage används för att spara användarens val. Komponenten använder TypeScript-typer för att definiera temat (Theme), contextens struktur (ThemeContextType) och props för ThemeProvider (ThemeProviderProps). Detta gör att contexten och toggle-funktionen blir typ-säkra och enklare att använda i hela applikationen. Contexten (ThemeContext) gör temat och toggle-funktionen tillgängliga för alla barnkomponenter.

---

#### TimerContext.tsx med TimerProvider

**Syfte:** Hanterar hela timer-logiken via context + reducer. Utbyggd utifrån Timer.jsx. Skapad för att flera sidor behövde kunna nå samma timer, data behövde kunna flyttas smidigt utan att behöva skicka props genom flera lager. Timerprovider är en wrapper som exponerar all timer-data till appen.

Ansvar:

- Koppla reducer + state
- Uppdatera tid kontinuerligt (setInterval)
- Spara break settings automatiskt
- Exponera:
  - current time
  - state
  - actions
  - break settings

State innehåller:

- Status: idle / running / paused
- Mode: deep / meeting / chill
- Tid (start, paus, ackumulerad)
- Pauslogik (nästa paus, intervall, onBreak)

Actions:

- start / pause / stop
- selectMode / clearMode
- setBreakEvery
- takeBreak / acknowledgeBreak

Funktion:

- Reducer säkerställer att state ändras korrekt
- Tid räknas dynamiskt (nu + starttid)
- Pauser justeras korrekt vid paus/resume

**Fil:** `src/contexts/TimerContext.tsx`

**Använder:**
createContext – skapar ett globalt context för att dela timer-state i hela appen
useContext – hämtar timer-data och actions från context
useReducer – hanterar all timer-logik och state-förändringar på ett strukturerat sätt
useEffect – kör effekter som timer-loop (setInterval) och auto-save
useMemo – optimerar beräkningar så att värden inte räknas om i onödan
useState – hanterar lokal state som inte passar i reducern

---

### Features

#### Timer

**Syfte:**
Timer-komponenten används för att mäta och visa en pågående session. Användaren kan välja arbetsläge, som t.ex. Deep Work, Möte eller Chill, och starta, pausa eller stoppa timern under sessionen. När timern stoppas visas en modal (SessionModal) som visar information om sessionens längd, start- och sluttid samt den totala aktiva tiden. Komponenten gör det enkelt för användaren att hålla koll på arbetstid och få en visuell representation av sessionen.

**Fil:** `src/Features/Timer.jsx`

**Beskrivning:**

Timer-komponenten använder React hooks som useState för lokal state och useRef för att styra modalen. Den använder även useTimer från en context för att hantera timerns status och funktioner som start, paus och stopp. Tiden beräknas genom att omvandla millisekunder till timmar, minuter och sekunder, och visas både som text och som en visuell timer. Komponentens layout och knappar ändras beroende på timerns aktuella status, och knapparna för val av arbetsläge och sessionhantering är tydligt integrerade på sidan.

#### Random Quote

**Syfte:** Syfte:
RandomQuote-komponenten visar ett slumpmässigt citat från en fördefinierad lista när komponenten laddas. Den används för att ge användaren en liten rolig touch när de besöker sidan!

**Fil:** `src/Features/RandomQuote.jsx`

**Beskrivning:**

Använder useState för att lagra det valda citatet och useEffect för att välja ett slumpmässigt citat när komponenten renderas första gången. Citatet hämtas från en array i en separat fil (quotes.ts) som innehåller listan med alla tillgängliga citat. Komponenten stödjer även en valfri prop size för att justera textstorleken och använder CSS (RandomQuote.css) för styling.

#### Login Form

**Syfte:** Syfte:
LoginForm-komponenten hanterar inloggning och registrering av användare. Den låter användaren logga in med e-post och lösenord, eller skapa ett nytt konto med e-post, lösenord och användarnamn. Komponenten validerar input och visar felmeddelanden om något är felaktigt.

**Fil:** `src/Features/authentication/LoginForm.jsx`

**Beskrivning:**

LoginForm använder React hooks (useState och useRef) för att lagra formulärdata och hålla referenser till lösenordsfälten. Den använder useAuth-contexten för autentisering, där funktioner för inloggning, registrering och utloggning finns, och Supabase används för att spara användarprofilen vid registrering. Komponenten innehåller logik för att byta mellan inloggnings- och registreringsläge, validerar e-post, lösenord och användarnamn, och visar felmeddelanden direkt under respektive fält. UI-komponenter som Button används för att starta inloggning eller registrering och för att byta läge mellan login och signup.

#### Profil

**Syfte:**

Profile-komponenten visar användarens profilinformation, inklusive användarnamn, bild och datum. Om användaren inte är inloggad visas en standardbild och ett meddelande om att logga in. Komponenten inkluderar även ett slumpmässigt citat via RandomQuote för inspiration.

**Fil:** `src/Features/profile/Profile.tsx`

**Beskrivning:**

useState och useEffect används för att hämta och lagra användarens profil. Komponenten använder TypeScript-typer för att definiera UserProfile och styrka user-objektets struktur. useAuth används för att kontrollera inloggning och hämta användar-ID. Profilinformation hämtas från Supabase (user_profile), inklusive bild-URL, och uppdateringar sker direkt i state och Supabase Storage vid uppladdning av ny bild. Layout och styling hanteras via CSS (Profile.css) och datum visas i lokaliserat format. RandomQuote används för att visa ett inspirerande citat.

Komponenten uppdaterar dynamiskt beroende på inloggningsstatus. Användarbild laddas från Supabase Storage och uppdateras direkt vid förändring. RandomQuote-komponenten ger en personlig touch och gör profilen lite roligare.

#### CalendarCard

**Syfte:**
CalendarCard visar användarens loggade arbetssessioner i en månadskalender där varje dag färgmarkeras utifrån det dominerande humöret (mood) bland de sessions som avslutades den dagen. Det ger en snabb visuell överblick över hur arbetet och humöret varierat under månaden.

**Fil:** `src/Features/calendar/CalendarCard.jsx`

**Importer:**

- `@fullcalendar/react`
- `@fullcalendar/daygrid`
- `@fullcalendar/core/locales/sv`
- `src/storage/localStorage`
- `src/contexts/useAuth`
- `src/supabase/supabase`
- `src/Features/CalendarCard.css`
- `src/Features/mood/mood.css`

**Använder:**

- react (useEffect, useMemo, useState)

**Beskrivning:**

FullCalendar med dayGridPlugin renderar månadskalendervyn och är lokaliserad till svenska. Sessionsdata hämtas från Supabase om användaren är inloggad, annars från localStorage via sessionStore. För att kalendern ska uppdateras direkt när en ny session sparas, utan att sidan behöver laddas om, lyssnar komponenten på custom events (sessions:change och localstore:change). useMemo används för att beräkna vilket mood som dominerar per dag utan att räkna om i onödan vid varje rendering. Mood-värdena 1–5 mappas till CSS-klasser med tillhörande färger.

---

#### Graph

**Syfte:**
Graph visualiserar användarens sessionsdata med ett stapeldiagram och ett cirkeldiagram (pajdiagram). Staplarna visar antalet sessions per tidsperiod grupperade efter humör, medan pajdiagrammet visar den totala fördelningen av mood. Tillsammans ger de en statistisk bild av hur arbetet och välmåendet sett ut över tid.

**Fil:** `src/Features/graph/graph.tsx`

**Importer:**

- `src/Features/graph/graph.helpers`
- `src/Features/graph/graph.types`
- `src/Features/graph/graph.css`

**Använder:**

- recharts
- @recharts/devtools
- react (useMemo)

**Beskrivning:**

Recharts används för att rendera diagrammen. All databearbetning är separerad till hjälpfilen graph.helpers.ts som innehåller funktionen buildGraphData, den tar emot en array med sessions och returnerar färdigformatterad stapel- och pajdata. TypeScript-typer för sessions och datapunkter definieras i graph.types.ts, vilket gör att komponentens props och interna data är typsäkra. useMemo ser till att data inte räknas om i onödan. Mood-värdena 1–5 mappas konsekvent till samma färgskalor som används i resten av appen.

---

#### SessionModal

**Syfte:**
SessionModal dyker upp automatiskt när timern stoppas och uppmanar användaren att logga sin session. Den visar sessionens totala längd och innehåller WorkSessionForm där användaren fyller i detaljer om arbetspasset. När formuläret skickas stängs modalen och sessionen sparas.

**Fil:** `src/Features/modals/sessionModal/sessionModal.jsx`

**Importer:**

- `src/Features/sessions/WorkSessionForm`
- `src/components/ui/modal/Modal`
- `src/Features/modals/sessionModal/sessionModal.module.css`

**Beskrivning:**

Den generiska Modal-komponenten (src/components/ui/modal/Modal.tsx) används som wrapper och styr öppning och stängning via dialogRef som skickas ner från Timer. SessionModal tar emot timerData (starttid, sluttid, arbetsläge m.m.) och handleCloseModal som props och vidarebefordrar dem till WorkSessionForm som sköter all formulärlogik. sessionModal.module.css hanterar modalens layout och typografi.

---

#### WorkSessionForm

**Syfte:**
WorkSessionForm är formuläret som används för att logga ett avslutat arbetspass. Användaren fyller i titel, kategori, en valfri kommentar och väljer sitt humör (mood). Formuläret hanterar sparning till rätt plats beroende på om användaren är inloggad eller inte, och signalerar till resten av appen att ny data finns tillgänglig när sessionen sparats.

**Fil:** `src/Features/sessions/WorkSessionForm.jsx`

**Importer:**

- `src/components/ui/button/Button`
- `src/components/ui/input`
- `src/components/ui/select/Select`
- `src/components/ui/textArea/TextArea`
- `src/Features/mood/MoodPicker`
- `src/contexts/useAuth`
- `src/storage/localStorage`
- `src/supabase/saveSession`
- `src/Features/sessions/WorkSessionForm.modal.css`

**Använder:**

- react (useState)

**Beskrivning:**

Användarens inloggningsstatus avgörs via useAuth, är man inloggad sparas sessionen till Supabase via saveSession, annars sparas den lokalt via sessionStore. timerData (tid och arbetsläge) tas emot som prop från SessionModal och slås ihop med formulärdata vid submit, så att all information om sessionen hamnar i samma post. När sparningen är klar skickas ett custom event (sessions:change) som gör att kalender och övriga komponenter uppdateras direkt. UI-komponenterna Input, Select, TextArea, Button och MoodPicker bygger upp formulärets fält.

---

#### Todo

**Syfte:**
Todo är en enkel att-göra-lista direkt i dashboarden där användaren kan lägga till och ta bort uppgifter. Listan sparas i localStorage så att uppgifterna finns kvar även om sidan laddas om eller webbläsaren stängs.

**Fil:** `src/Features/todo/Todo.jsx`

**Importer:**

- `src/components/ui/input/Input`
- `src/components/ui/button/Button`
- `src/storage/localStorage`
- `src/Features/todo/Todo.css`

**Använder:**

- react (useEffect, useState)

**Beskrivning:**

useState håller listan av todos och inputfältets aktuella värde. Varje gång listan ändras synkas den automatiskt till localStorage via useEffect och todoStore. Varje todo-post får ett unikt id baserat på Date.now() vilket gör det enkelt att ta bort exakt rätt post utan att påverka resten av listan. UI-komponenterna Input och Button används för inmatningsfältet och lägg-till-knappen.

---

### Pages

#### DashboardPage

**Syfte:**
DashboardPage är applikationens huvudvy och fungerar som ett kontrollcenter för användaren. Alla centrala funktioner – profil, smarta rekommendationer, timer, kalender och att-göra-lista – samlas på en och samma sida så att användaren snabbt kan komma igång med och följa sin arbetsdag.

**Fil:** `src/pages/dashboard/DashboardPage.jsx`

**Importer:**

- `src/components/ui/cards/Card`
- `src/pages/Dashboard.module.css`
- `src/Features/timer/Timer`
- `src/components/layout/Topbar`
- `src/Features/calendar/CalendarCard`
- `src/Features/todo/Todo`
- `src/components/ui/profile/Profile`
- `src/components/ui/smartRecommendations/SmartRecommendations`

**Beskrivning:**

Topbar renderas längst upp och hanterar navigering och tema. Sidans innehåll är uppdelat i ett CSS Grid (via Dashboard.module.css) där varje sektion wrappas i ett BaseCard med en storlek anpassad för sitt innehåll. Komponenterna som renderas är: Profile (användarinfo och slumpcitat), SmartRecommendations (AI-rekommendationer för arbetsläge), Timer (startar och stoppar sessions), CalendarCard (historik i kalenderform) och Todo (att-göra-lista). DashboardPage innehåller själv ingen logik och är enbart ansvarig för layout och sammansättning av de övriga komponenterna.

---

#### SettingsPage

**Syfte:**
SettingsPage låter användaren hantera sin kontoinformation – byta profilbild och ändra användarnamn. Sidan hämtar befintlig profildata vid inladdning och sparar ändringar direkt till Supabase. När användaren väljer en ny bild visas en lokal förhandsgranskning innan bilden laddas upp, vilket ger omedelbar feedback utan nätverksanrop.

**Fil:** `src/pages/settings/SettingsPage.tsx`

**Importer**

- `src/ui/components/ui/cards/Card`
- `src/contexts/TimerContext`
- `src/pages/settings/settingComponents/userService`
- `src/pages/settings/SettingsPage.css`

**Använder:**

- react (ChangeEvent, useEffect, useState)

**Beskrivning:**

All kommunikation med Supabase sköts av servicefilen settingComponents/userService.ts som exponerar funktioner för att hämta inloggad användare, läsa profil, uppdatera användarnamn och ladda upp profilbild. När en fil väljs skapas en tillfällig blob-URL lokalt för förhandsvisning och den städas upp med URL.revokeObjectURL så att minne inte läcker. En cache-buster (avatarVersion) läggs till bild-URL:en efter uppladdning för att tvinga webbläsaren att visa den nya bilden direkt. TypeScript används genomgående för typsäker hantering av state och händelser. Layout och stilsättning hanteras av BaseCard och SettingsPage.css.

---

## Storage

### breakSettings.ts och breakSettingStorage.ts

**Syfte:**
Systemet hanterar användarens pausinställningar via `localStorage`.

- Standardvärden används om inget finns sparat.
- Vid laddning valideras datan för att undvika krascher (fallback till default).
- Inställningar inkluderar:
  - Pausintervall för olika lägen/modes (deep, meeting, chill)
  - Extra inställning för fredag (beerOnFriday)
- Sparning sker automatiskt när inställningar ändras.

**Fil:**
`src/storage/breakSettings.ts`
`src/storage/breakSettingStorage.ts`

**Använder:**

- `localStorage` – sparar och hämtar användarens pausinställningar
- `JSON.parse` / `JSON.stringify` – konverterar data till/från string vid lagring
- TypeScript-typer – säkerställer korrekt struktur på inställningar

---

### Supabase (getSessions, saveSession, updateSession, supabase)

**Syfte:**  
Hanterar all kommunikation med databasen via Supabase för att hämta, skapa och uppdatera sessioner. Koppla frontend till databasen och säkerställa att data är kopplad till rätt `user_id`.Hantera CRUD-operationer samt abstrahera databaslogik från UI.

- Centraliserar databasanslutning via en gemensam klient
- Hämtar sessioner för inloggad användare
- Sparar nya sessioner i databasen
- Uppdaterar befintliga sessioner
- Raderar befintliga sessioner

**Filer:**  
`src/supabase/getSessions.ts`  
`src/supabase/saveSession.ts`  
`src/supabase/updateSession.ts`  
`src/supabase/deleteSession.js`  
`src/supabase/supabase.ts`

**Använder:**

- Supabase client – kommunikation med databasen
- `createClient` – initierar anslutning till Supabase
- `select` – hämtar data från tabell
- `insert` – skapar nya rader
- `update` – uppdaterar befintliga rader
- `eq` – filtrerar data (t.ex. på `user_id` eller `id`)
- async/await – hanterar asynkrona databasoperationer
- miljövariabler – lagrar API-url och nycklar säkert

---

### localStore.ts

**Syfte:**  
En generell lösning för att lagra data i `localStorage`.

- Hanterar all CRUD-logik för listor (load, add, save, clear)
- Genererar automatiskt `id` och `createdAt` för nya objekt
- Säkerställer att data alltid returneras i korrekt format (fallback till tom array vid fel)
- Skickar ett globalt event vid ändringar för att hålla UI synkat

**Funktionalitet:**

- `load()` → hämtar sparad data
- `add()` → lägger till nytt objekt (med auto-genererat id + timestamp)
- `save()` → sparar hela listan
- `clear()` → rensar all data

**Fil:**  
`src/storage/localStore.ts`

**Använder:**

- `localStorage` – lagring av listdata
- `JSON.parse` / `JSON.stringify` – serialisering/deserialisering
- `crypto.randomUUID()` – generering av unika id:n
- `CustomEvent` – notifiera UI om förändringar
- Sessions (`sessionStore`)
- Todos (`todoStore`)
- Dispatchar `localstore:change` event vid förändringar för att trigga UI-uppdatering

---

### sessionMapping.ts + sessionLocalActions.ts

**Syfte:**  
Mappar datan så vår tidigare byggda kod matchar med den senare byggda. Hanterar sessionsdata lokalt och säkerställer att data kan användas konsekvent mellan UI, localStorage och databas.

- Konverterar mellan olika dataformat för samma session
- Förhindrar mismatch mellan frontend och backend (t.ex. `id` vs `session_id`)
- Samlar all lokal sessionslogik i ett lager
- Mapping-funktioner mellan:
  - `StoredSession` (localStorage)
  - `SessionData` (app/databas)
  - `SessionFormData` (formulär)

- `load()` → hämtar sessions
- `add()` → skapar ny session
- `update()` → uppdaterar befintlig session
- `delete()` → tar bort session

**Fil:**  
`src/storage/sessionMapping.ts`  
`src/storage/sessionLocalActions.ts`

**Använder:**

- `localStore` – för lagring av sessions
- TypeScript-typer – säkerställer korrekt struktur
- Mapping-funktioner – översätter mellan olika datalager

### Types

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/types/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

### Utils

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/utils/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---
