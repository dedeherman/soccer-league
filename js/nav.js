<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
=======
document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
<<<<<<< HEAD
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

=======
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });

            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
<<<<<<< HEAD
    var page = window.location.hash.substr(1);
    if (page == "") page = "liga-inggris";
=======

    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
<<<<<<< HEAD
        xhttp.onreadystatechange = function() {
=======
        xhttp.onreadystatechange = function () {
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                content.innerHTML = xhttp.responseText;
                if (this.status == 200) {
<<<<<<< HEAD
                    if (page === 'liga-inggris') {
                        // id liga inggris = 2021
                        getAllStandings(2021);
                    }
                    if (page === 'liga-italia') {
                        // id liga italy = 2019
                        getAllStandings(2019);
                    }
                    if (page === 'liga-spanyol') {
                        // id liga spanyol = 2014
                        getAllStandings(2014);
                    }
                    if (page === 'favorite') {
                        getAllTeams();
                    }
=======
                    if (page === 'home') {
                        getAllStandings();
                    } else if (page === 'match') {
                        getAllMatches();
                    }


>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

});