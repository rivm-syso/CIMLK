Het cimlk.eapx-bestand is op het moment van schrijven >15MB, terwijl Github (recent?) een limiet van 10MB per bestand heeft ingesteld. Om die limitatie te omzeilen, is het bestand gecomprimeerd in een .zip-bestand.

Na het uitchecken, unzip:
cd informatiemodel/ && unzip cimlk-eapx.zip && del cimlk-eapx.zip && cd ../

Na je wijzigingen, zip:
cd informatiemodel/ && zip cimlk-eapx.zip cimlk.eapx && del cimlk.eapx && cd ../