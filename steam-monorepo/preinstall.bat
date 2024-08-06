@echo off

echo Preinstall steam-interaction
cd "steam-interaction"
call npm install

echo Preinstall steam-authorization
cd "../steam-authorization"
call npm install

echo Preinstall account-contract
cd "../account-contract"
call npm install

rem Add more project prebuild steps as needed
echo All projects preinstall successfully

@echo off
pause