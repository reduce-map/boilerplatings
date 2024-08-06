@echo off
setlocal enabledelayedexpansion

rem Current paths to the build and source folders
::set "root_dir=%CD%\build"
::set "source_dir=%CD%\source"
set "root_dir=%1"
set "source_dir=%2"

cd "!root_dir!"
rem Remove files inside build (root_dir)
for %%F in ("*.js") do (
    set "fileName=%%~nF"
    if not exist "!source_dir!\!fileName!.*" (
        del "!root_dir!\!fileName!.*"
        echo Remove file "!root_dir!\!fileName!.*"
    )
)
cd ..

rem A loop that will go through all folders and subfolders in the build folder
for /d /r "%root_dir%" %%i in (*) do (
    set "folder=%%i"
    set "found_build="
    set "desired_path="

    rem We get folders that are already inside the build folder
    for %%j in ("!folder:\=" "!") do (
        if not defined found_build (
            if "%%~j"=="build" (
                set "found_build=1"
            )
        ) else (
            set "desired_path=!desired_path!%%~j\"
        )
    )

    if defined desired_path (
        rem check the existence of the cut path "desired_path" 
        rem inside the source folder
        rem if such a path does not exist in source, then in build you need to delete this folder
        if exist "!source_dir!\!desired_path!" (
            cd "!root_dir!\!desired_path!"
            rem remove all non-existent files from build that are no longer in source
            for %%F in ("*.js") do (
                set "fileName=%%~nF"
                if not exist "!source_dir!\!desired_path!!fileName!.*" (
                    del "!root_dir!\!desired_path!!fileName!.*"
                    echo Remove file "!root_dir!\!desired_path!!fileName!.*"
                )
            )
        ) 
        if not exist "!source_dir!\!desired_path!" (
            rmdir /s /q "!root_dir!\!desired_path!"
            echo Remove folder: "!root_dir!\!desired_path!"
        )
    )
)
endlocal


