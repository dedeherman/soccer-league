const API_KEY = "24d0c850057c47a581dd5aecacd31571";
const BASE_URL = "https://api.football-data.org/v2/";

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/`;
const ENDPOINT_TEAM = `${BASE_URL}teams/`;

const fetchAPI = url => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings(LEAGUE_ID) {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION + LEAGUE_ID + '/standings').then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION + LEAGUE_ID + '/standings')
        .then(data => {
            console.log(data);
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("body-content");

    data.standings[0].table.forEach(function(standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                   <td><a href="team.html?id=${standing.team.id}">${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

    standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTeamById(idTeam) {

    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(ENDPOINT_TEAM + idTeam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        showTeamById(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(ENDPOINT_TEAM + idTeam)
            .then(data => {
                // console.log(data);
                showTeamById(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    });

}

function showTeamById(data) {
    // console.log(data);
    let teamHtml = "";
    let squadHtml = "";
    let squadTable = '';
    let teamElement = document.getElementById("body-content");

    teamHtml = `
    
        <div class="col l4 s12">
          <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://') || 'icon.png'}" alt="${'logo ' + data.name || 'logo klub'} width="200">
        </div>
        <div class="col l7 s12">
          <ul class="collection">
            <li class="collection-item">
              <span class="">Nama Team : </span>
              <span>${data.name || 'nama team'}</span>
            </li>
            <li class="collection-item">
              <span>Short Name : </span>
              <span>${data.shortName || 'shortName team'} </span>
            </li>
            <li class="collection-item">
              <span>Didirikan : </span>
              <span>${data.founded || 'Tahun Berdiri'} </span>
            </li>
            <li class="collection-item">
              <span>Stadion : </span>
              <span>${data.venue || 'Nama Stadion'} </span>
            </li>
            <li class="collection-item">
              <span>Alamat : </span>
              <span>${data.address || 'Alamat'} </span>
            </li>
  
          </ul>
        </div>
    
    `;

    data.squad.forEach(player => {
        squadHtml += `
      <tr>
          <td>${player.name || 'Nama'}</td>
          <td>${player.position || 'Posisi'}</td>
          <td>${player.nationality || 'Kewarganegaraan'}</td>
      </tr>
  `;
    })

    teamElement.innerHTML = `
    <div class="row team-container"> ${teamHtml} </div>
  
    <div class="row squad-container">
      <table class="striped responsive-table">
        <thead>
            <tr>
                <th>Nama</th>
                <th>Posisi</th>
                <th>Kewarganegaraan</th>
            </tr>
          </thead>
        <tbody id="squad">
            ${squadHtml}
        </tbody>
    </table>
    </div>
    `;
}