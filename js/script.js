
// var FILMS = [
//   "ben-hur", "titanic", "return-of-the-king", "west-side-story", "gigi",
//   "last-emperor", "english-patient", "gone-with-the-wind", "slumdog-millionaire"
// ];

// //  маленькие помощники 

// function readStorage(key, fallback) {
//   try {
//     var v = localStorage.getItem(key);
//     return v === null ? fallback : v;
//   } catch (e) {
//     return fallback;
//   }
// }

// function writeStorage(key, value) {
//   try {
//     localStorage.setItem(key, value);
//   } catch (e) {
//     // ничего страшного, просто не сохранится
//   }
// }

// //  тема 

// var themeBtn = document.getElementById("theme-btn");

// function setTheme(name) {
//   document.documentElement.setAttribute("data-theme", name);
//   if (themeBtn) themeBtn.textContent = name === "dark" ? "☀" : "☾";
//   writeStorage("theme", name);
// }

// var savedTheme = readStorage("theme", null);
// if (!savedTheme) {
//   savedTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
// }
// setTheme(savedTheme);

// if (themeBtn) {
//   themeBtn.addEventListener("click", function () {
//     var now = document.documentElement.getAttribute("data-theme");
//     setTheme(now === "dark" ? "light" : "dark");
//   });
// }

// //  меню на телефоне 

// var burger = document.getElementById("burger");
// var nav = document.getElementById("nav");

// if (burger && nav) {
//   burger.addEventListener("click", function () {
//     nav.classList.toggle("open");
//   });
// }

// //  избранное 

// function getFavs() {
//   try {
//     return JSON.parse(readStorage("favs", "[]"));
//   } catch (e) {
//     return [];
//   }
// }

// function saveFavs(list) {
//   writeStorage("favs", JSON.stringify(list));
// }

// function updateFavCount() {
//   var el = document.getElementById("fav-count");
//   if (el) el.textContent = getFavs().length;
// }

// function paintFavButtons() {
//   var favs = getFavs();
//   var buttons = document.querySelectorAll(".fav-btn");
//   for (var i = 0; i < buttons.length; i++) {
//     var slug = buttons[i].getAttribute("data-slug");
//     var isFav = favs.indexOf(slug) !== -1;
//     buttons[i].classList.toggle("on", isFav);
//     buttons[i].textContent = isFav ? "♥" : "♡";
//     if (buttons[i].classList.contains("icon-btn")) {
//       buttons[i].textContent = isFav ? "♥ В избранном" : "♡ В избранное";
//     }
//   }
// }

// document.addEventListener("click", function (e) {
//   var btn = e.target.closest ? e.target.closest(".fav-btn") : null;
//   if (!btn) return;
//   e.preventDefault();
//   var slug = btn.getAttribute("data-slug");
//   var favs = getFavs();
//   var pos = favs.indexOf(slug);
//   if (pos === -1) favs.push(slug);
//   else favs.splice(pos, 1);
//   saveFavs(favs);
//   paintFavButtons();
//   updateFavCount();
//   if (typeof applyFilters === "function") applyFilters();
// });

// paintFavButtons();
// updateFavCount();

// //  главная: поиск и фильтры 

// var searchInput = document.getElementById("search");
// var chipBox = document.getElementById("chips");
// var filmItems = document.querySelectorAll(".film-list li");
// var activeChip = "all";

// function applyFilters() {
//   if (!filmItems.length) return;
//   var q = searchInput ? searchInput.value.trim().toLowerCase() : "";
//   var favs = getFavs();
//   var shown = 0;

//   for (var i = 0; i < filmItems.length; i++) {
//     var li = filmItems[i];
//     var text = li.getAttribute("data-text");
//     var wins = li.getAttribute("data-wins");
//     var slug = li.getAttribute("data-slug");
//     var ok = true;

//     if (q && text.indexOf(q) === -1) ok = false;
//     if (activeChip === "fav" && favs.indexOf(slug) === -1) ok = false;
//     if (activeChip !== "all" && activeChip !== "fav" && wins !== activeChip) ok = false;

//     li.style.display = ok ? "" : "none";
//     if (ok) shown++;
//   }

