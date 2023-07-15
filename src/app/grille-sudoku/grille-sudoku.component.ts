import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Grille } from '../models/Grille';
import { Line } from '../models/Line';
import { Case } from '../models/Case';

@Component({
  selector: 'app-grille-sudoku',
  templateUrl: './grille-sudoku.component.html',
  styleUrls: ['./grille-sudoku.component.css']
})
export class GrilleSudokuComponent implements OnInit {
 grille! : Grille;
 solution!:Grille;
 casesGrille!:Case[];
 casesSolution!:Case[];

 index:number=0;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.createNewGame();
  }

  createNewGame(){
    let listeGrille: Grille[]=[];
    this.gameService.createNewGame().subscribe(
      (data)=>{
        listeGrille=data; 
        this.grille=listeGrille[0];
        this.solution=listeGrille[1];
        //console.log("GRILLE"+JSON.stringify(this.grille))
        //console.log("SOLUTION"+ JSON.stringify(this.solution));
      });
      this.casesGrille=this.fillGrids(this.grille);
      console.log("GRILLE"+JSON.stringify(this.casesGrille))
      this.casesSolution=this.fillGrids(this.solution);
      console.log("SOLUTION"+ JSON.stringify(this.casesSolution));

  }

  fillGrids(grid :Grille): Case[]{
    let fillingGrid:Case[]=[];
    for(let i=0; i<9;i++){
      let newLine= grid.line[i];
      for (let j=0; j<9;j++){
        let cases = newLine.cases[j];
        fillingGrid.push(cases);
      }
     }
    return fillingGrid;
  }

  getSolution() {
   this.casesGrille=this.casesSolution;
  }

  verifyGame(listeCases:Case[]):Grille[]{
    let listeGrille :Grille[] =[];
    //newLine:Line
    //listeGrille.push(grille);
    listeGrille.push(this.solution);
    //console.log( "LISTE GRILLES TO VERIFY : "+ listeGrille);
    return listeGrille
  }
  
  recoverDataFromView():Case[]{
    var newCase:Case;
    var listeCase:Case[]=[];
    var value: number = 0;
    var initialyGiven:boolean;
    const elements = document.getElementsByClassName('case-value');
    for (let index = 0; index < elements.length; index++) {
      var div= elements[index].querySelector('div');
      var input= elements[index].querySelector('input');
       if(div!=undefined){
        value=parseInt(div.innerText);
        initialyGiven=true;
      }else if(input?.value=="" ) 
      {
        value=0;
        initialyGiven=false;
      }else{
        if(input!=null){
          value=parseInt(input.value);
        }
        initialyGiven=false;
      }
      newCase= new Case(value, initialyGiven);
      listeCase.push(newCase);
    }
    //console.log("recoverDataFromView listes de cases"+JSON.stringify(listeCase))

    return listeCase;
  }


  createLine(casesListes:Case[]):Line[]{
    let lines:Line[]=[];
    let index=0;
    let lineCases:Case[]=[];
    let newLine:Line;
   
    for(let i=0; i<casesListes.length;i++){
      switch (i) {
        case 8 :
        case 17 :
        case 26 :
        case 35 :
        case 44 :
        case 53 :
        case 62 :
        case 71 :
        case 80 :
          lineCases.push(casesListes[i]);
          newLine= new Line(lineCases);
          lines.push(newLine);
          lineCases=[];
          break;
        default:
          lineCases.push(casesListes[i])       }
          
      /* if(index==9){
        newLine= new Line(lineCases);
        lines.push(newLine);
        index=0;
      }
      else if (index<9){
        lineCases.push(casesListes[i]) 
      }
      index++;*/
    } 
    //console.log("LINES CREATE LINE" +JSON.stringify(lines))
    return lines;
  }
  createGrilleSolution(listeCase: Case[]): Grille{
    let lines = this.createLine(listeCase);
    let grilleSoluton = new Grille(lines);
    return grilleSoluton;
  }

  recreateGridFromView(): Grille[]{
   let cases = this.recoverDataFromView();
   let lines = this.createLine(cases);
   let grille = new Grille(lines);
   let grilles: Grille[]=[];
   grilles.push(grille);
   grilles.push(this.createGrilleSolution(this.casesSolution));
   //console.log("RECREATE GRILLE FROM VIEW" +JSON.stringify(grilles) + "SOLUTION : "+JSON.stringify(this.solution));
   return grilles;
  }

  makeVerification():Case[]{
    let newGrille:Grille;
    let toCheckGrille = this.recreateGridFromView();

    this.gameService.makeVerification(toCheckGrille).subscribe(
       data=>{ newGrille = data; 

        //console.log("APRES VERIF DATA : "+ JSON.stringify(data));
        this.casesGrille=this.fillGrids(newGrille);

        console.log("VERIFIED GRILLE"+JSON.stringify(this.casesGrille));
      }

    );

    //console.log("GRILLE"+JSON.stringify(this.casesGrille))
      //this.casesSolution=this.fillGrids(this.solution);
    //console.log("SOLUTION"+ JSON.stringify(this.casesSolution)); 
    return this.casesGrille;
  }

}
