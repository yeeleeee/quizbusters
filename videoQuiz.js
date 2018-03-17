const START_QUIZ_TIME = 193; //seconds
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
//Done
function startQuiz() {
  player.pauseVideo();
  quizState = QUIZ_STATES[1];
  $('.a-1').show();
  $('.a-1 #unfilled').hide();
  $(document).on('click', '#ansSubmit', () => {
    console.log('clicked!');
    var quizAns = $('input[name=quiz]:checked').val();
    if (quizAns === '2') {
      quizState = QUIZ_STATES[2];
      handleCorrect();
      $('.a-1').hide();
    } else if (quizAns === '1') {
      quizState = QUIZ_STATES[3];
      handleIncorrect1();
      $('.a-1').hide();
    } else if (quizAns === '3') {
      quizState = QUIZ_STATES[4];
      handleIncorrect2();
      $('.a-1').hide();
    } else if (quizAns === '4') {
      quizState = QUIZ_STATES[5];
      handleIncorrect3();
      $('.a-1').hide();
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
// TODO
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

// TODO
function handleHint2() {
  $('.a-4').show();
  $(document).on('click', '#askHint2', () => {
    quizState = QUIZ_STATES[8];
    handleHint3();
    $('.a-4').hide();
  });
  //return to quiz w other button
  $(document).on('click', '#returnToQuestion', () => {
    startQuiz();
    $('.a-4').hide();
  });
}

function handleHint3() {
  $('.a-5').show;
  $(document).on('click', '#returnToQuestion', () => {
    startQuiz();
    $('.a-5').hide();
  });
}

function handleCorrect() {}

function handleIncorrect1() {}

function handleIncorrect2() {}

function handleIncorrect3() {}

/* Jquery wizard of oz below */
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
$(document).ready(() => {
  //hide divs
  $('.slide').hide();

  switch (quizState) {
    case QUIZ_STATES[0]: // 'unstarted'
      break;

    case QUIZ_STATES[1]: // 'started'
      break;

    case QUIZ_STATES[2]: // 'correct' (ans 2)
      break;

    case QUIZ_STATES[3]: // 'incorrect1' - FoodHot (ans 1)
      break;

    case QUIZ_STATES[4]: // 'incorrect2' - doesn't Conduct (ans 3)
      break;

    case QUIZ_STATES[5]: // 'incorrect3' - damaged stove (ans 4)
      break;

    case QUIZ_STATES[6]: // 'hint1'
      break;

    case QUIZ_STATES[7]: // 'hint2'
      break;
    case QUIZ_STATES[8]: // 'hint3'
      break;

    case QUIZ_STATES[9]: //doneSolved
      break;

    case QUIZ_STATES[10]: //doneUnsolved
      break;

    default:
      throw 'undefined quiz state!';
  }
});
