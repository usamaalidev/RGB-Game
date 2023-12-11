// ^=======|> HTML ELEMENTS
var rgbSyntaxEl = document.getElementById("rgbSyntax")
var easyBtn = document.getElementById("easyBtn")
var hardBtn = document.getElementById("hardBtn")
var getColorsBtn = document.getElementById("getColorsBtn")
var colorsContainer = document.getElementById("colorsContainer")

// &=======|> App Variables
var levels = {
  easy: {
    name: "easy",
    numberOfCards: 3,
    try: 1
  },

  hard: {
    name: "hard",
    numberOfCards: 6,
    try: 3,
  }
}

var correctAnswer;
var selectedLevel = "easy"

// ?=======|> Functions
// * Generate random color
function generateRandomColor() {
  var red = Math.trunc(Math.random() * 256)
  var green = Math.trunc(Math.random() * 256)
  var blue = Math.trunc(Math.random() * 256)

  var color = `rgb(${red}, ${green}, ${blue})`
  return color
}

// * Generate cards according to level
// ^ Easy => 3
// ^ Hard => 6

function askQuestion(level) {
  //! add event to each card

  var numberCards = levels[level].numberOfCards;
  var colors = []
  for (var i = 1; i <= numberCards; i++) {
    colors.push(generateRandomColor())
  }

  correctAnswer = colors[Math.trunc(Math.random() * colors.length)]
  rgbSyntaxEl.innerHTML = correctAnswer;


  displayCards(colors)
}

function displayCards(colorArr) {
  var colorCardsHTML = "";
  for (var i = 0; i < colorArr.length; i++) {
    colorCardsHTML += `
    <div class="color-card col-md-4">
      <div class="inner h-100 rounded" style="background-color: ${colorArr[i]} "></div>
    </div>
    `
  }

  colorsContainer.innerHTML = `
  <div class="row g-4 py-4">
    ${colorCardsHTML}
  </div>
  `

  var allCards = document.querySelectorAll(".color-card");
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].onclick = checkAnswer
  }

}

function checkAnswer(event) {
  if (levels[selectedLevel].try !== 0) {
    if (event.target.style.backgroundColor === correctAnswer) {
      alert("Congratualtions 🎉");
      askQuestion(selectedLevel)
    } else {
      alert("try again 🔁");
      event.target.style.display = "none";
      levels[selectedLevel].try -= 1
    }
  } else {
    alert("Game over");
    askQuestion(selectedLevel)
  }

}

askQuestion(selectedLevel)


//~========|> EVENTS
hardBtn.onclick = function () {
  selectedLevel = "hard";
  askQuestion(selectedLevel);
  easyBtn.classList.remove("active")
  hardBtn.classList.add("active")
}

easyBtn.onclick = function () {
  selectedLevel = "easy"
  askQuestion(selectedLevel)
  hardBtn.classList.remove("active");
  easyBtn.classList.add("active")
}

getColorsBtn.onclick = function () {
  askQuestion(selectedLevel)
}