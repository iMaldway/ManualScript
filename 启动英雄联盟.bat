@ echo off

:: 提升权限
PUSHD %~DP0 & cd /d "%~dp0"
%1 %2
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :runas","","runas",1)(window.close)&goto :eof
:runas

:: 启动英雄联盟客户端
start "" "E:\WeGameApps\英雄联盟\TCLS\Client.exe"

:: 延时90秒后继续执行
choice /t 90 /d y /n > nul 

:inspect
cls
:: 查找lol客户端
tasklist /fi "imagename eq LeagueClient.exe"
:: 根据上条命令执行结果进行相关操作
if  %errorlevel%==0 (
	:: 杀死相关进程
	taskkill /f /t /im FeedBack.exe
	taskkill /f /t /im CrossProxy.exe
	taskkill /f /t /im XY_YXQ_Nethelper.exe
	taskkill /f /t /im yxqxunyou.exe
	echo  已杀死FeedBack.exe跟CrossProxy.exe进程!	
)  

exit

