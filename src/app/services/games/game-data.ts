import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class GameData {
  constructor(public http: HttpClient, private firestore: AngularFirestore) {}

  load(): any {
    return this.firestore.collection("Games").snapshotChanges();
  }

  loadFromAPI(bggNames): any {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http
      .post("http://localhost:8080/getgames", { name: bggNames }, httpOptions)
      .pipe(map(result => result["games"]));
  }

  getGame(gameId) {
    return this.firestore
      .collection("Games", ref => ref.where("id", "==", gameId))
      .valueChanges();
  }

  addGame(game) {
    return this.firestore.collection("Games").add(game);
  }
}
