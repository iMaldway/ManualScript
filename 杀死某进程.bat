@ echo off

:: 提升权限
PUSHD %~DP0 & cd /d "%~dp0"
%1 %2
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :runas","","runas",1)(window.close)&goto :eof
:runas

:: 杀死相关进程
taskkill /f /t /im LeagueClient.exe