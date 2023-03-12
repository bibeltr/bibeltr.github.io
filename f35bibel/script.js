const bookSelect = document.querySelector('#bibleBook');
const chapterSelect = document.querySelector('#bibleChapter');
const versesList = document.querySelector('#verses');

// Load bible data
fetch('https://bibeltr.github.io/f35bibel/bibel.json')
  .then(res => res.json())
  .then(data => {
    // Populate the book select
    data.forEach(book => {
      const bookOption = document.createElement('option');
      bookOption.value = book.book_number;
      bookOption.textContent = book.book_name;
      bookSelect.appendChild(bookOption);
    });

    // Set the initial book and chapter to load
    let selectedBookNumber = bookSelect.value;
    let selectedChapterNumber = 1;

    // Populate the chapter select with the first chapter
    const book = data.find(book => book.book_number == selectedBookNumber);
    if (book) {
      book.chapters.forEach(chapter => {
        const chapterOption = document.createElement('option');
        chapterOption.value = chapter.chapter_number;
        chapterOption.textContent = `Kapitel ${chapter.chapter_number}`;
        chapterSelect.appendChild(chapterOption);
      });
    }

    // Load the first chapter verses on page load
    loadChapterVerses(selectedBookNumber, selectedChapterNumber, data);

    // When a book is selected, populate the chapter select with the corresponding chapters
    bookSelect.addEventListener('change', event => {
      const bookNumber = event.target.value;
      const book = data.find(book => book.book_number == bookNumber);
      chapterSelect.innerHTML = '';
      if (book) {
        book.chapters.forEach(chapter => {
          const chapterOption = document.createElement('option');
          chapterOption.value = chapter.chapter_number;
          chapterOption.textContent = `Kapitel ${chapter.chapter_number}`;
          chapterSelect.appendChild(chapterOption);
        });
        selectedBookNumber = bookNumber;
        selectedChapterNumber = 1;
        loadChapterVerses(selectedBookNumber, selectedChapterNumber, data);
      }
    });

    // When a chapter is selected, load the corresponding verses
    chapterSelect.addEventListener('change', event => {
      const chapterNumber = event.target.value;
      selectedChapterNumber = chapterNumber;
      loadChapterVerses(selectedBookNumber, selectedChapterNumber, data);
    });
  });

// Function to load the verses of a chapter and display them on the page
function loadChapterVerses(bookNumber, chapterNumber, data) {
  const book = data.find(book => book.book_number == bookNumber);
  if (book) {
    const chapter = book.chapters.find(chapter => chapter.chapter_number == chapterNumber);
    if (chapter) {
      let versesHTML = `<h3>${book.book_name} ${chapter.chapter_number}</h3>`;
      chapter.verses.forEach(verse => {
        versesHTML += `<p><strong>${book.book_name} ${chapter.chapter_number}:${verse.verse_number}</strong> ${verse.verse_text}</p>`;
      });
      versesList.innerHTML = versesHTML;
    }
  }
}

  // Funktionen für die Webseite

        // Nachoben-Button

        document.querySelector('#toTopButton').addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
