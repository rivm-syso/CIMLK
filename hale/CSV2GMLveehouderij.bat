"C:\Program Files\wetransform\HALE\jre\bin\java" -Xmx1g -Dcache.level1.enabled=false -Dcache.level1.size=0 -Dcache.level2.enabled=false -Dcache.level2.size=0 -Dhale.project.monitoringronde="2022" -Dhale.project.monitoringjaar="2021" -jar "C:\Program Files\wetransform\HALE\plugins\org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar" -application hale.transform -project "Veehouderij CSV2GML.halex" -source input\Veehouderijen.csv -Stypename Veehouderijen -Scharset UTF-8 -Sseparator ";" -Sskip true -source input\Veehouderij_receptoren.csv -Stypename Veehouderij_receptoren -Scharset UTF-8 -Sseparator ";" -Sskip true -source input\Veehouderij_rekenresultaten.csv -Stypename Veehouderij_rekenresultaten -Scharset UTF-8 -Sseparator ";" -Sskip true -target output\veehouderij.gml -preset GML -Scrs.epsg.prefix urn:ogc:def:crs:EPSG:: -reportsOut output\CSV2GMLveehouderij.log -trustGroovy 

