# Thissen biljartcalculator

Openbare, meertalige calculator (Nederlands, Engels en Frans) in de Thissen-huisstijl: #123024, #db7a0d, #b83600 en #3d9e66. Geen installatie, externe bibliotheken, account of backend nodig. Kamerafmetingen worden alleen in de browser verwerkt.

## Openen

Open `index.html` in een browser. Houd `index.html`, `calculator.js`, `translations.js`, `app.js` en `logo.svg` in dezelfde map.

## Publiceren met GitHub Pages

1. Maak een GitHub-repository, bijvoorbeeld `biljartcalculator`.
2. Upload de bestanden uit deze map rechtstreeks in de root van de repository (niet de ZIP).
3. Ga naar **Settings → Pages**.
4. Kies **Deploy from a branch**, branch **main**, map **/ (root)** en **Save**.
5. Open de URL die GitHub Pages daarna toont. Deze is normaal `https://GEBRUIKERSNAAM.github.io/biljartcalculator/`.
6. Voeg op thissen.be een link of knop naar die calculator toe.

De exacte benamingen van GitHub-instellingen kunnen wijzigen. Geen GitHub-repository of publicatie is vanuit deze oplevering aangemaakt.

## Berekening

Alle 18 door Thissen aangeleverde formaten staan ongewijzigd in `calculator.js`. De opgegeven ideale speelruimte is leidend, niet een zelf berekende standaardmarge.

Bij een kortere keu:

`benodigde lengte = ideale lengte − 2 × (standaardkeu − gekozen keu)`

Dezelfde formule geldt voor de breedte. Beide tafelrichtingen worden gecontroleerd; de richting met de hoogste mogelijke keulengte wordt gekozen. Bij gelijke uitkomst heeft de lengterichting voorrang. Voor kortere keuen wordt de maximaal beschikbare lengte naar beneden afgerond op hele centimeters. Dit is een theoretische maat, geen bevestiging van een verkrijgbaar product.

De grens telt mee: exact de ideale afmetingen past. De gebruiker kiest een minimale keulengte van 120, 110, 100 of 90 cm. Standaard: 120 cm. Het resultaat blijft een indicatie voor één centraal geplaatste tafel en een rechthoekige, obstakelvrije kamer. De tekening geeft het speelveld weer, niet de buitenafmetingen van het meubel. Er zijn geen buitenafmetingen geleverd; laat die altijd controleren voor aankoop/installatie.

## Aanpassen

- Maattabel en berekening: `calculator.js`.
- Kleuren, teksten en opmaak: `index.html`.
- Interactie en plattegrond: `app.js`.
- Het aangeleverde Thissen-logo staat in `logo.svg`; alleen het tekengebied is bijgesneden om lege marges weg te nemen.
- Vertalingen voor alle interface-elementen en tafelbenamingen: `translations.js`.
- Invoer wordt pas verwerkt na klikken op Bereken. De pagina start met een voorbeeldkamer van 5,50 × 4,20 meter. Taalwissels behouden de invoer en selectie.
- Opbouw: introductie → jouw ruimte → jouw mogelijkheden → plattegrond → advies.
- Meubels lager dan 120 cm mogen worden meegerekend als vrije ruimte zolang ze de keubeweging bij de daadwerkelijke speelhoogte niet hinderen.
- Contactknop: `https://www.thissen.be/contactus`.

## Controle

Met Node.js: `node test.cjs`.

De controles omvatten alle formaten, beide richtingen, exacte grensmaten, uitsluiten van te kleine kamers, kortere keuen en foutieve invoer.

## Update

Berekenen werkt via de knop en via Enter, en accepteert decimalen met komma of punt. De kamer blijft zichtbaar als geen tafel past. Beide contactknoppen zijn gecentreerd; de footer bevat de website en bedrijfsgegevens.
