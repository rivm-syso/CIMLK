"C:\Program Files\wetransform\HALE\jre\bin\java" -jar "C:\Program Files\wetransform\HALE\plugins\org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar" -application hale.transform -project "Veehouderij export.halex" -source schemas\veehouderij_bronnen.csv -Stypename veehouderij_bronnen -Scharset UTF-8 -Sseparator ";" -Sskip TRUE -target output\VeehouderijExport-alles.gml -preset GML -reportsOut output\VeehouderijExport.log -stacktrace -trustGroovy