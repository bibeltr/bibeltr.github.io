// Get the bible data from the json file
let bibleData = fetch('bibel.json').then(res => res.json());

// When the data is loaded, populate the select element with the bible books
bibleData.then(data => {
  let select = document.querySelector('#bibleBook');
  let chaptersList = document.querySelector('#chapters');


  data.forEach(book => {
    let bookOption = document.createElement('option');
    bookOption.value = book.book_number;
    bookOption.innerHTML = `${book.book_name}`;
    select.appendChild(bookOption);
  });

  // When a book is selected, populate the chapters list with the corresponding chapters
  select.addEventListener('change', event => {
    let bookNumber = event.target.value;
    let book = data.find(book => book.book_number == bookNumber);

    if (book) {
      // Clear the previous chapters list
      while (chaptersList.firstChild) {
        chaptersList.removeChild(chaptersList.firstChild);
      }

      // Populate the chapters list
      book.chapters.forEach(chapter => {
        let chapterItem = document.createElement('li');
        let chapterLink = document.createElement('a');
        chapterLink.href = '#';
        chapterLink.innerHTML = chapter.chapter_number;
        chapterItem.appendChild(chapterLink);
        chaptersList.appendChild(chapterItem);

        // Add a hover effect to the chapter link
        chapterLink.addEventListener('mouseover', () => {
          chapterLink.style.textDecoration = 'underline';
        });
        chapterLink.addEventListener('mouseout', () => {
          chapterLink.style.textDecoration = 'none';
        });

        // When a chapter is clicked, populate the verses list
        chapterLink.addEventListener('click', () => {
          let versesList = document.querySelector('#verses');
          let versesHTML = '';

          // Display the book name and chapter number above the verses
          versesHTML += `<h3>${book.book_name} ${chapter.chapter_number}</h3>`;

          chapter.verses.forEach(verse => {
            versesHTML += `<p><b>${book.book_name} ${chapter.chapter_number}:${verse.verse_number}</b> ${verse.verse_text}</p>`;
          });

          versesList.innerHTML = versesHTML;
        });

        // Automatically select the first chapter of the book
        if (chapter.chapter_number == 1) {
          chapterLink.click();
        }
      });
    }
  });
});


        // Funktionen für die Webseite

        // Nachoben-Button

document.querySelector('#toTopButton').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
