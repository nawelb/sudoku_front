# Sudoku

This project is composed of two repositories. 

This repository is front part, developed using Angular 9.
The back part was developed using spring boot [cf git repository]. 
There is no database in this project.
[Dosuku API] was used to create new games. 

The player creates a new game, can verify his grid during his game, and get his grid's solution. 


### Installation

Sudoku_Front requires Angular 9


```sh
$ git clone https://github.com/nawelb/sudoku_front.git
$ cd sudoku_front
```
Import the project in your favorite IDE.

Add environnement variable in this environmnent file : 

- environments > environment.ts :
    - `baseUrl` : as as url of your Spring Sudoku_Back microservice running locally [cf Sudoku_Back] (ex : "http://localhost:7000/")


## Run
In the root directory, for a dev server, run: 
```sh
$ ng serve -o
```
Finaly, Navigate to `http://localhost:4200/`, The app will automatically reload if you change any of the source files.






[cf Sudoku_Back]:<https://github.com/nawelb/sudoku_back>
[Dosuku API]:<https://sudoku-api.vercel.app/>
[cf git repository]:<https://github.com/nawelb/sudoku_back>