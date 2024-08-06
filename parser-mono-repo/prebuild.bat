@echo off

echo Prebuilding analyzer
call remove_useless_files_from_build %CD%\analyzer\build %CD%\analyzer\source 
cd "analyzer"
call npm run build
cd ..

echo Prebuilding steam-parser
call remove_useless_files_from_build %CD%\steam-parser\build %CD%\steam-parser\source 
cd "steam-parser"
call npm run build
cd ..

rem Add more project prebuild steps as needed
echo All projects prebuilt successfully

@echo off
pause