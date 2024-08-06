@echo off

echo Preinstall analyzer
cd "analyzer"
call npm install

echo Preinstall steam-parser
cd "../steam-parser"
call npm install

rem Add more project preinstall steps as needed
echo All projects preinstall successfully

@echo off
pause