const API_KEY = "24d0c850057c47a581dd5aecacd31571";
const BASE_URL = "https://api.football-data.org/v2/";
const BASE_URL2 = "https://api.football-data.org/v2/teams/%7Bid_tim%7D";
const LEAGUE_ID = 2021; //Premiere League
const LEAGUE_ID2 = 2000;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_COMPETITION = `${BASE_URL2}competitions/${LEAGUE_ID2}/teams`;

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

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
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
                    <td>${standing.team.name}</td>
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

function getAllMatches() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showMatches(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_MATCH)
        .then(data => {
            // console.log(data);
            showMatches(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showMatches(data) {
    console.log(data);
}