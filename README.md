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
- Aanpassen model in Sparx Enterprise Architect
- Genereren Respec HTML document
- Aanpassen afbeeldingen van diagrammen
- Genereren CSV bestanden van informatiemodel
- Genereren GML applicationschema met SchapeChange
- Aanpassen transformaties in HALE

Bovenstaande stappen worden hieronder verder toegelicht.

Er wordt ook ingegaan op het aanpassen van het ReSpec profiel en het omgaan met verschillende versies van het informatiemodel.

### Aanpassen model in Sparx Enterprise Architect
Het informatiemodel wordt beheerd in Sparx Enterprise Architect. Het is gemaakt in versie 15.2 van Sparx Enterprise Architect en is ook in te lezen in de 32-bit versie van versie 16.x. Merk op dat Sparx Enterprise Architect is overgegaan op een ander bestandsformaat in versie 16, maar dat de 32-bits versie ook nog in staat is bestanden in het oude formaat in te lezen. 

Er zijn ook allerlei scripts ontwikkeld in Sparx Enterprise Architect. Er heeft geen uitgebreide test plaats gevonden of al deze scripts ook nog goed werken in versie 16.

Het informatiemodel is gebaseerd op het Metamodel voor Informatiemodellering (zie `https://docs.geostandaarden.nl/mim/mim/`). Ter ondersteuning van dit metamodel moet je een toolbox installleren in Sparx Enterprise Architect. Er is gebruik gemaakt van versie 1.1 van de toolbox die je kunt downloaden op `https://register.geostandaarden.nl/informatiemodel/mim/`. 

In de desktop omgeving van RIVM is versie 16 (32-bit) aanwezig en is versie 1.1 van de toolbox geïnstalleerd. Toegang tot het tool kan worden aangevraagd. 

### Genereren ReSpec HTML document
De visualisatie van het informatiemodel vindt plaats met ReSpec. 
Dit is een open source tool die ervoor zorgt dat (HTML) documenten er op een standaard manier uitzien.
ReSpec werkt door een HTML document te verrijken met extra informatie, zoals welke hoofdstukken en paragrafen erin zitten.
Dit verrijkte HTML document wordt voor CIMLK gegenereerd met een script in Sparx Enterprise Architect.
Het document wordt op Github opgeslagen in `docs/index.html` en automatisch gepubliceerd als webpagina.
Voordat je begint met genereren moet je de datum in het bestand `informatiemodel/respec-basis.html` wijzigen in de huidige datum.
Het genereren van het ReSpec HTML document vindt plaats met een script. 
Ga hiervoor met je muis in de treeview van Sparx Enterprise Architect naar de map `CIMLK` in het informatiemodel.
Druk op je rechtermuisknop en selecteer in het pop-up menu `Specialize -> Scripts -> Export to Respec`.
Het script voert de volgende stappen uit en voegt informatie uit verschillende bestanden samen:
- Creëren Respec HTML document inclusief inleidende teksten op basis van `informatiemodel/respec-basis.html`
- Toevoegen van informatie over de objectypen en attributen vanuit Sparx Enterprise Architect
- Toevoegen van bijlagen over de uitwisselbestanden op basis van `informatiemodel/bijlagen.html`

Het resultaat van het script wordt opgeslagen onder `docs/index.html`. Merk op dat dit alleen succesvol werkt als Sparx Enterprise Architect is geopend door het modelbestand aan te klikken en niet door het te openen vanuit Sparx Enterprise Architect. In het laatste geval staat de huidige directory niet goed ingesteld en dan kunnen de scripts de relevante bestanden niet lokaliseren.

Er blijken problemen te zijn met het weergeven van het informatiemodel in de RIVM desktopomgeving als gebruik wordt gemaakt van de laatste versie van ReSpec (het menu scrollt mee met de inhoud). Om die reden wordt een kopie van het `index.html` gemaakt naar `rivm.html` waarin de verwijzing naar de respec JavaScript bibliotheel wordt aangepast naar een eigen aangepaste kopie van een oude versie van de ReSpec bibliotheek (`rivm-respec-w3c-v26.13.4.js`). Dat document is dus specifiek bedoeld door gebruik binnen de RIVM desktopomgeving.

