let currentPage = 1;
const totalPages = 5;

function generatePageNumbers() {
  const pageNumbersContainer = $('#pageNumbers');
  pageNumbersContainer.empty();

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pageCount = Math.min(totalPages, 5);

  for (let i = 1; i <= pageCount; i++) {
    const adjustedPageNumber = startPage + i - 1;
    const button = `<button onclick="loadMovies(${adjustedPageNumber})" ${
      adjustedPageNumber === currentPage ? 'class="active"' : ''
    }>${adjustedPageNumber}</button>`;
    pageNumbersContainer.append(button);
  }
}

function loadMovies(page) {
  if (page === 'prev') {
    currentPage = Math.max(1, currentPage - 1);
  } else if (page === 'next') {
    currentPage = Math.min(totalPages, currentPage + 1);
  } else {
    currentPage = page;
  }

  generatePageNumbers();
}

loadMovies(1);
