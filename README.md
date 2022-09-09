# CIMLK – Centraal Instrument Monitoring Luchtkwaliteit
## Informatiemodel Monitoring Luchtkwaliteit
Het informatiemodel is gepubliceerd op de volgende link: https://rivm-syso.github.io/CIMLK/

Het informatiemodel wordt gebruikt om vast te leggen welke gegevens worden uitgewisseld.
Daarnaast wordt het model gebruikt om een XSD schema te genereren waarmee de aangeleverde GML bestanden kunnen worden gevalideerd.

## Ontwikkeling informatiemodel
Het informatiemodel is opgesteld in Sparx Enterprise Architect.
Het bestand is te vinden in de map `informatiemodel/cimlk.eapx`.

Nadat wijzigingen in het informatiemodel zijn doorgevoerd dienen een aantal stappen uitgevoerd te worden om het informatiemodel te publiceren.
Wanneer al deze stappen zijn uitgevoerd kunnen op Github worden gezet.
De wijzigingen worden vervolgens automatisch gepubliceerd wanneer deze op `main` branch worden doorgevoerd.

De volgende stappen dienen hiervoor te worden gevolgd:
- Wijzigen datum in `informatiemodel/respec-basis.html`
- Genereren Respec document
- Updaten afbeeldingen met diagrammen
- Genereren CSV's met informatie over objecttypen en attributen
- Genereren nieuw XSD schema
- Updaten van transformaties en validaties in HALE

Bovenstaande stappen worden hieronder verder toegelicht.

### Wijzigingen Sparx Enterprise Architect
Het Sparx Enterprise Architect bestand wordt als basis gebruikt voor het informatiemodel.

Op basis van het informatiemodel wordt automatisch een Respec document gegenereerd.
Dit document wordt op Github automatisch gepubliceerd als webpagina zodat gebruikers het kunnen raadplegen.
Het document kan met behulp van een vanuit Sparx Enterprise Architect gegnereerd worden: Scripting -> CIMLK -> Export to Respec.
Dit script voert de volgende stappen uit en voegt informatie uit verschillende bestanden samen:
- Opstellen Respec document inclusief inleidende teksten op basis van `informatiemodel/respec-basis.html`
- Toevoegen van informatie over de objectypen en attributen vanuit Sparx Enterprise Architect
- Toevoegen van bijlagen over de uitwisselbestanden op basis van `informatiemodel/bijlagen.html`

Het resultaat van het script wordt opgeslagen onder `docs/index.html`. Merk op dat dit alleen succesvol werkt als Sparx Enterprise Architect is geopend door het modelbestand aan te klikken en niet door het te openen vanuit Sparx Enterprise Architect. In het laatste geval staat de huidige directory niet goed ingesteld en dan kunnen de scripts de relevante bestanden niet lokaliseren.

Eventuele wijzigingen van de diagrammen kunnen worden opgeslagen door de diagrammen te kopieren.
Sla vervolgens de diagrammen op als afbeelding in de map `docs`.
In het Respec document wordt naar deze afbeeldingen gelinkt waardoor deze als afbeelding in het document verschijnen.

Naast het Respec document wordt informatie over de objecttypen en attributen ook als CSV bestand beschikbaar gesteld.
Voer na wijzigingen daarom ook de volgende scripts uit om de CSV bestanden te genereren:
- Scripts -> CIMLK -> Export Attributes
- Scripts -> CIMLK -> Export objecttypes

### Genereren XSD schema
Naast documentatie over de inhoud van het informatiemodel wordt ook een XSD schema gegenereerd.
Dit schema wordt gebruikt voor validatie en transformatie en moet na wijzigingen in het informatiemodel ook geupdate worden.

Om het XSD schema te genereren wordt gebruik van gemaakt van ShapeChange.
Installeer ShapeChange: https://shapechange.net/get-started/
Test de installatie zoals aangegeven op website.

Het script in dit project haalt de locatie van de java jar uit een bestand.
Maak hiervoor in de `shapechange` map van dit project het volgende bestand aan: `shapechange_java.txt`.
Zet in het bestand het pad naar de locatie van het ShapeChange jar bestand (bijv. `N:\data\ShapeChange\ShapeChange-2.11.0.jar`).

Het XSD schema kan vervolgens met behulp van de volgende stappen 
Start de command line en navigeer naar de `shapechange` map van dit project.

Op de Campus omgeving moet je zorgen dat de juiste java versie wordt gebruikt:
```cmd
cmd.exe /appvve:8b3b135f-5502-49b9-8c32-b75904c64222_242a68da-ee02-4478-a72d-1fe21f33dd76
```

Start het script met het volgende commando:
```cmd
cimlk.bat
```

Dit script genereert een nieuwe XSD op basis van het informatiemodel en slaat deze op in `shapechange/imlk.xsd`.

### HALE Studio transformaties en validaties
Het XSD bestand wordt gebruikt om met behulp van HALE Studio transformaties en validaties uit te voeren.
Wanneer het XSD schema is veranderd dan dienen de HALE Studio projecten in de map `hale` geupdate te worden.
Start hiervoor elk HALE Studio project in de map op en update de referenties naar het nieuwe schema.
Voeg daarna eventuele verdere aanpassingen toe waarop gecontroleerd moet worden.
