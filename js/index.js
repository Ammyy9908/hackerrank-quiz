// load all questions from gist using fetch request

let questions = null;
const start_btn = document.querySelector(".start_btn");
const submit_btn = document.querySelector(".submit_btn");
const question_section = document.querySelector(".question-section");
let answered = false;
let quiz_complete = false;

/// function to load questions from api
async function getQuestions() {
  try {
    const r = await fetch(
      "https://gist.githubusercontent.com/Ammyy9908/6f92a2bddd3121a0adddd562956829aa/raw/0aaf7cfa0dc942b5a576fa6604e462e9a40b4109/question.json"
    );
    return r.json();
  } catch (e) {
    if (e.response && e.response.data) {
      console.log(e.response.status);
    }
  }
}

// when window completely load load the questions from api by calling getQuestions

window.onload = getQuestions()
  .then((res) => {
    console.log(res.data);
    questions = res.data;
  })
  .catch((e) => {
    console.log(e);
  });

// start quizz

const startQuiz = () => {
  document.querySelector(".test-section").style.display = "none";
  document.querySelector(".quiz-section").style.display = "block";
  // load the first question
  question_section.textContent = questions[0].question;
  const createButton = (option, index) =>
    `<button id="${index}">${option}</button>`;
  questions[0].options.forEach((option, index) => {
    document.querySelector(".answer_options").innerHTML += createButton(
      option,
      index
    );
  });

  Array.from(
    document.querySelector(".answer_options").querySelectorAll("button")
  ).forEach((button) => {
    button.addEventListener("click", (e) => {
      if (answered) {
        alert("You have answered the question already");
        return;
      } else {
        answered = e.target.id;
      }
      submit_btn.disabled = false;
      submit_btn.style.cursor = "pointer";
    });
  });
};

start_btn.addEventListener("click", () => {
  startQuiz();
});

// Validate Answer and End the Quiz

function validateAnswer() {
  quiz_complete = true;
  submit_btn.textContent = "End Test";
  submit_btn.addEventListener("click", () => {
    window.location.reload();
  });
  if (+answered === questions[0].answer) {
    document.getElementById(answered).classList.add("correct");
  } else {
    document.getElementById(answered).classList.add("incorrect");
  }
}
submit_btn.addEventListener("click", validateAnswer);

// add event listenr on the all answer options
