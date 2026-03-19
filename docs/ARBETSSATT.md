## Arbetssätt

### Förklaring av arbetssätt

#### TypeScript
Vi började bygga projektet i JavaScript och jsx eftersom projektet startade innan vi började lära oss TypeScript. Längre fram skrev vi dock nya komponenter och features i ts och tsx, och i samband med det behövde även några tidigare filer skrivas om, eftersom de exporterade otypade funktioner som skulle importeras i de nya delarna.

Dessutom valde vi att bygga om en del större och centrala features (tex Timern) till Contexts, och gick då över till ts i det skedet. Dock är flera delar av applikationen fortfarande kvar i js-format eftersom de inte exporterar data till några typade komponenter och därför inte av nödvändighet behöver skrivas om.

##### Vilka fördelar gav det oss?
När vi skrev nya delar av applikationen i TypeScript märkte vi hur typsäkerheten hjälper till när man hänvisar till variabler och kallar på funktioner längre bort i kedjan. Det är mer arbete i början, men det kan faktiskt bli mindre arbete i andra änden när man tex kodar visuella komponenter och bara visas giltiga alternativ för olika värden överallt. 

Det tvingar en också att tänka igenom grundligt hur allt faktiskt _ska fungera_, ovärderligt när man exempelvis bygger datastrukturer med hjälp av Context API. Ju tydligare man har den bilden framför sig desto enklare blir det att förstå vad behöver hända i varje steg, vilket gör att man inte behöver _chansa_ när man kodar utan kan istället _välja_ rätt kod att skriva för att uppnå det man vill. 

##### Vilka problem fick vi av att använda TS?
Även om fördelarna med TypeScript snabbt blev tydliga, så stötte vi också på en del problem. Kombinationen React och TS när man är ny på båda områdena var utmanade, eftersom man såg direkt när något var fel men vi hade inte tillräcklig kunskap för att förstå varför det blev fel eller hur man skulle ha gjort istället. Det verkliga nyttan med TS kommer antagligen med tiden när man är mer van vid det, men för oss blev upplevelsen ofta att vi "högg i sten" och att istället för att bli hjälpta av det så fick vi bara fler saker som inte verkade vilja sitta ihop med varandra.

Det bör också nämnas att många fel som utgjordes av att TS sa ifrån antagligen hade uppstått även utan TS men i form av obskyra Type Errors och liknande, som även de hade tagit tid att hitta och rätta till.

### Varför valde vi att ha med de delar vi valde?