### Aanpassen afbeeldingen van diagrammen
In het ReSpec HTML bestand wordt op een aantal plaatsen verwezen naar afbeeldingen van stukken van het informatiemodel.
Deze zijn opgeslagen in de map `docs`.
Als er op wijzigingen in het diagram zijn dan moeten de afbeeldingen van (delen van) het diagram opnieuw worden gemaakt.
Kopieer hiervoor de relevante diagramdelen uit Sparx Enterprise Architect naar een bitmap met bijvoorbeeld IrfanView en sla deze op onder de naam van het originele afbeeldingsbestand. 
Als de locaties of omvang van de objecttypes zijn aangepast, dan moeten ook de image maps in het HTML document worden aangepast. 
De in de image map gebruikte coördinaten kun je in bijvoorbeeld IrfanView zien. 

### Genereren CSV bestanden van informatiemodel
Naast het Respec document wordt informatie over de objecttypen en attributen ook als CSV bestand beschikbaar gesteld. 
Dit is voor bijvoorbeeld de ontwikkelaars een praktische manier om het informatiemodel te raadplegen.
Er zijn twee scripts beschikbaar in het informatiemodel om de CSV bestanden te raadplegen. 
Deze scripts zijn te starten via `Specialize -> Scripts -> Export attributes` en `Specialize -> Scripts -> Export objecttypes`.

### Genereren GML applicationschema met ShapeChange
Naast documentatie over de inhoud van het informatiemodel wordt ook een XSD schema gegenereerd ter ondersteuning van de GML uitwisselstandaard.
Dit schema moet na aanpassingen in het informatiemodel ook aangepast worden.

Het informatiemodel is specifiek geschik gemaakt voor de ondersteuning van GML. Hiervoor zijn bij verschillende modelelementen aanvullend mappings op GML stereotypen aangebracht:
- De map van het informatiemodel zelf heeft stereotype `GML::ApplicationSchema` gekregen.
- Objecttypes hebben het stereotype `GML::FeatureType` gekregen.
- Gegevensgroeptypes hebben het stereotype `GML::DataType` gekregen.
- Enumeraties hebben het stereotype `GML::Enumeration` gekregen.

De map van het informatiemodel is tevens voorzien van een aantal extra eigenschappen (`xsdDocument`, `targetNamespace` en `xmlns`).

Om het XSD schema te genereren wordt gebruik van gemaakt van ShapeChange.
Installeer ShapeChange: https://shapechange.net/get-started/ .
Test de installatie zoals aangegeven op website.
Er is een configuratie van ShapeChange gemaakt voor CIMLK in het bestand `cimlk.xml`

Het script voor het starten van ShapeChange haalt de locatie van de java jar uit een bestand.
Maak hiervoor in de `shapechange` map van dit project het volgende bestand aan: `shapechange_java.txt`.
Zet in het bestand het pad naar de locatie van het ShapeChange jar bestand (bijv. `N:\data\ShapeChange\ShapeChange-2.11.0.jar`).

Het XML Schema kan worden gegenereerd met de volgende stappen.

Start de command line en navigeer naar de `shapechange` map van dit project.

Op de RIVM omgeving moet je zorgen dat de juiste java versie wordt gebruikt:
```cmd
cmd.exe /appvve:8b3b135f-5502-49b9-8c32-b75904c64222_242a68da-ee02-4478-a72d-1fe21f33dd76
```

Start het script met het volgende commando:
```cmd
cimlk.bat
```

Dit script genereert een nieuw XML Schema op basis van het informatiemodel en slaat deze op in `doc/imlk.xsd`.

Het XML Schema bestand moet handmatig worden aangepast, omdat hier standaard niet de juiste XML namespaces en FeatureCollection definitie in zit. Hiertoe moet alles voorafgaand aan het eerste inhoudelijke element worden overschreven met de inhoud van het bestand `schemaheader.txt`.

### Aanpassen transformaties in HALE
Er zijn transformaties van en naar SHP en GML gemaakt in HALE studio. De transformaties van en naar SHP zijn inmiddels niet meer relevant, omdat is gekozen om gebruik te maken van OGR2OGR. Van de transformaties van en naar GML moet nog worden bepaald of ze ook gebruikt zullen worden in CIMLK of dat ze zelf ontwikkeld worden in Java. In dat laatste geval kunnen de HALE transformaties of de daarin gegenereerde voorbeeldbestanden worden gebruikt als basis en controlemechanisme.

De transformaties zijn ontwikkeld in een voorloper van versie 5.0 (SNAPSHOT versie 4.2) van HALE Studio. Inmiddels is HALE Studio versie 5.0 beschikbaar. De projecten zijn echter nog niet getest met deze versie.

