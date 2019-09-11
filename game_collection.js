getGames(
    queryTitle: string = "",
    maxPlayers: number,
    category: string[] = [],
    mechanics: string[] = [],
    playtime: number
  ) {
    return this.load().pipe(
      map((data: any) => {
        const games = data.games;

        queryTitle = queryTitle.toLowerCase().replace(/,|\.|-/g,
      " ");
        const queryWords = queryTitle.split(" ").filter(w => !!w.trim().length);
        games.forEach((game: any) => {
          game.hide = true;

          let matchesQueryText = false;
          if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach((queryWord: string) => {
              if (game.title.toLowerCase().indexOf(queryWord) > -1) {
                matchesQueryText = true;
               }
            });
         } else {
            // if there are no query words then this session passes the query test
            matchesQueryText = true;
         }

          let matchesPlayers = false;
          if (maxPlayers !== 0) {
            if (game.maxplayers >= maxPlayers) {
              matchesPlayers = true;
            }
         } else {
            matchesPlayers = true;
         }

          let matchesPlaytime = false;
          if (playtime !== 0) {
            if (game.playtime <= playtime) {
              matchesPlaytime = true;
            }
         } else {
            matchesPlaytime = true;
         }

          let matchesMechanics = false;
          if (mechanics.length) {
            game.mechanics.forEach((mechanic: string) => {
              if (mechanics.indexOf(mechanic) === -1) {
                matchesMechanics = true;
               }
            });
         } else {
            matchesMechanics = true;
         }

          let matchesCategory = false;
          if (category.length) {
            game.category.forEach((category: string) => {
              if (category.indexOf(category) === -1) {
                matchesCategory = true;
               }
            });
         } else {
            matchesCategory = true;
         }
          game.hide = !(
            matchesCategory &&
            matchesMechanics &&
            matchesPlayers &&
            matchesPlaytime &&
            matchesQueryText
          );
      });
        return games.filter(game => game.hide === false);
   })
    );
}

  getGame(id) {
    return this.load().pipe(
      map((data: any) => {
        return data.games.filter(game => game.id === id)[
         0
      ];
   })
    );
}