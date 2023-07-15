import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrilleSudokuComponent } from './grille-sudoku/grille-sudoku.component';


const routes: Routes = [
    {path : "" , component: GrilleSudokuComponent}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule { }
