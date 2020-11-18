// buat variable untuk mengembalikan promise 
var dbPromised = idb.open("database_epl", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite_team")) {
        const indexFavTeam = upgradeDb.createObjectStore("favorite_team", {
            keyPath: "id"
        });
        indexFavTeam.createIndex("name", "name", {
            unique: false
        });
    }
});


// Fungsi untuk menampilkan semua team yang disimpan,
// https://www.dicoding.com/academies/74/tutorials/2920

function getAllTeams() {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("favorite_team", "readonly");
            var store = tx.objectStore("favorite_team");
            return store.getAll();
        })
        .then(function (teams) {
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


// fungsi saveTeam dengan parameter team yang berisi object data team dari api.
// https://www.dicoding.com/academies/74/tutorials/2920
// akan dijalankan pada file team.html
function saveTeam(team) {

    // panggil dbPromised yang udah dibuat diatas kemudian ke then
    dbPromised
        .then(function (db) {
            var tx = db.transaction("favorite_team", "readwrite");
            var store = tx.objectStore("favorite_team");
            // console.log(team);
            // pakai method put untuk save atau update data, jadi saat data sudah ada tidak error
            store.put(team);
            return tx.complete;
        })
        .then(function () {
            console.log("Data Berhasil disimpan");
        });
}

// fungsi untuk baca data yang menrima parameter id tim.
// akan dijalankan pada team.html
function getDbById(id) {
    // kembalikan promise resolve atau reject
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("favorite_team", "readonly");
                var store = tx.objectStore("favorite_team");
                return store.get(id);
            })
            .then(function (team) {
                // kembalikan ke resolve saat sukses
                resolve(team);
            });
    });
}

// fungsi untuk hapus team berdasarkan id
// https://www.dicoding.com/academies/74/tutorials/2910
function deleteTeam(id) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("favorite_team", "readwrite");
            var store = tx.objectStore("favorite_team");
            store.delete(id)
            return tx.complete;
        })
        .then(function () {
            console.log('Team berhasil dihapus');
        });
}