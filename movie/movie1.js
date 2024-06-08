const apiKey = '10923b261ba94d897ac6b81148314a3f';

$.ajax({
  url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`,
  method: 'GET',
  success: function (data) {
    const movies = data.results;
    const movieContainer = $('#movieContainer');

    movies.forEach((movie, index) => {
      const card = `
        <div class="col-md-12 mb-4 movie-container">
          <div class="row">
            <div class="col-md-3">
              <div class="poster-container">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top"
                  alt="${movie.title}">
              </div>
            </div>
            <div class="col-md-9 movie-info">
              <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
                <div class="btn-container">
                  <button class="btn btn-primary" onclick="openTrailerModal(${movie.id})">예고편 보기</button>
                  <button class="btn btn-success" onclick="openReviewModal(${movie.id})">후기 작성</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      movieContainer.append(card);
    });
  },
  error: function (error) {
    console.error('에러:', error);
  }
});

function openTrailerModal(movieId) {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=ko-KR`,
    method: 'GET',
    success: function (data) {
      const trailers = data.results;

      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
        const iframeSrc = `https://www.youtube.com/embed/${trailerKey}`;

        $('#trailerModal iframe').attr('src', iframeSrc);
        $('#trailerModal').modal('show');

        // 후기 모달 창의 내용 초기화
        $('#reviewModal .modal-body').html('');
      } else {
        alert('해당 영화에 대한 예고편이 없습니다.');
      }
    },
    error: function (error) {
      console.error('에러:', error);
    }
  });
}

function goToLoginPage() {
  window.location.href = '/login';
}

function openReviewModal(movieId) {
  target_movie = movieId;
  $("#reviewModal .modal-body").html('')
  $.ajax({
    url: `/review/read?movie_id=${target_movie}`,
    data: {},
    type: "GET",
    success: function (json) {
      let reviews = json.data;
      for (let i = 0; i < reviews.length; i++) {
        $("#reviewModal .modal-body").append(`<p>${reviews[i].review}</p>`);
      }
    },
    error: function (e) {
    }
  })
  $("#reviewModal").modal('show');
}

function addReview() {
  let review = $("#review").val();
  let review_html = `<p>${review}</p>`;
  $.ajax({
    url: `/review/create`,
    data: {
      movie_id: target_movie,
      review: review
    },
    type: "POST",
    success: function (json) {
      console.log(json);
      if (json.success == 200) {
        console.log("저장이 잘된 경우");
      } else if (json.success == 400) {
        alert("저장 실패");
      }
    },
    error: function (e) {
    }
  })
  $("#reviewModal .modal-body").append(review_html);
  $("#review").val('');
}