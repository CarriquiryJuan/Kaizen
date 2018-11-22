import { Component } from '@angular/core';
import { zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Generator of groups';
  teams= [
    { "name":"Peñarol"},    
    { "name":"Nacional"},    
    { "name":"Racing"},    
    { "name":"Danubio"},    
    { "name":"River"},    
    { "name":"Defensor"},    
    { "name":"Cerro"},    
    { "name":"Liverpool"}
  ];
  matchesLocal = []; 
  matches = []; 
  matchesVisitante = []; 
  msg:string="";
  msgerr:string="";
  hideGenerate:boolean=true;
  selForDelete:number  =-1 ;

  model:any ={};


  addTeam():void{
    //ver que no sea vacio
    if (this.teams.length <20){
      //si no estoy en el maximo
      // ver que no sea vacio
      
      //ver que no este 
      
     // noEsta:Boolean ={false};
      //if(noEsta){

        this.teams.push(this.model);
        this.model ={};
        this.closeAlert();
        this.msg = "Team added";
      //]else{
        //Error
      //};
      if(this.teams.length ==4){
        //mostar boton generar
        this.hideGenerate=false;
        
      };
    }else{
      //error supera cantidad maxima
      this.closeAlert();
      this.msgerr = "Error: exceeds maximum amount";
      this.model ={};
    };
  }
  
  deleteTeam():void{
    console.log(this.selForDelete);
    console.log("Voy a borrar "+this.selForDelete);
    if (this.selForDelete>=0){
    this.teams.splice(this.selForDelete,1);
    this.selForDelete = -1;
    if (this.teams.length<4){
      this.hideGenerate=true;
    }
  }else{
    this.closeAlert();
    this.msgerr = "Error: not selected for delete";
  }
  }

  selectedForDelete(i):void{

    this.selForDelete = i;
    console.log("Voy a marcar "+i);
   
    //ver como pintar la linea seleccionada
  }

  Generate():void{
    var sizeTeams = this.teams.length;
    this.matches = [];
    if ((sizeTeams % 2)!=0){
      //cantidad impar 
      this.closeAlert();
      this.msgerr = "Error: the amount of equipment is odd";
    }else{
      var countRound:number = sizeTeams-1;
      var countMatches:number= sizeTeams*(countRound)/2 ;
      var countMatchForRound:number= countMatches/countRound;
      var modIf = (sizeTeams/2);
      var reveseindex = sizeTeams-2;
      for (var i:number=0 ; i<countMatches;i++){
        if ((i%modIf)==0){
          if ((i%2)==0){
            this.matches[i]={"local":this.teams[i%(sizeTeams-1)],"visitor":this.teams[sizeTeams-1],"round":"0"}
          }else{
            this.matches[i]={"local":this.teams[sizeTeams-1],"visitor":this.teams[i%(sizeTeams-1)],"round":"0"}
          }
        }else{
          this.matches[i]={"local":this.teams[i%(sizeTeams-1)],"visitor":this.teams[reveseindex] ,"round":"0"}
          reveseindex--;
          if (reveseindex<0){
            reveseindex = sizeTeams-2
          }
        }
      }
      var countMatchesForPrint:number = 0;
      for (var i:number=0 ; i<countRound;i++){
        console.log("Ronda: "+i);
        for (var j:number =0 ; j<countMatchForRound;j++){
          this.matches[countMatchesForPrint].round = i;
          console.log(this.matches[countMatchesForPrint].local.name +" vs "+this.matches[countMatchesForPrint].visitor.name);
          countMatchesForPrint++;
        }
      }
    }

  }

  closeAlert():void {
    this.msg = '';
    this.msgerr = '';
  }
}
