## Komponenter

Här beskrivs projektets viktigaste komponenter och vad de gör.

---

### Components

#### Smarta Rekommendationer

**Syfte:**

Smarta rekommendationer-komponenten hjälper användaren att få förslag på arbetsläge och arbetstid baserat på hur de mår. Användaren skriver in sitt humör eller tillstånd, och komponenten genererar en rekommendation som kan innehålla arbetsläge (Deep Work eller Chill), föreslagen arbetstid och ett kort tips. Komponenten används för att ge motivation, vägledning och förbättra fokus under arbetsdagen.

**Fil:** `src/components/ui/smartRecommendations.jsx`

**Använder:**

React hooks (useState) för att lagra användarens input, rekommenderat arbetsläge, tid och tips. Komponenten skickar användarens input via ett POST-anrop till backend (/recommend) som returnerar en rekommendation. Resultatet visas dynamiskt i UI:t med rubrik, tid och tips. UI-komponenter som TextArea och Button används för input och interaktion. Komponenten hanterar även fel, till exempel om backend inte kan generera en rekommendation, och visar då ett standardförslag.

**Backend**

En Express-server (server.js) tar emot POST-anrop från frontend, skickar användarens meddelande till OpenRouter AI (GPT-4) och returnerar ett svar. Servern avgör om meddelandet är relevant, klassificerar arbetsläge, föreslår arbetstid och ger ett kort tips. Fel hanteras genom loggning och standardmeddelande till frontend.

---

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

**Använder:**

React hooks (useState, useEffect) används för att lagra och uppdatera temat. localStorage används för att spara användarens val. Komponenten använder TypeScript-typer för att definiera temat (Theme), contextens struktur (ThemeContextType) och props för ThemeProvider (ThemeProviderProps). Detta gör att contexten och toggle-funktionen blir typ-säkra och enklare att använda i hela applikationen. Contexten (ThemeContext) gör temat och toggle-funktionen tillgängliga för alla barnkomponenter.

---

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/contexts/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

### Features

#### Timer

**Syfte:**
Timer-komponenten används för att mäta och visa en pågående session. Användaren kan välja arbetsläge, som t.ex. Deep Work, Möte eller Chill, och starta, pausa eller stoppa timern under sessionen. När timern stoppas visas en modal (SessionModal) som visar information om sessionens längd, start- och sluttid samt den totala aktiva tiden. Komponenten gör det enkelt för användaren att hålla koll på arbetstid och få en visuell representation av sessionen.

**Fil:** `src/Features/Timer.jsx`

**Använder:**

Timer-komponenten använder React hooks som useState för lokal state och useRef för att styra modalen. Den använder även useTimer från en context för att hantera timerns status och funktioner som start, paus och stopp. Tiden beräknas genom att omvandla millisekunder till timmar, minuter och sekunder, och visas både som text och som en visuell timer. Komponentens layout och knappar ändras beroende på timerns aktuella status, och knapparna för val av arbetsläge och sessionhantering är tydligt integrerade på sidan.

#### Random Quote

**Syfte:** Syfte:
RandomQuote-komponenten visar ett slumpmässigt citat från en fördefinierad lista när komponenten laddas. Den används för att ge användaren en liten rolig touch när de besöker sidan!

**Fil:** `src/Features/RandomQuote.jsx`

**Använder:**

React hooks useState för att lagra det valda citatet och useEffect för att välja ett slumpmässigt citat när komponenten renderas första gången. Citatet hämtas från en array i en separat fil (quotes.ts) som innehåller listan med alla tillgängliga citat. Komponenten stödjer även en valfri prop size för att justera textstorleken och använder CSS (RandomQuote.css) för styling.

#### Login Form

**Syfte:** Syfte:
LoginForm-komponenten hanterar inloggning och registrering av användare. Den låter användaren logga in med e-post och lösenord, eller skapa ett nytt konto med e-post, lösenord och användarnamn. Komponenten validerar input och visar felmeddelanden om något är felaktigt.

**Fil:** `src/Features/authentication/LoginForm.jsx`

**Använder:**

LoginForm använder React hooks (useState och useRef) för att lagra formulärdata och hålla referenser till lösenordsfälten. Den använder useAuth-contexten för autentisering, där funktioner för inloggning, registrering och utloggning finns, och Supabase används för att spara användarprofilen vid registrering. Komponenten innehåller logik för att byta mellan inloggnings- och registreringsläge, validerar e-post, lösenord och användarnamn, och visar felmeddelanden direkt under respektive fält. UI-komponenter som Button används för att starta inloggning eller registrering och för att byta läge mellan login och signup.

#### Profil

**Syfte:**

Profile-komponenten visar användarens profilinformation, inklusive användarnamn, bild och datum. Om användaren inte är inloggad visas en standardbild och ett meddelande om att logga in. Komponenten inkluderar även ett slumpmässigt citat via RandomQuote för inspiration.

**Fil:** `src/Features/profile/Profile.tsx`

**Använder:**

React hooks (useState, useEffect) används för att hämta och lagra användarens profil. Komponenten använder TypeScript-typer för att definiera UserProfile och styrka user-objektets struktur. useAuth används för att kontrollera inloggning och hämta användar-ID. Profilinformation hämtas från Supabase (user_profile), inklusive bild-URL, och uppdateringar sker direkt i state och Supabase Storage vid uppladdning av ny bild. Layout och styling hanteras via CSS (Profile.css) och datum visas i lokaliserat format. RandomQuote används för att visa ett inspirerande citat.

Komponenten uppdaterar dynamiskt beroende på inloggningsstatus. Användarbild laddas från Supabase Storage och uppdateras direkt vid förändring. RandomQuote-komponenten ger en personlig touch och gör profilen lite roligare.

### Pages

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/pages/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

### Storage

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/storage/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

### Supabase

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/supabase/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

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
