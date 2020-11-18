var dbPromised = idb.open("database_epl", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite_team")) {
        const indexFavTeam = upgradeDb.createObjectStore("favorite_team", {
            keyPath: "id"
        });
        indexFavTeam.createIndex("name", "name", {
            unique: false
        });
    }
});

function getAllTeams() {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("favorite_team", "readonly");
            var store = tx.objectStore("favorite_team");
            return store.getAll();
        })
        .then(function(teams) {
            // console.log(teams)
            getAllFavoriteTeams(teams);
        });
}

function getAllFavoriteTeams(teams) {
    let listTeamHtml = ``;
    teams.forEach(team => {
        listTeamHtml += `
		<li class="collection-item"><div>${team.name}<a href="./team.html?id=${team.id}" class="secondary-content"><i class="material-icons">preview</i></a></div></li>
		`;
    });
    let favHtml = ``;
    favHtml += `
	<ul class="collection with-header">
		<li class="collection-header"><h4>Team Favorite</h4></li>
		${listTeamHtml}
	</ul>
	`;
    document.getElementById('body-content').innerHTML = favHtml;
}

function saveTeam(team) {

    dbPromised
        .then(function(db) {
            var tx = db.transaction("favorite_team", "readwrite");
            var store = tx.objectStore("favorite_team");
            store.put(team);
            return tx.complete;
        })
        .then(function() {
            console.log("Data Berhasil disimpan");
        });
}

function getDbById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("favorite_team", "readonly");
                var store = tx.objectStore("favorite_team");
                return store.get(id);
            })
            .then(function(team) {
                resolve(team);
            });
    });
}

function deleteTeam(id) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("favorite_team", "readwrite");
            var store = tx.objectStore("favorite_team");
            store.delete(id)
            return tx.complete;
        })
        .then(function() {
            console.log('Team berhasil dihapus');
        });
}