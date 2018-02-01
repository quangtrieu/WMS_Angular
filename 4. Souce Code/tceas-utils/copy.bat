@echo off
set "c_path=%cd%"
for %%a in ("%c_path%") do set "p_dir=%%~dpa"

set "appoinment-service=%p_dir%appoinment-service\node_modules\tceas-utils"
if not exist "%appoinment-service%" mkdir "%appoinment-service%"
robocopy "%c_path%" "%appoinment-service%" /MIR  /XD "%c_path%\node_modules"
echo copied to %appoinment-service%

set "job-service=%p_dir%job-service\node_modules\tceas-utils"
if not exist "%job-service%" mkdir "%job-service%"
robocopy "%c_path%" "%job-service%" /MIR  /XD "%c_path%\node_modules"
echo copied to %job-service%

set "masterData-service=%p_dir%masterData-service\node_modules\tceas-utils"
if not exist "%masterData-service%" mkdir "%masterData-service%"
robocopy "%c_path%" "%masterData-service%" /MIR  /XD "%c_path%\node_modules"
echo copied to %masterData-service%

set "part-service=%p_dir%part-service\node_modules\tceas-utils"
if not exist "%part-service%" mkdir "%part-service%"
robocopy "%c_path%" "%part-service%" /MIR  /XD "%c_path%\node_modules"
echo copied to %part-service%

set "repairOrder-service=%p_dir%repairOrder-service\node_modules\tceas-utils"
if not exist "%repairOrder-service%" mkdir "%repairOrder-service%"
robocopy "%c_path%" "%repairOrder-service%" /MIR  /XD "%c_path%\node_modules"
echo copied to %repairOrder-service%

set "servicePackage-service=%p_dir%servicePackage-service\node_modules\tceas-utils"
if not exist "%servicePackage-service%" mkdir "%servicePackage-service%"
robocopy "%c_path%" "%servicePackage-service%" /MIR  /XD "%c_path%\node_modules"
echo copied to %servicePackage-service%

@pause