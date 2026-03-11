<a id="readme-top"></a>

<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="src/img/zoan-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Zoan Productivity App</h3>
 <!--
  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p> -->
</div>

<!-- Innehåll -->
<details>
  <summary>Innehåll</summary>
  <ol>
    <li>
      <a href="#om-projektet">Om Projektet</a>
      <ul>
<a href="#tech-stack">Tech Stack</a>
      </ul>
    </li>
    <li>
      <a href="#kom-igång">Kom igång</a>
      <ul>
        <li><a href="#förinstallationer">Förinstallationer</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#användning">Anvädning</a></li>
    <li><a href="#teknisk-dokumentation">Teknisk Dokumentation</a></li>
    <li><a href="#contributors">Contributors:</a></li>
  </ol>
</details>

<!-- Om Projektet -->

## Om Projektet

[![Product Name Screen Shot][product-screenshot]](https://example.com)

**Produktivitetsverktyget** för tidsspårning och energihantering som
håller dig in the _Zoan_!

Vad är det egentligen?

Zoan är en produktivitets- och arbetssession-spårningsapplikation designad för att hjälpa användare att hålla fokus och bättre förstå sina arbetsvanor.

Istället för att bara spåra arbetad tid låter Zoan användare registrera vad de arbetade med, hur de kände sig under sessionen och vilken typ av arbete som utfördes. Med tiden hjälper dessa data användare att identifiera mönster i produktivitet och energinivåer.

Målet med applikationen är att ge användare insikter i deras arbetsvanor så att de kan planera sina arbetsdagar bättre och behålla fokus under djupa arbetsperioder.

Zoan utvecklades som ett projekt för Fullstack JavaScript / Javascript-utvecklarprogrammet på Chas Academy.

Zoan syftar till att **förbättra din produktivitet** och hjälper dig att **hålla fokus under hela dagen.**

### Huvudfunktioner

**Spåra Arbetssessioner**

Användare kan starta en timer för att spåra fokuserade arbetssessioner. När en session avslutas kan användaren:

- Se total sessionstid

- Välja typ av session (t.ex. Deep Work, Möte, Chill)

- Lägga till en beskrivning av vad de arbetade med

- Registrera sitt humör med en femnivåskala med emojis från glad till arg eller ledsen

Sessioner sparas och kan granskas senare för att analysera produktivitetsmönster.

**Registrera sessioner manuellt**

Om en användare glömmer att starta timern kan sessioner också läggas till manuellt genom att ange sessionsens längd och detaljer.

**Produktivitetsinsikter**

Applikationen visualiserar historiska data med hjälp av grafer som visar:

- Typer av arbetssessioner över tid

- Humörmönster under arbetssessioner

**Kalenderöversikt**

En kalender visar tidigare arbetssessioner med färgkodade indikatorer som representerar registrerat humör för varje session.
Till exempel representerar en grön prick ett positivt humör medan andra färger indikerar lägre energi- eller fokusnivåer.

**To Do**

Zoan inkluderar en enkel att-göra-lista där användare kan hantera uppgifter relaterade till sina arbetssessioner.

**Användarkonton**

Användare kan skapa konton och logga in säkert. I "settings" kan de:

- Uppdatera sitt användarnamn

- Ladda upp eller ändra profilbild

- Justera föredragna arbetssessioners längd med hjälp av sliders

**Responsiv Design & Mörkt Läge**

Applikationen är helt responsiv och designad för att fungera på både desktop och mobila enheter. Den inkluderar också ett mörkt läge så att man kan ställa in enligt preferens.

### Exempel på användarflöde

För att ge en tydlig bild av hur appen används kan en typisk session se ut så här:

1. Användaren loggar in
2. Startar en "Deep Work"-session
3. Arbetar i 45 minuter
4. Stoppar timern
5. Loggar humör och anteckningar
6. Sessionen sparas och visas i statistik och kalender

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tech Stack

**Frontend**

[![React][React.js]][React-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![MUI][MUI.com]][MUI-url]

**Backend**

[![Express][Express.js]][Express-url]

**Databas & Autentisering**

[![Supabase][Supabase.io]][Supabase-url]

**Testning**

[![Vitest][Vitest]][Vitest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Kom igång -->

## Kom igång

Följ dessa steg för att sätta upp projektet lokalt.

### Förinstallationer

Se till att du har följande installerat:

- Node.js
- npm

Du kan kontrollera om de är installerade med:

```sh
node -v
npm -v
```

### Installation

1. Klona repot
   ```sh
   git clone https://github.com/Sascha-Bergenas/Zoan-Project.git
   ```
2. Navigera till projektmappen
   ```sh
   cd my-react-app
   ```
3. Installera dependencies

   ```sh
   npm install
   ```

### Starta applikationen

1.  Starta frontend-utvecklingsservern

```sh
npm run dev
```

4. Starta backend-servern (körs separat)

```sh
cd backend
npm start
```

**API-åtkomst**

Detta projekt kommunicerar med ett backend-API som kräver en privat API-nyckel.

Av säkerhetsskäl ingår inte API-nyckeln i repot.
För att kunna använda backend-funktionaliteten måste du få en giltig API-nyckel från projektets utvecklare.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Användning -->

## Användning

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Teknisk Dokumentation

För en djupare förståelse av projektets struktur, komponenter och arbetsfördelning, se vår tekniska dokumentation:

[Läs den tekniska dokumentationen](docs/TECHNICAL.md)

## Contributors

<a href="https://github.com/Sascha-Bergenas/Zoan-Project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Sascha-Bergenas/Zoan-Project" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: my-react-app/src/img/screenshot.png
[React.js]: https://img.shields.io/badge/react-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[Supabase.io]: https://img.shields.io/badge/supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E
[Supabase-url]: https://supabase.com/
[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MUI.com]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vitest]: https://img.shields.io/badge/Vitest-000000?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
