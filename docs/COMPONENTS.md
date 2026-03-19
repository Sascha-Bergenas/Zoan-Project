## Komponenter

Här beskrivs projektets viktigaste komponenter och vad de gör.

---

### Components

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/components/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

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
``` Page_load_and_data_fetch
HistoryPage                  SessionsContext                    Supabase
-----------                  ---------------                    --------
useSessions -(read action)-> SessionsProvider  -(fetch data)->  User's sessions 
```

SessionsContext får tillbaka alla loggade arbetssessioner (poster) som hör till den inloggade användaren från Supabase och talar om för UI på HistoryPage att det finns data att visa. List-komponenten på sidan renderar ut alla poster.
``` Data_retrieval_and_distribution
Supabase               SessionsContext                          HistoryPage
--------               ---------------                          -----------
(array of posts)->     SessionsProvider   -(array of posts)->   UI
```

Användaren klickar på en post i listan, klick-eventet fångas upp av List-komponenten som öppnar en modal med ett formulär för redigering och bifogar det unika id-numret för den valda posten. Modalen plockar ut den posten från listan som Context:en redan hämtat och fyller i fälten i formuläret med postens data i förväg.
``` User_action_and_UI_reaction
UI              List component  -(post id)->  Modal                   Form
--              --------------                -----                   ----
(user click)->  Click handler                 useSessions  -(post)->  UI
(post id)
```

Användaren redigerar datan i ett eller flera fält och klickar på en submit-knapp, modalen samlar datan från formulärets fält och anropar SessionsProviderns update-action med postens uppdaterade data, ett update-kommando skickas till Supabase med den nya datan. 
``` User_submission_and_Context_reaction
Form -(submit)-> Modal                 SessionsContext            Supabase
----             -----                 ---------------            --------
(form data)->    useSessions -(post)-> SessionsProvider -(post)-> User's sessions
```

Supabase utför update-kommandot och skickar tillbaka "ok". Context:en begär då en ny uppdaterad lista från databasen som sedan skickas till HistoryPage där List-komponenten renderas om med den redigerade posten.
``` Database_update_and_list_refresh
Supabase                 SessionsContext                          HistoryPage
--------                 ---------------                          -----------
Updates post  -(ok!)->   SessionsProvider
Posts   <-(fetch data)   SessionsProvider
(array of posts)->       SessionsProvider   -(array of posts)->   UI
```
---
**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/contexts/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

### Features

**Syfte:** Beskriv vad mappen innehåller

**Fil:** `src/Features/`

**Använder:**

- Komponent/bibliotek 1
- Komponent/bibliotek 2

---

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
