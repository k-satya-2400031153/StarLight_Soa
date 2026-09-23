@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script for oauthfunction1
@REM ----------------------------------------------------------------------------
@echo off

set "MAVEN_WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"
set "MAVEN_PROJECTBASEDIR=%~dp0."

set "JAVA_EXEC=java"
if defined JAVA_HOME set "JAVA_EXEC=%JAVA_HOME%\bin\java"

if not exist "%MAVEN_WRAPPER_JAR%" (
    echo Downloading Maven Wrapper...
    powershell -Command "& { Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar' -OutFile '%MAVEN_WRAPPER_JAR%' }"
)

"%JAVA_EXEC%" -classpath "%MAVEN_WRAPPER_JAR%" "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" %WRAPPER_LAUNCHER% %*
