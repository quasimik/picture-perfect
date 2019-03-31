import 'whatwg-fetch';

const server = "http://0b946ad8.ngrok.io/";

class Data {

  new_game = () => {
    return fetch(server + 'game/create/')
    .then((response) => {
      console.log("new_game", response);
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  join_game = (invite) => {
    return fetch(server + 'game/join/' + invite + '/')
    .then((response) => {
      console.log("join_game", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  game_status = (game_id) => {
    return fetch(server + 'game/' + game_id + '/')
    .then((response) => {
      console.log("game_status", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  game_status_invite = (invite) => {
    return fetch(server + 'game/get/' + invite + '/')
    .then((response) => {
      console.log("game_status", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  create_team = (game_id) => {
    return fetch(server + 'game/' + game_id + '/create_team/')
    .then((response) => {
      console.log("create_team", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  change_target = (game_id, target) => {
    return fetch(server + 'game/' + game_id + '/change_target/' + target + '/')
    .then((response) => {
      console.log("change_target", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  team_status = (team_id) => {
    return fetch(server + 'team/' + team_id + '/')
    .then((response) => {
      console.log("team_status", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  player_status = (player_id) => {
    return fetch(server + 'player/' + player_id + '/')
    .then((response) => {
      // console.log("player_status", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  switch_team = (player_id, team_id) => {
    return fetch(server + 'player/' + player_id + '/switch_team/' + team_id + '/')
    .then((response) => {
      console.log("switch_team", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  change_name = (player_id, name) => {
    return fetch(server + 'player/' + player_id + '/change_name/' + name + '/')
    .then((response) => {
      console.log("change_name", response)
      return response.json()
    })
    .catch((e) => {
      console.error(e);
    });
  }

  update_word = (player_id, word, add) => {
    var word_add = add? "add":"sub";
    return fetch(server + 'player/' + player_id + '/update_word/' + word + '/' + word_add + '/')
    .then((response) => {
      console.log("update_word", response)
    })
    .catch((e) => {
      console.error(e);
    });
  }

  start_game = (game_id) => {
    return fetch(server + 'game/' + game_id + '/start/')
    .then((response) => {
      console.log("start_game", response)
    })
    .catch((e) => {
      console.error(e);
    });
  }

  end_game = (game_id) => {
    return fetch(server + 'game/' + game_id + '/end/')
    .then((response) => {
      console.log("end_game", response)
    })
    .catch((e) => {
      console.error(e);
    });
  }

}

var db = new Data();
export default db;