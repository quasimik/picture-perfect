import fetch from 'whatwg-fetch';

const server = "https://picture-perfect-lahax19.appspot.com/";

class Data {

  new_game = () => {
    fetch(server + 'game/create/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  game_status = (game_id) => {
    fetch(server + 'game/' + game_id + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  create_team = (game_id) => {
    fetch(server + 'game/' + game_id + '/create_team/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  change_target = (game_id, target) => {
    fetch(server + 'game/' + game_id + '/change_target/' + target + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  team_status = (team_id) => {
    fetch(server + 'team/' + team_id + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  player_status = (player_id) => {
    fetch(server + 'player/' + player_id + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  switch_team = (player_id, team_id) => {
    fetch(server + 'player/' + player_id + '/switch_team/' + team_id + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  change_name = (player_id, name) => {
    fetch(server + 'player/' + player_id + '/change_name/' + name + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }

  update_word = (player_id, word) => {
    fetch(server + 'player/' + player_id + '/update_word/' + word + '/')
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.error(e);
    });
  }
}

var db = new Data();
export default db;