"C:\Program Files\wetransform\HALE\jre\bin\java" -Xmx1g -Dcache.level1.enabled=false -Dcache.level1.size=0 -Dcache.level2.enabled=false -Dcache.level2.size=0 -jar "C:\Program Files\wetransform\HALE\plugins\org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar" -application hale.transform -project "Veehouderij GML2CSV.halex" -source output\veehouderij.gml -target output\Veehouderijen_output.csv -preset CSV -reportsOut output\GML2CSVveehouderij.log -trustGroovy 
"C:\Program Files\wetransform\HALE\jre\bin\java" -jar "C:\Program Files\wetransform\HALE\plugins\org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar" -application hale.transform -project "Veehouderij GML2CSV.halex" -source output\veehouderij.gml -target output\Veehouderij_receptoren_output.csv -preset CSVreceptor -reportsOut output\GML2CSVveehouderij_receptor.log -trustGroovy 
