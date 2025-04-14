
document.addEventListener("DOMContentLoaded", function () {
  const quizId = new URLSearchParams(window.location.search).get("id");
  if (!quizId) return;
  fetch(`quizzes/${quizId}.json`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("quiz-container");
      container.innerHTML = `<h2>${data.title}</h2>`;
      data.questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${q.question}</p>` + q.options.map(opt =>
          `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`).join("");
        container.appendChild(div);
      });
      document.getElementById("submit-btn").style.display = "block";
    });

  document.getElementById("submit-btn").addEventListener("click", () => {
    fetch(`quizzes/${quizId}.json`).then(res => res.json()).then(data => {
      let score = 0;
      data.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) score++;
      });
      alert(`You scored ${score} out of ${data.questions.length}`);
    });
  });
});
