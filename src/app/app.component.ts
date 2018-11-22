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
      //missing validations that are not empty or that do not repeat equipment
      this.teams.push(this.model);
      this.model = {};
      this.closeAlert();
      this.msg = "Team added";
    } else {
      //error exceeds maximum amount
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
    for (let p: number = 0; p < this.teams.length; p++) {
      this.clicked[p] = false;
    }
    this.selForDelete = i;
    this.clicked[i] = true;
  }

  Generate(): void {
    let sizeTeams = this.teams.length;
    this.matches = [];
    this.Rounds = [];
    if (sizeTeams % 2 != 0) {
      //odd amount
      this.closeAlert();
      this.msgerr = "Error: the amount of equipment is odd";
    } else {
      let countRound: number = sizeTeams - 1;
      let countMatches: number = (sizeTeams * countRound) / 2;
      let countMatchForRound: number = countMatches / countRound;
      let modIf = sizeTeams / 2;
      let reveseindex = sizeTeams - 2;
      for (let i: number = 0; i < countMatches; i++) {
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
      //sort in a array for display
      let countMatchesForPrint: number = 0;
      let auxMatch = [];
      for (let i: number = 0; i < countRound; i++) {
        let auxMatchsRound = [];
        for (let j: number = 0; j < countMatchForRound; j++) {
          if (i == 0) {
            //the first round is saved separately and then put at the end
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
