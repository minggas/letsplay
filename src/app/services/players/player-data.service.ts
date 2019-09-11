import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class PlayerDataService {
  players;
  constructor(private firestore: AngularFirestore) {}
  newPlayer(record) {
    const userId = record.id;
    return this.firestore
      .collection("Players")
      .doc(userId)
      .set({ name: record.username });
  }

  getPlayer(playerId) {
    const uid = this.firestore
      .collection("Players")
      .doc(playerId)
      .get();
    return uid;
  }

  readPlayers() {
    this.players = this.firestore
      .collection("Players")
      .snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return this.players;
  }

  updatePlayer(recordID, record) {
    this.firestore.doc("Players/" + recordID).update(record);
  }

  deletePlayer(record_id) {
    this.firestore.doc("Players/" + record_id).delete();
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  };
}
