@echo off
setlocal enabledelayedexpansion

:: Get current date and time
FOR /F "tokens=2 delims==." %%a in ('wmic OS Get localdatetime /value') do (
    SET "datetime=%%a"
    SET "year=!datetime:~0,4!"
    SET "month=!datetime:~4,2!"
    SET "day=!datetime:~6,2!"
    SET "hh=!datetime:~8,2!"
    SET "min=!datetime:~10,2!"
    SET "sec=!datetime:~12,2!"
    SET "formatted_date=!year!-!day!-!month!-!hh!-!min!"
    SET "LOGFILE=ci-cd-logs\!formatted_date!-%1-services-monorepo.txt"
)

:: Start logging
CALL :LOG %* >> !LOGFILE!
EXIT /B

:LOG
ECHO All arguments: %*

:: Docker configuration fix
powershell -Command "try { $content = Get-Content 'C:\Users\Administrator\.docker\config.json' -Raw | ConvertFrom-Json; $content.PSObject.Properties.Remove('credsStore'); $content | ConvertTo-Json -Depth 10 -Compress | Set-Content 'C:\Users\Administrator\.docker\config.json' } catch { $_.Exception.Message }"

:: Setup environment variables based on passed argument
IF "%1" == "dev" (
    SET "DIRECTORY=dev/services-monorepo"
    SET "BRANCH=main"
    SET "DOCKER_TARGET=development"
    SET "DOCKER_PORT_USER_GATEWAY=4000"
) ELSE IF "%1" == "prod" (
    SET "DIRECTORY=prod/services-monorepo"
    SET "BRANCH=prod"
    SET "DOCKER_TARGET=production"
    SET "DOCKER_PORT_USER_GATEWAY=3000"
) ELSE (
    ECHO Invalid or no environment specified.
    EXIT /B 1
)

:: CI/CD process starts
ECHO Starting CI/CD process for %DOCKER_TARGET%... %DATE% %TIME%

:: Change directory
cd /D %DIRECTORY% || EXIT /B 1

:: Ensure correct branch is checked out
FOR /F "tokens=*" %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET branch=%%i
IF NOT "%branch%"=="%BRANCH%" (
    ECHO Switching to %BRANCH% branch...
    git checkout %BRANCH% || EXIT /B 1
)

