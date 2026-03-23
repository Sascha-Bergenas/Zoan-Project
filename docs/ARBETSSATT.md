## Arbetssätt

### Förklaring av arbetssätt

Vi använde GitHub för att hantera projektets kod. Varje medlem arbetade på separata brancher, och alla ändringar sammanfördes i en gemensam dev-branch innan de mergades till main. Vi använde Kanban med issues för att planera och följa upp arbetsuppgifter. Varje issue representerade en uppgift eller feature. Vi var noggranna med detta för att kunna följa varandras arbete och vem som jobbade på vad.

Vi såg till att från början införa daily standups, och hade 15-minuter huddle varje vardag. Detta underlättade mycket för att kunna hålla varandra uppdaterade om var vi ligger med våra issues, om man stött på problem eller behöver hjälp.

Vi försökte organisera arbetet i sprintar, med planering och målsättningar för varje period. Detta fungerade bra under projektets första halva, men tappades lite mot slutet då det blev det svårare att hålla sprintarna strikt. Vi tar med oss till nästa projekt att det krävs kontinuerlig uppföljning och disciplin för att det ska hålla hela vägen.

Utöver detta hade vi tät kontakt i Slack-kanalen och alla har varit snabba på att svara på meddelanden. Vi hade även schemlagt projekttid varje fredag mellan 9-14 (men ofta fastnade vi alla längre än så!)

#### TypeScript

Vi började bygga projektet i JavaScript och jsx eftersom projektet startade innan vi började lära oss TypeScript. Längre fram skrev vi dock nya komponenter och features i ts och tsx, och i samband med det behövde även några tidigare filer skrivas om, eftersom de exporterade otypade funktioner som skulle importeras i de nya delarna.

Dessutom valde vi att bygga om en del större och centrala features (tex Timern) till Contexts, och gick då över till ts i det skedet. Dock är flera delar av applikationen fortfarande kvar i js-format eftersom de inte exporterar data till några typade komponenter och därför inte av nödvändighet behöver skrivas om.

##### Vilka fördelar gav det oss?

När vi skrev nya delar av applikationen i TypeScript märkte vi hur typsäkerheten hjälper till när man hänvisar till variabler och kallar på funktioner längre bort i kedjan. Det är mer arbete i början, men det kan faktiskt bli mindre arbete i andra änden när man tex kodar visuella komponenter och bara visas giltiga alternativ för olika värden överallt.

Det tvingar en också att tänka igenom grundligt hur allt faktiskt _ska fungera_, ovärderligt när man exempelvis bygger datastrukturer med hjälp av Context API. Ju tydligare man har den bilden framför sig desto enklare blir det att förstå vad som behöver hända i varje steg, vilket gör att man inte behöver _chansa_ när man kodar utan kan istället _välja_ rätt kod att skriva för att uppnå det man vill.

##### Vilka problem fick vi av att använda TS?

Även om fördelarna med TypeScript snabbt blev tydliga, så stötte vi också på en del problem. Kombinationen React och TS när man är ny på båda områdena var utmanade, eftersom man såg direkt när något var fel men vi hade inte tillräcklig kunskap för att förstå varför det blev fel eller hur man skulle ha gjort istället. Det verkliga nyttan med TS kommer antagligen med tiden när man är mer van vid det, men för oss blev upplevelsen ofta att vi "högg i sten" och att istället för att bli hjälpta av det bara fick fler saker som inte verkade vilja sitta ihop med varandra.

Det bör också nämnas att många fel som utgjordes av att TS sa ifrån antagligen hade uppstått även utan TS men i form av obskyra Type Errors och liknande, som även de hade tagit tid att hitta och rätta till.

### Varför valde vi att ha med de delar vi valde?

Vi valde att inkludera Timer eftersom det är kärnan i applikationen - den gör det möjligt för användaren att mäta arbetspass, se tid visuellt och pausa eller stoppa när det behövs. Funktionen med olika arbetslägen (Deep Work, Möte, Chill) ger flexibilitet och hjälper användaren att strukturera sin arbetsdag.

ThemeContext / Darkmode lades till för att förbättra användarupplevelsen och ge möjlighet att växla mellan ljus och mörkt tema. Det gör appen mer anpassningsbar utifrån personliga preferenser.

PProfil visar personlig information som användarnamn och profilbild, vilket gör appen mer personlig. Vi la också in RandomQuote här för att ge användaren ett litet inspirerande citat varje gång.

LoginForm behövs så att användare kan skapa konto och spara sin profil och inställningar.

Smarta rekommendationer ger användaren tips på arbetsläge och hur länge de kan jobba, baserat på hur de mår. Det gör appen mer interaktiv och anpassad till varje person.

Välja Mode och RandomQuote kompletterar Timer och Profil genom att ge kontroll och inspiration, och de återanvändbara komponenterna som Button och TextArea gör koden enklare att bygga vidare på.
