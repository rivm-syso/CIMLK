"C:\Program Files\wetransform\HALE\jre\bin\java" -Dhale.project.monitoringronde="2022" -Dhale.project.monitoringjaar="2021" -jar "C:\Program Files\wetransform\HALE\plugins\org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar" -application hale.transform -project "WegverkeerCSV2SHAPE.halex" -source input\MR2021\receptoren_mr2021_2020.csv -Stypename Receptoren -Scharset UTF-8 -Sseparator ";" -Sskip true -source input\MR2021\maatregelen_mr2021_2020.csv -Stypename Maatregelen -Scharset UTF-8 -Sseparator ";" -Sskip true -source input\MR2021\wegdelen_mr2021_2020.csv -Stypename Wegdelen -Scharset UTF-8 -Sseparator ";" -Sskip true -target output\wegverkeer_shape_mr2021_2020.shp -preset SHP -Scrs.epsg.prefix urn:ogc:def:crs:EPSG:: -reportsOut output\CSV2SHAPEwegverkeer.log -trustGroovy 

