@ echo off

:: ����Ȩ��
PUSHD %~DP0 & cd /d "%~dp0"
%1 %2
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :runas","","runas",1)(window.close)&goto :eof
:runas

:: ����Ӣ�����˿ͻ���
start "" "E:\WeGameApps\Ӣ������\TCLS\Client.exe"

:: ��ʱ90������ִ��
choice /t 90 /d y /n > nul 

:inspect
cls
:: ����lol�ͻ���
tasklist /fi "imagename eq LeagueClient.exe"
:: ������������ִ�н��������ز���
if  %errorlevel%==0 (
	:: ɱ����ؽ���
	taskkill /f /t /im FeedBack.exe
	taskkill /f /t /im CrossProxy.exe
	taskkill /f /t /im XY_YXQ_Nethelper.exe
	taskkill /f /t /im yxqxunyou.exe
	echo  ��ɱ��FeedBack.exe��CrossProxy.exe����!	
)  

exit

