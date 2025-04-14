const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`quizzes/${id}.json`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("quiz-container");
    data.forEach((q, i) => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${i+1}. ${q.question}</p>` + 
        q.options.map((opt, j) => 
          `<label><input type="radio" name="q${i}" value="${j}">${opt}</label><br>`).join('');
      container.appendChild(div);
    });
  });
