import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
  ActionSheetController,
  AlertController,
  IonList,
  LoadingController,
  ModalController,
  ToastController
} from "@ionic/angular";
import { GamesFilterComponent } from "../games-filter/games-filter.component";
import { GameData } from "../../services/games/game-data";
import { AuthService } from "../../services/user/auth.service";

@Component({
  selector: "games",
  templateUrl: "./games.page.html",
  styleUrls: ["./games.page.scss"],
  providers: [GameData]
})
export class GamesPage implements OnInit {
  @ViewChild("gameList", { static: true }) gameList: IonList;

  loading: any;
  fetchedGames: any[] = [];
  games: any[] = [];
  filterOptions: any = {
    queryTitle: "",
    maxPlayers: 0,
    categories: [
      { value: "Abstract Strategy", isChecked: true },
      { value: "Action / Dexterity", isChecked: true },
      { value: "Adventure", isChecked: true },
      { value: "Age of Reason", isChecked: true },
      { value: "American Civil War", isChecked: true },
      { value: "American Indian Wars", isChecked: true },
      { value: "American Revolutionary War", isChecked: true },
      { value: "American West", isChecked: true },
      { value: "Ancient", isChecked: true },
      { value: "Animals", isChecked: true },
      { value: "Arabian", isChecked: true },
      { value: "Aviation / Flight", isChecked: true },
      { value: "Bluffing", isChecked: true },
      { value: "Book", isChecked: true },
      { value: "Card Game", isChecked: true },
      { value: "Children's Game", isChecked: true },
      { value: "City Building", isChecked: true },
      { value: "Civil War", isChecked: true },
      { value: "Civilization", isChecked: true },
      { value: "Collectible Components", isChecked: true },
      { value: "Comic Book / Strip", isChecked: true },
      { value: "Deduction", isChecked: true },
      { value: "Dice", isChecked: true },
      { value: "Economic", isChecked: true },
      { value: "Educational", isChecked: true },
      { value: "Electronic", isChecked: true },
      { value: "Environmental", isChecked: true },
      { value: "Expansion for Base-game", isChecked: true },
      { value: "Exploration", isChecked: true },
      { value: "Fan Expansion", isChecked: true },
      { value: "Fantasy", isChecked: true },
      { value: "Farming", isChecked: true },
      { value: "Fighting", isChecked: true },
      { value: "Game System", isChecked: true },
      { value: "Horror", isChecked: true },
      { value: "Humor", isChecked: true },
      { value: "Industry / Manufacturing", isChecked: true },
      { value: "Korean War", isChecked: true },
      { value: "Mafia", isChecked: true },
      { value: "Math", isChecked: true },
      { value: "Mature / Adult", isChecked: true },
      { value: "Maze", isChecked: true },
      { value: "Medical", isChecked: true },
      { value: "Medieval", isChecked: true },
      { value: "Memory", isChecked: true },
      { value: "Miniatures", isChecked: true },
      { value: "Modern Warfare", isChecked: true },
      { value: "Movies / TV / Radio theme", isChecked: true },
      { value: "Murder/Mystery", isChecked: true },
      { value: "Music", isChecked: true },
      { value: "Mythology", isChecked: true },
      { value: "Napoleonic", isChecked: true },
      { value: "Nautical", isChecked: true },
      { value: "Negotiation", isChecked: true },
      { value: "Novel-based", isChecked: true },
      { value: "Number", isChecked: true },
      { value: "Party Game", isChecked: true },
      { value: "Pike and Shot", isChecked: true },
      { value: "Pirates", isChecked: true },
      { value: "Political", isChecked: true },
      { value: "Post-Napoleonic", isChecked: true },
      { value: "Prehistoric", isChecked: true },
      { value: "Print & Play", isChecked: true },
      { value: "Puzzle", isChecked: true },
      { value: "Racing", isChecked: true },
      { value: "Real-time", isChecked: true },
      { value: "Religious", isChecked: true },
      { value: "Renaissance", isChecked: true },
      { value: "Science Fiction", isChecked: true },
      { value: "Space Exploration", isChecked: true },
      { value: "Spies/Secret Agents", isChecked: true },
      { value: "Sports", isChecked: true },
      { value: "Territory Building", isChecked: true },
      { value: "Trains", isChecked: true },
      { value: "Transportation", isChecked: true },
      { value: "Travel", isChecked: true },
      { value: "Trivia", isChecked: true },
      { value: "Video Game Theme", isChecked: true },
      { value: "Vietnam War", isChecked: true },
      { value: "Wargame", isChecked: true },
      { value: "Word Game", isChecked: true },
      { value: "World War I", isChecked: true },
      { value: "World War II", isChecked: true },
      { value: "Zombies", isChecked: true }
    ],
    mechanics: [
      { value: "Acting", isChecked: true },
      { value: "Action / Movement Programming", isChecked: true },
      { value: "Action Point Allowance System", isChecked: true },
      { value: "Area Control / Area Influence", isChecked: true },
      { value: "Area Enclosure", isChecked: true },
      { value: "Area Movement", isChecked: true },
      { value: "Area-Impulse", isChecked: true },
      { value: "Auction/Bidding", isChecked: true },
      { value: "Betting/Wagering", isChecked: true },
      { value: "Campaign / Battle Card Driven", isChecked: true },
      { value: "Card Drafting", isChecked: true },
      { value: "Chit-Pull System", isChecked: true },
      { value: "Commodity Speculation", isChecked: true },
      { value: "Cooperative Play", isChecked: true },
      { value: "Crayon Rail System", isChecked: true },
      { value: "Deck / Pool Building", isChecked: true },
      { value: "Dice Rolling", isChecked: true },
      { value: "Grid Movement", isChecked: true },
      { value: "Hand Management", isChecked: true },
      { value: "Hex-and-Counter", isChecked: true },
      { value: "Hidden Traitor", isChecked: true },
      { value: "Line Drawing", isChecked: true },
      { value: "Memory", isChecked: true },
      { value: "Modular Board", isChecked: true },
      { value: "Paper-and-Pencil", isChecked: true },
      { value: "Partnerships", isChecked: true },
      { value: "Pattern Building", isChecked: true },
      { value: "Pattern Recognition", isChecked: true },
      { value: "Pick-up and Deliver", isChecked: true },
      { value: "Player Elimination", isChecked: true },
      { value: "Point to Point Movement", isChecked: true },
      { value: "Press Your Luck", isChecked: true },
      { value: "Rock-Paper-Scissors", isChecked: true },
      { value: "Role Playing", isChecked: true },
      { value: "Roll / Spin and Move", isChecked: true },
      { value: "Rondel", isChecked: true },
      { value: "Route/Network Building", isChecked: true },
      { value: "Secret Unit Deployment", isChecked: true },
      { value: "Set Collection", isChecked: true },
      { value: "Simulation", isChecked: true },
      { value: "Simultaneous Action Selection", isChecked: true },
      { value: "Singing", isChecked: true },
      { value: "Stock Holding", isChecked: true },
      { value: "Storytelling", isChecked: true },
      { value: "STR 01 - Competitive Games", isChecked: true },
      { value: "Take That", isChecked: true },
      { value: "Tile Placement", isChecked: true },
      { value: "Time Track", isChecked: true },
      { value: "Trading", isChecked: true },
      { value: "Trick-taking", isChecked: true },
      { value: "Variable Phase Order", isChecked: true },
      { value: "Variable Player Powers", isChecked: true },
      { value: "Voting", isChecked: true },
      { value: "Worker Placement", isChecked: true }
    ],
    playtime: 900,
    type: [
      { value: "boardgame", isChecked: true },
      { value: "boardgameexpansion", isChecked: true }
    ]
  };

  constructor(
    private confData: GameData,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.updateGames();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: "crescent",
      cssClass: "loading"
    });
    await this.loading.present();
  }

  updateGames() {
    const bggnames = this.route.snapshot.paramMap.get("bggNames");
    this.presentLoading();
    this.confData.loadFromAPI(bggnames).subscribe(result => {
      this.loading.dismiss();
      this.fetchedGames = result;
      this.games = result;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: GamesFilterComponent,
      componentProps: {
        filterOptions: this.filterOptions,
        games: this.fetchedGames
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.filterOptions = data.filters;
      this.games = data.games;
    }
  }
}
