"C:\Program Files\wetransform\HALE\jre\bin\java" -Dhale.project.monitoringronde="2022" -Dhale.project.monitoringjaar="2021" -jar "C:\Program Files\wetransform\HALE\plugins\org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar"  -application hale.transform -project "Wegverkeer export.halex" -source input\receptoren_2020_pdr.csv -Stypename receptoren_2020_pdr -Scharset UTF-8 -Sseparator ";" -Sskip true -source input\maatregelen_2020_pgd.csv -Stypename maatregelen_2020_pgd -Scharset UTF-8 -Sseparator ";" -Sskip true -source input\wegdelen_2020_pdr.csv -Stypename wegdelen_2020_pdr -Scharset UTF-8 -Sseparator ";" -Sskip true -target output\wegverkeer.gml -preset GML -reportsOut output\exportwegverkeer.log -stacktrace -trustGroovy 