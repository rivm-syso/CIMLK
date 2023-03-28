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
- Wijzigen model in Sparx Enterprise Architect
- Genereren Respec HTML document
- Aanpassen afbeeldingen van diagrammen
- Genereren CSV bestanden van informatiemodel
- Genereren XML schema
- Updaten van transformaties en validaties in HALE

Bovenstaande stappen worden hieronder verder toegelicht.

Er wordt ook ingegaan op het aanpassen van het ReSpec profiel.

### Wijzigingen model in Sparx Enterprise Architect
Het informatiemodel wordt beheerd in Sparx Enterprise Architect. Het is gemaakt in versie 15.2 van Sparx Enterprise Architect en is ook in te lezen in de 32-bit versie van versie 16.x. Merk op dat Sparx Enterprise Architect is overgegaan op een ander bestandsformaat in versie 16, maar dat de 32-bits versie ook nog in staat is bestanden in het oude formaat in te lezen. 

Er zijn ook allerlei scripts ontwikkeld in Sparx Enterprise Architect. Er heeft geen uitgebreide test plaats gevonden of al deze scripts ook nog goed werken in versie 16.

Het informatiemodel is gebaseerd op het Metamodel voor Informatiemodellering. Ter ondersteuning van dit metamodel moet je een toolbox installleren in Sparx Enterprise Architect. Er is gebruik gemaakt van versie 1.1 van de toolbox die je kunt downloaden op `https://register.geostandaarden.nl/informatiemodel/mim/`. 

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

### Genereren XML schema
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