//   var empty = document.getElementById("empty");
//   if (empty) {
//     empty.style.display = shown ? "none" : "block";
//     empty.textContent = activeChip === "fav" ? "В избранном пока пусто. Нажмите сердечко рядом с фильмом." : "Ничего не нашлось.";
//   }
// }

// if (searchInput) searchInput.addEventListener("input", applyFilters);

// if (chipBox) {
//   chipBox.addEventListener("click", function (e) {
//     var chip = e.target.closest(".chip");
//     if (!chip) return;
//     var all = chipBox.querySelectorAll(".chip");
//     for (var i = 0; i < all.length; i++) all[i].classList.remove("on");
//     chip.classList.add("on");
//     activeChip = chip.getAttribute("data-filter");
//     applyFilters();
//   });

//   // ссылка из шапки ведёт на index.html#favorites
//   if (location.hash === "#favorites") {
//     var favChip = chipBox.querySelector('[data-filter="fav"]');
//     if (favChip) favChip.click();
//   }
// }

// // случайный фильм
// var randomBtn = document.getElementById("random-btn");
// if (randomBtn) {
//   randomBtn.addEventListener("click", function () {
//     var pick = FILMS[Math.floor(Math.random() * FILMS.length)];
//     location.href = pick + ".html";
//   });
// }

// //  сортировка таблицы 

// var sortTable = document.getElementById("sort-table");

// if (sortTable) {
//   var heads = sortTable.querySelectorAll("th.sortable");

//   for (var h = 0; h < heads.length; h++) {
//     heads[h].addEventListener("click", function () {
//       var th = this;
//       var index = Array.prototype.indexOf.call(th.parentNode.children, th);
//       var type = th.getAttribute("data-type");
//       var asc = !th.classList.contains("asc");

//       for (var k = 0; k < heads.length; k++) heads[k].classList.remove("asc", "desc");
//       th.classList.add(asc ? "asc" : "desc");

//       var tbody = sortTable.querySelector("tbody");
//       var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));

//       rows.sort(function (a, b) {
//         var x = a.children[index].getAttribute("data-v");
//         var y = b.children[index].getAttribute("data-v");
//         if (type === "num") {
//           x = parseFloat(x);
//           y = parseFloat(y);
//           return asc ? x - y : y - x;
//         }
//         return asc ? x.localeCompare(y, "ru") : y.localeCompare(x, "ru");
//       });

//       for (var r = 0; r < rows.length; r++) tbody.appendChild(rows[r]);
//     });
//   }
// }

// //  кнопка «наверх» 

// var toTop = document.getElementById("to-top");

// if (toTop) {
//   window.addEventListener("scroll", function () {
//     toTop.classList.toggle("show", window.scrollY > 600);
//   });
//   toTop.addEventListener("click", function () {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });
// }

// // викторина 

// var quizBox = document.getElementById("quiz");

