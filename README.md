# Comp 3000 Project 
## Tri & Spencer
### README.MD

Files folders included: inside 3000-master (front-end, back-end,minix-web-service.war(Located in back-end file folder))

Needed to run: Apache Tomcat v8.5 works
A VM with working SSH server 

How to setup: 

Back-End-setup
Start by downloading Apache Tomcat and during the installation instructions set
a username and password for example User:Admin Password:Password / this will let you setup the
server later - after that continue on with the installation of Tomcat 
When Tomcat is installed go to the show hidden icons bar in the bottom right of your computer
and right click on Apache Tomcat - Then hit start service - After the server has started 
Proceed to ```localhost:8080/manager```  - this will prompt you for your username and password
(IF USERNAME AND PASSWORD DONT WORK PROCEED TO BOTTOM OF READ ME FOR TROUBLESHOOTING)-
When you log in you will be greeted with an html page in the middle of the screen there should
be a deploy heading- go to the WAR file to deploy then choose your WAR file (come back to where
it will be located) - once you have deployed the WAR file your backend server is ready to go

Front-End-Setup
Install Node.Js
Locate your front-end folder in command line- Go inside - then ```npm install``` - once that 
is complete install angular using -``` npm istall -g @angular-cli ```
to run-``` ng s -o```

To Run: Make sure your server is running like in Back-End_Setup , make sure angular is running
as well as have your ssh virtual machine booted up then proceed to the localhost that angular 
opened enter your login and ssh information and you should boot in



TROUBLESHOOTING- If your username and password does not work you need to manualy chnage the username
password - ```C:\Program Files\Apache Software Foundation\``` go to this adress -
might be in Program files X86 or whatever directory you installed it in

Right click on Tomcat 8.5 - Select Properties - Then securities - Scroll to users in the scroll
bar - then click and select edit and give yourself write privlages.

Then go to ```C:\Program Files\Apache Software Foundation\Tomcat 8.5\conf``` and edit 
tomcat-users in your editer of choice and paste these lines down at the bottom of the page
   ```
  <role rolename="tomcat"/>
  <role rolename="role1"/>
  <role rolename="manager"/>
  <role rolename="manager-script"/>
  <role rolename="manager-gui"/>
  <user password="password" roles="tomcat" username="tomcat"/>
  <user password="password" roles="tomcat,role1" username="both"/>
  <user password="password" roles="role1" username="role1"/>
  <user password="password" roles="manager-gui,manager-script,tomcat,role1" username="admin"/> 
  ```
 
  This will grant you access to enter Username: admin Password: password
