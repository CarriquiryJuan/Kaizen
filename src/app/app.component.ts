import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string = "Generator of groups";
  teams = [];
  matchesLocal = [];
  matches = [];
  matchesVisitante = [];
  msg: string = "";
  msgerr: string = "";
  selForDelete: number = -1;
  clicked: boolean[] = [];

  Rounds = [];

  model: any = {};

  addTeam(): void {
    if (this.teams.length < 20) {
      //faltan validaciones de que no sea vacio o que no repita equipos
      this.teams.push(this.model);
      this.model = {};
      this.closeAlert();
      this.msg = "Team added";
    } else {
      //error supera cantidad maxima
      this.closeAlert();
      this.msgerr = "Error: exceeds maximum amount";
      this.model = {};
    }
  }

  deleteTeam(): void {
    if (this.selForDelete >= 0) {
      this.teams.splice(this.selForDelete, 1);
      this.clicked[this.selForDelete] = false;
      this.selForDelete = -1;
    } else {
      this.closeAlert();
      this.msgerr = "Error: not selected for delete";
    }
  }

  selectedForDelete(i): void {
    for (var p: number = 0; p < this.teams.length; p++) {
      this.clicked[p] = false;
    }
    this.selForDelete = i;
    this.clicked[i] = true;
  }

  Generate(): void {
    var sizeTeams = this.teams.length;
    this.matches = [];
    if (sizeTeams % 2 != 0) {
      //cantidad impar
      this.closeAlert();
      this.msgerr = "Error: the amount of equipment is odd";
    } else {
      var countRound: number = sizeTeams - 1;
      var countMatches: number = (sizeTeams * countRound) / 2;
      var countMatchForRound: number = countMatches / countRound;
      var modIf = sizeTeams / 2;
      var reveseindex = sizeTeams - 2;
      for (var i: number = 0; i < countMatches; i++) {
        if (i % modIf == 0) {
          if (i % 2 == 0) {
            this.matches[i] = {
              local: this.teams[i % (sizeTeams - 1)],
              visitor: this.teams[sizeTeams - 1],
              round: "0"
            };
          } else {
            this.matches[i] = {
              local: this.teams[sizeTeams - 1],
              visitor: this.teams[i % (sizeTeams - 1)],
              round: "0"
            };
          }
        } else {
          this.matches[i] = {
            local: this.teams[i % (sizeTeams - 1)],
            visitor: this.teams[reveseindex],
            round: "0"
          };
          reveseindex--;
          if (reveseindex < 0) {
            reveseindex = sizeTeams - 2;
          }
        }
      }
      //Acomodo en un arreglo para mostrar
      var countMatchesForPrint: number = 0;
      var auxMatch = [];
      for (var i: number = 0; i < countRound; i++) {
        var auxMatchsRound = [];
        for (var j: number = 0; j < countMatchForRound; j++) {
          if (i == 0) {
            // La primer fecha se gurda aparte para luego poner al final
            this.matches[countMatchesForPrint].round = countRound;
            auxMatch[j] = this.matches[countMatchesForPrint];
            this.matches.splice(0, 1);
          } else {
            this.matches[countMatchesForPrint].round = i;
            auxMatchsRound[j] = this.matches[countMatchesForPrint];
            countMatchesForPrint++;
          }
        }
        this.Rounds.push(auxMatchsRound);
      }
      this.Rounds.push(auxMatch);
      this.Rounds.splice(0, 1);
    }
  }

  closeAlert(): void {
    this.msg = "";
    this.msgerr = "";
  }
}
