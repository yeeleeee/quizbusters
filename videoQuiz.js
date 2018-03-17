const START_QUIZ_TIME = 141; //seconds
const JUMP_TO_TIME_WHEN_CORRECT = 200; // seconds

const QUIZ_STATES = [
  'unstarted',
  'started',
  'correct',
  'incorrect1',
  'incorrect2',
  'incorrect3',
  'hint1',
  'hint2',
  'hint3',
  'doneSolved',
  'doneUnsolved'
];

var quizState = QUIZ_STATES[0];

//Some code adapted from YouTube API docs.
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'Pa0z7iAeyZ8',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log('player ready');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

/*Some code adapted from https://time2hack.com/2017/11/easiest-way-to-integrate-youtube-iframe-api-in-angular-and-react/
*/
function onPlayerStateChange(event) {
  console.log(event);
  switch (event.data) {
    case window['YT'].PlayerState.PLAYING:
      if (cleanTime() == 0) {
        console.log('started ' + cleanTime());
        onPlayerStart(event);
      } else {
        console.log('playing ' + cleanTime());
      }
      break;
    case window['YT'].PlayerState.PAUSED:
      if (player.getDuration() - player.getCurrentTime() != 0) {
        console.log('paused' + ' @ ' + cleanTime());
      }
      break;
    case window['YT'].PlayerState.ENDED:
      console.log('ended ');
      break;
  }
}

function onPlayerStart(event) {
  setInterval(() => checkStartQuiz(event), 1000); // check to start quiz every second
}

function checkStartQuiz(event) {
  if (cleanTime() >= START_QUIZ_TIME && quizState === QUIZ_STATES[0]) {
    startQuiz();
  }
}
//utility
function cleanTime() {
  return Math.round(player.getCurrentTime());
}
/* Jquery wizard of oz-ing below */

/*
QUIZ_STATES = [
  0- 'unstarted',
  1- 'started',
  2- 'correct',
  3- 'incorrect1',
  4- 'incorrect2',
  5- 'incorrect3',
  6- 'hint1',
  7- 'hint2',
  8- 'hint3',
  9- 'doneSolved',
  10- 'doneUnsolved'
]
*/

function startQuiz() {
  player.pauseVideo();
  quizState = QUIZ_STATES[1];
  $('.a-1').show();
  $('.a-1 #unfilled').hide();
  $('#qError1').hide();
  $('#qError2').hide();
  $('#qError3').hide();
  $('#qCorrect').hide();
  $('#contWatch').hide();

  $(document).on('click', '#ansSubmit', () => {
    console.log('clicked!');
    var quizAns = $('input[name=quiz]:checked').val();
    if (quizAns === '2') {
      quizState = QUIZ_STATES[2];
      $('#qCorrect').show();
      $('#contWatch').show();
      $(document).on('click', '#contWatch', () => {
        $('.a-1').hide();
        player.playVideo();
      });
    } else if (quizAns === '1') {
      quizState = QUIZ_STATES[3];
      $('#ansSubmit').text('Submit Again');
      $('#askHint1').text('Give me a hint!');
      $('#qError1').show();
    } else if (quizAns === '3') {
      quizState = QUIZ_STATES[4];
      $('#ansSubmit').text('Submit Again');
      $('#askHint1').text('Give me a hint!');
      $('#qError2').show();
    } else if (quizAns === '4') {
      quizState = QUIZ_STATES[5];
      $('#ansSubmit').text('Submit Again');
      $('#askHint1').text('Give me a hint!');
      $('#qError3').show();
    } else if (!quizAns) {
      $('.a-1 #unfilled').show();
    }
  });

  $(document).on('click', '#askHint1', () => {
    quizState = QUIZ_STATES[6];
    handleHint1();
    $('.a-1').hide();
  });
}

function handleHint1() {
  $('.a-2').show();
  $(document).on('click', '#askHint2', () => {
    quizState = QUIZ_STATES[7];
    handleHint2();
    $('.a-2').hide();
  });
  //return to quiz w other button
  $(document).on('click', '#returnToQuestion', () => {
    startQuiz();
    $('.a-2').hide();
  });
}

function handleHint2() {
  $('.a-3').show();
  $('.a-3 #unfilled').hide();
  $('#hError1').hide();
  $('#hError2').hide();
  $('#hError3').hide();
  $('#hCorrect').hide();
  $(document).on('click', '#askHint3', () => {
    quizState = QUIZ_STATES[8];
    handleHint3();
    $('.a-3').hide();
  });
  //return to quiz w other button
  $(document).on('click', '#returnToQuestion', () => {
    startQuiz();
    $('.a-3').hide();
  });
  $(document).on('click', '#hint2Submit', () => {
    var hintAns = $('input[name=hint2]:checked').val();
    if (hintAns === '3') {
      //correct
      $('#hCorrect').show();
    } else if (hintAns === '1') {
      $('#hError1').show();
    } else if (hintAns === '2') {
      $('#hError2').show();
    } else if (hintAns === '4') {
      $('#hError3').show();
    } else if (!hintAns) {
      $('.a-3 #unfilled').show();
    }
  });
}

function handleHint3() {
  console.log('last hint!');
  $('.a-5').show();
  $(document).on('click', '#returnToQuestion', () => {
    startQuiz();
    $('.a-5').hide();
  });
  $(document).on('click', '#last', () => {
    $('.a-5').hide();
    player.playVideo();
  });
}

$(document).ready(() => {
  //hide divs
  $('.slide').hide();
});
