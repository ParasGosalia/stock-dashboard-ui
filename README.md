Stocks Dashboard UI Application

1) Introduction:
   
   i)This is a Spring Boot application which is just used to wrap the Angular application and provide a container to load the static files transpiled by typescript
   Below mentioned are details regarding the Angular application with Spring Boot build approach. 
   
   ii) The reason for using this approach is there would be no need to install nodejs and npm globally in your system to
   run this Angular application. 
   
   iii) I have used **frontend-maven-plugin** which will first install nodejs and npm locally in your application folder, then it will build the Angular code and generate the output in dist folder.
   
   iv) Once all the static files are generated into dist folder, **maven-resources-plugin** copies all the static files under target classes/static folder so that it would get wrapped into jar with the maven build .
   
   v)I have also added a configuration which will add all the static files in classpath so that Spring boot can load the index.html when the URL is hit.
   

2) Project Structure : 
   
    There are 4 folders created under src/app folder in Spring application to make a modular code structure.

     i) Core Folder : This Module contains all the core components of the application like Services and Header Components.
     
     ii) Helper : This Module contains the authentication helper files like authGuard and errorInterceptor.
   
     iii) Models : Contains data model files
   
     iv) Modules : This folder contains all the functional components like Dashboard Component, Login Component. 

   
3) Components/Services
   
     a) This application has one Business,one authentication and Header Component.

        i) Dashboard :This Component provides a data grid to display the stocks. It consumes REST Endpoint to retrieve/store data from/to H2 Database.

        ii) Login : This Component provides an authentication mechanism and only valid user can view the Stocks Dashboard.

        iii) Header : This Component displays the username and a button to logout from the application

    b) This application has 2 main Service Components : LoginService and DashboardService

       i) Dashboard Service : This service components provides http service calls to fetch/store the stock data stored in H2 Database

       ii) User Data Service: This Service Component provides http service calls to authenticate user and retrieve the JWT Token.
   
    c) Application has one routing module to navigate user from one component to another.
   

4) Steps to configure and run the application

   i) Pre-requisites : You should have Java 8, Git Bash and above version and Maven 3.X installed in your system to run the application.

   ii) You can use git command to clone the application from the below mentioned link or download the ZIP.
   https://github.com/ParasGosalia/stock-dashboard-ui.git

   iii) Please follow below mentioned commands:

       a) Got to a folder where you want to clone the app and Open git bash there. 
          Now run the following commands
          git clone https://github.com/ParasGosalia/stock-dashboard-ui.git
          cd stock-dashboard-ui
          git checkout master
          git checkout feature/version-1.0.0

       b) For this application you would need to run the below command in command prompt to run the application directly or build the jar and run the jar:
          When you will build or run the project with the below command for the first time it will take more time as it will setup nodejs and node_modules folder locally in the application folder.
          mvn spring-boot:run
    
       c) Once the application is up and running. Please hit the below mentioned URL and enter username and password
          http://localhost:8080
          username : admin
          password: password
         
          username: user
          password : password
      
       d) I have created 2 roles at the backend, user and admin. User would just be able to view all the stocks and search stock by Id
          but admin would be able to perform all the operations like view all stocks, Add a stock and Search stock
