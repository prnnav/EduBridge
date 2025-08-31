// Add Custom Lesson
function addLesson(title, content, quiz) {
  const newLesson = {
    title,
    content,
    quiz
  };
  let lessons = JSON.parse(localStorage.getItem('teacher-lessons') || '[]');
  lessons.push(newLesson);
  localStorage.setItem('teacher-lessons', JSON.stringify(lessons));
  alert('Lesson added successfully!');
}

// Example usage
addLesson('English Grammar', 'Learn nouns, verbs, and adjectives.', [
  {
    question: 'Identify the noun: "The cat runs fast."',
    options: ['cat', 'runs', 'fast'],
    answer: 'cat'
  },
  {
    question: 'Identify the verb: "She is reading a book."',
    options: ['She', 'reading', 'book'],
    answer: 'reading'
  }
]);
