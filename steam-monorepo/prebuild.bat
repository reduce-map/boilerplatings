@echo off

echo Prebuilding steam-interaction
call remove_useless_files_from_build %CD%\steam-interaction\build %CD%\steam-interaction\source
cd "steam-interaction"
call npm run build
cd ..

echo Prebuilding steam-authorization
call remove_useless_files_from_build %CD%\steam-authorization\build %CD%\steam-authorization\source
cd "steam-authorization"
call npm run build
cd ..

echo Prebuilding account-contract
call remove_useless_files_from_build %CD%\account-contract\build %CD%\account-contract\source
cd "account-contract"
call npm run build
cd ..

rem Add more project prebuild steps as needed
echo All projects preibuild successfully

@echo off
pause