// if (quizBox) {
//   var questions = [
//     {
//       q: "Какой фильм выиграл все 11 номинаций, на которые был выдвинут?",
//       a: ["Бен-Гур", "Титаник", "Властелин колец: Возвращение короля", "Жижи"],
//       right: 2,
//       why: "У «Возвращения короля» было 11 номинаций и 11 побед. «Бен-Гур» и «Титаник» тоже взяли по 11, но номинаций у них было больше."
//     },
//     {
//       q: "Сколько «Оскаров» получил «Бен-Гур» в 1960 году?",
//       a: ["8", "9", "10", "11"],
//       right: 3,
//       why: "Одиннадцать из двенадцати. Проиграл только за адаптированный сценарий."
//     },
//     {
//       q: "Кто стал первой чернокожей обладательницей «Оскара» (за «Унесённых ветром»)?",
//       a: ["Хэтти Макдэниел", "Вивьен Ли", "Рита Морено", "Оливия де Хэвилленд"],
//       right: 0,
//       why: "Хэтти Макдэниел получила награду за роль второго плана — Мамушки."
//     },
//     {
//       q: "Какой мюзикл получил 10 «Оскаров» — больше, чем любой другой мюзикл?",
//       a: ["Жижи", "Вестсайдская история", "Моя прекрасная леди", "Кабаре"],
//       right: 1,
//       why: "«Вестсайдская история» 1961 года: 10 побед из 11 номинаций."
//     },
//     {
//       q: "Кто получил сразу две статуэтки за «Миллионера из трущоб» — за музыку и за песню?",
//       a: ["Дэнни Бойл", "Саймон Бофой", "А. Р. Рахман", "Энтони Дод Мэнтл"],
//       right: 2,
//       why: "Композитор А. Р. Рахман. Песня называется «Jai Ho»."
//     },
//     {
//       q: "Какую песню из «Титаника» наградили «Оскаром»?",
//       a: ["Nearer, My God, to Thee", "My Heart Will Go On", "Into the West", "Thank Heaven for Little Girls"],
//       right: 1,
//       why: "«My Heart Will Go On» — музыка Джеймса Хорнера, слова Уилла Дженнингса, пела Селин Дион."
//     },
//     {
//       q: "Какую картину сняли внутри Запретного города в Пекине и она выиграла все 9 своих номинаций?",
//       a: ["Английский пациент", "Последний император", "Миллионер из трущоб", "Жижи"],
//       right: 1,
//       why: "«Последний император» Бернардо Бертолуччи, 1987 год."
//     },
//     {
//       q: "Какой фильм в 2026 году установил рекорд по числу номинаций — 16?",
//       a: ["Одна битва за другой", "Грешники", "Титаник", "Ла-Ла Ленд"],
//       right: 1,
//       why: "«Грешники» (Sinners) обошли «Титаник», «Всё о Еве» и «Ла-Ла Ленд» с их 14 номинациями. По победам рекорд всё ещё 11."
//     }
//   ];

//   var current = 0;
//   var score = 0;
//   var locked = false;

//   function showQuestion() {
//     var item = questions[current];
//     locked = false;

//     var html = '<div class="quiz-top"><span>Вопрос ' + (current + 1) + " из " + questions.length + "</span><span>Счёт: " + score + "</span></div>";
//     html += "<h2>" + item.q + "</h2>";
//     html += '<div class="answers">';
//     for (var i = 0; i < item.a.length; i++) {
//       html += '<button class="answer" data-i="' + i + '">' + item.a[i] + "</button>";
//     }
//     html += "</div>";
//     html += '<p class="quiz-msg" id="quiz-msg"></p>';
//     html += '<button class="icon-btn next" id="quiz-next" style="display:none">Дальше →</button>';
//     quizBox.innerHTML = html;
//   }

//   function showResult() {
//     var text;
//     if (score === questions.length) text = "Без единой ошибки. Можно писать рецензии.";
//     else if (score >= 5) text = "Хороший результат, фильмы вы знаете.";
//     else text = "Загляните на страницы фильмов и попробуйте ещё раз.";

//     quizBox.innerHTML =
//       '<p class="label">Результат</p>' +
//       '<p class="score">' + score + " / " + questions.length + "</p>" +
//       "<p>" + text + "</p>" +
//       '<button class="icon-btn" id="quiz-again">Пройти заново</button>';
//   }

//   quizBox.addEventListener("click", function (e) {
//     var t = e.target;

//     if (t.classList.contains("answer") && !locked) {
//       locked = true;
//       var chosen = parseInt(t.getAttribute("data-i"), 10);
//       var item = questions[current];
//       var buttons = quizBox.querySelectorAll(".answer");

//       for (var i = 0; i < buttons.length; i++) buttons[i].disabled = true;
//       buttons[item.right].classList.add("right");

//       var msg = document.getElementById("quiz-msg");
//       if (chosen === item.right) {
//         score++;
//         msg.textContent = "Верно. " + item.why;
//       } else {
//         t.classList.add("wrong");
//         msg.textContent = "Не совсем. " + item.why;
//       }

//       var next = document.getElementById("quiz-next");
//       next.style.display = "inline-flex";
//       next.textContent = current === questions.length - 1 ? "Результат" : "Дальше →";
//     }

//     if (t.id === "quiz-next") {
//       current++;
//       if (current >= questions.length) showResult();
//       else showQuestion();
//     }

//     if (t.id === "quiz-again") {
//       current = 0;
//       score = 0;
//       showQuestion();
//     }
//   });

//   showQuestion();
// }
