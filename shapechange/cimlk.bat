set /p SHAPECHANGE_JAVA=<shapechange_java.txt
java -jar %SHAPECHANGE_JAVA% -Dfile.encoding=UTF-8 -c cimlk.xml
copy results\INPUT\imlk.xsd .
rmdir /s /q results
