// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed:', err));
}

// Load Lessons
async function loadLessons() {
  try {
    const res = await fetch('lessons/lessons.json');
    const lessons = await res.json();
    displayLessons(lessons);
  } catch (err) {
    console.error('Error loading lessons:', err);
  }
}

// Display Lessons
function displayLessons(lessons) {
  const lessonsList = document.getElementById('lessons');
  lessons.forEach(lesson => {
    const li = document.createElement('li');
    li.textContent = lesson.title;
    li.onclick = () => loadLessonContent(lesson);
    lessonsList.appendChild(li);
  });
}

// Load Lesson Content
function loadLessonContent(lesson) {
  const content = document.getElementById('lesson-content');
  content.innerHTML = `<h2>${lesson.title}</h2><p>${lesson.content}</p>`;
  loadQuiz(lesson.quiz);
}

// Load Quiz
function loadQuiz(quiz) {
  const quizSection = document.getElementById('quiz-section');
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = '';
  quiz.forEach((q, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<p><b>Q${index + 1}: ${q.question}</b></p>`;
    q.options.forEach(opt => {
      const button = document.createElement('button');
      button.textContent = opt;
      button.onclick = () => checkAnswer(q, opt);
      div.appendChild(button);
    });
    quizDiv.appendChild(div);
  });
  quizSection.hidden = false;
}

// Check Answer
function checkAnswer(question, selected) {
  const correct = question.answer === selected;
  alert(correct ? '✅ Correct!' : '❌ Incorrect!');
  if (correct) {
    updateScore(1);
  }
}

// Update Score
function updateScore(points) {
  let score = parseInt(localStorage.getItem('score') || '0');
  score += points;
  localStorage.setItem('score', score);
  document.getElementById('score').textContent = `Your Score: ${score}`;
}

// Toggle High Contrast Mode
document.getElementById('toggle-contrast').onclick = () => {
  document.body.classList.toggle('high-contrast');
};

// Toggle Font Size
document.getElementById('toggle-font-size').onclick = () => {
  document.body.classList.toggle('large-font');
};

// Initialize
loadLessons();