Er zijn vier HALE studio projecten beschikbaar voor de conversie van en naar GML:
- Wegverkeer CSV2GML.halex - converteert gegevens voor wegverkeer van CSV naar GML
- Wegverkeer GML2CSV.halex - converteert gegevens voor wegverkeer van GML naar CSV
- Veehouderij CSV2GML.halex - converteert gegevens voor veehouderijen van CSV naar GML
- Veehouderij GML2CSV.halex - converteert gegevens voor veehouderijen van GML naar CSV

De projecten voor wegverkeer zijn relatief eenvoudig van opzet, omdat velden in de bronbestanden grotendeels één-op-één kunnen worden overgezet naar doelbestanden. De projecten voor de veehouderij bestanden zijn complexer, omdat het veehouderij CSV formaat een gedenormaliseerde structuur is waarin allerlei gegevens redundant aanwezig zijn. Dat betekent dat het converteren van CSV naar GML vraagt om het samenvoegen van dubbele gegevens. Hiervoor wordt de Merge operatie van HALE Studio gebruikt. Het converteren van GML naar CSV vraagt om het negeren van dubbele gegevens. Voor die laatste wordt gebruik gemaakt van Groovy scripts die gebruik maken van een zogenaamde collector in HALE studio. Een dergelijke collector kun je zien als een soort globale variabele, waarin gegevens kunnen worden verzameld.

In alle projecten die converteren van CSV naar GML zijn projectvariabelen opgenomen voor de namespace, monitoringjaar en monitoringronde. De eerste zorgt ervoor dat de namespace niet hard gecodeerd hoeft te worden op allerlei plaatsen. De laatste twee zijn gegevens die niet in de originele CSV bestanden aanwezig zijn en dus moeten worden meegegeven als command-line argument om ze op te kunnen nemen in het GML bestand.

Voor elk project zijn er ook batch files en testdata bestanden beschikbaar om het bijbehorende project te testen. De testdata bestanden zijn opgenomen in de map `/hale/input/`. De uitvoer van die batch files wordt geplaatst in de map `/hale/output/`.

Het GML applicatieschema wordt gebruikt in de vier genoemde HALE Studio projecten. 
Op het moment dat dit applicatieschema wijzigt dan dienen deze projecten ook te worden bijgewerkt.
Dat betekent dat er minimaal `Reload and update schemas` moet worden geselecteerd om het nieuwe schema in te lezen.
Daarnaast zullen inhoudelijke wijzigingen in het schema moeten worden doorgevoerd in de transformaties zelf.

De HALE studio projectbestanden bevatten standaard absolute paden naar de computer van de gebruiker die de projecten heeft aangepast. Deze absolute paden moeten handmatig worden vervangen door relatieve paden. Hiervoor kan een zoek-en-vervang functie in een teksteditor worden gebruikt. Na aanpassing zou de prefix voor de bestandsnamen alleen nog `file:/` moeten zijn.

### Beheren ReSpec profiel
ReSpec is een standaard JavaScript bibliotheek die het mogelijk maakt om HTML documenten in een standaard opmaak te laten zien. Het is afkomstig van de W3C organisatie die het gebruikt om haar eigen standaarden mee te publiceren. Omdat de standaard opmaak niet goed past is er een eigen profiel gemaakt. Dit profiel is te vinden in de `respec/` map op GitHub. 

Om het profiel aan te passen, lokaal te testen en een deployment versie te genereren is het nodig om zelf een clone van de ReSpec repository (`https://github.com/w3c/respec`) te maken en daar het profiel in te kopiëren. Dat betekent dat de bestanden in `respec/src` en `respec/profiles` naar de mappenstructuur van ReSpec moeten worden gekopieerd. Na het clonen van de ReSpec repository kan met het commando `npm install` ReSpec lokaal worden geinitialiseerd. 

Het starten van de ReSpec testomgeving gaat met het commando
```cmd
npm start -- --browser Chrome
```

Als de aanpassingen in het profiel na testen goed zijn dan kan een build van ReSpec met daarin het RIVM profiel worden gemaakt met het commando 
```cmd
node ./tools/builder.js rivm
```

Het resulterende JavaScript bestand staat vervolgens in de `builds` map. Het bestand `builds/respec-rivm.js` moet vervolgens worden gekopieerd naar de map `docs/`.

Er is voor gekozen om het W3C profiel als basis te gebruiken en niet een geheel nieuw eigen profiel op te zetten. Praktisch zitten er daarmee in het profiel ook nog allerlei W3C specifieke elementen, die alleen niet gebruikt worden voor RIVM.