const progressSteps = document.querySelectorAll(".progress span");

function goNext(page) {
  document.getElementById("p" + page).classList.remove("active");
  document.getElementById("p" + (page + 1)).classList.add("active");

  progressSteps[page - 1].classList.remove("active");
  progressSteps[page].classList.add("active");

  if (page === 3) analyze();
}

function showError(step, message) {
  const el = document.getElementById("error-" + step);
  if (el) {
    el.textContent = message || "";
  }
}

function clearErrors() {
  [1, 2, 3].forEach(step => showError(step, ""));
}

function validateStep1() {
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value;

  if (!name) {
    showError(1, "Please enter the student name.");
    return false;
  }
  if (!course) {
    showError(1, "Please select a course.");
    return false;
  }
  showError(1, "");
  return true;
}

function validateStep2() {
  const year = document.getElementById("year").value.trim();
  const college = document.getElementById("college").value.trim();
  const level = document.getElementById("level").value;

  if (!year || !college || !level) {
    showError(2, "Please fill in all details.");
    return false;
  }
  showError(2, "");
  return true;
}

function validateStep3() {
  const job = document.getElementById("job").value;
  const skillsSelected = document.querySelectorAll("input[type=checkbox]:checked").length;

  if (!job) {
    showError(3, "Please select a role.");
    return false;
  }
  if (skillsSelected === 0) {
    showError(3, "Please select at least one current skill.");
    return false;
  }
  showError(3, "");
  return true;
}

function analyze() {
  const job = document.getElementById("job").value;
  const skills = [];

  document.querySelectorAll("input[type=checkbox]:checked")
    .forEach(s => skills.push(s.value));

  const required = {
    web: ["HTML","CSS","JavaScript","React"],
    data: ["Python","SQL"],
    app: ["JavaScript","React"]
  };

  const weeklyRoadmap = {
    web: [
      "Week 1: HTML & CSS fundamentals",
      "Week 2: JavaScript basics + DOM",
      "Week 3: React basics + components",
      "Week 4: Build full web project"
    ],
    data: [
      "Week 1: Python basics",
      "Week 2: Data handling + SQL",
      "Week 3: Data analysis projects",
      "Week 4: Mini data science project"
    ],
    app: [
      "Week 1: JavaScript fundamentals",
      "Week 2: React basics",
      "Week 3: App UI & navigation",
      "Week 4: Build mobile app project"
    ]
  };

  if (!required[job]) {
    document.getElementById("result").innerHTML = "<p>Please select a valid role.</p>";
    return;
  }

  const missing = required[job].filter(s => !skills.includes(s));
  const rawScore = (skills.filter(s => required[job].includes(s)).length / required[job].length) * 100;
  const score = Math.round(Math.min(rawScore, 100));

  const scoreBox = document.getElementById("score");
  if (scoreBox) {
    scoreBox.textContent = `Skill Match: ${score}%`;
  }

  document.getElementById("result").innerHTML = `
    <h3>Missing Skills</h3>
    <ul>${missing.map(m => `<li>${m}</li>`).join("")}</ul>

    <h3>4-Week Roadmap</h3>
    <ul>${weeklyRoadmap[job].map(w => `<li>${w}</li>`).join("")}</ul>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  clearErrors();

  const next1 = document.getElementById("next-1");
  const next2 = document.getElementById("next-2");
  const generate = document.getElementById("generate");
  const restart = document.getElementById("restart");

  if (next1) {
    next1.addEventListener("click", () => {
      if (validateStep1()) {
        goNext(1);
      }
    });
  }

  if (next2) {
    next2.addEventListener("click", () => {
      if (validateStep2()) {
        goNext(2);
      }
    });
  }

  if (generate) {
    generate.addEventListener("click", () => {
      if (validateStep3()) {
        goNext(3);
      }
    });
  }

  if (restart) {
    restart.addEventListener("click", () => {
      window.location.reload();
    });
  }
});
