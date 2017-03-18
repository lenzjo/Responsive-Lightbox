/* Inspired by mvgallery */


var tlcLightbox = (function() {

  var tlclb     = 'tlclb';
  var tlclbp    = 'tlclbp';
  var wrapper   = '.content-wrapper';
  var modal     = '.lightbox__modal';
  var modalWin  = '';


  var setupEventListeners = function() {
    // 1> Listen for an image click
    document.querySelector(wrapper).addEventListener('click', launchModal, false);
    // 2> Listen for the ESC key
    document.addEventListener('keypress', modalEventsHandler, false);
  };


  var launchModal = function(event) {
    var html, newhtml, imgName;
    var isImg = false;
    event.preventDefault();

    if (event.target.classList.contains(tlclb)) { // Clicked on a lightbox image?
      imgName = getImgName(event.target.src);
      isImg = true;
    }
    if (event.target.classList.contains(tlclbp)) { // Clicked on a lightbox image?
      imgName = getImgName(event.target.srcset);
      isImg = true;
    }
    if(isImg) {
      html = '<div class="lightbox__modal"><picture><source sizes="1200px" srcset="/img/%name%-t-lg.jpg 1200w, /img/%name%-t-lg-hd.jpg 2400w" media="(min-width: 1200px)"><source sizes="800px" srcset="/img/%name%-t-md.jpg 800w, /img/%name%-t-md-hd.jpg 1600w" media="(min-width: 800px)"><img sizes="530px" srcset="/img/%name%-t-sm.jpg 530w,  /img/%name%-t-sm-hd.jpg 1060w" alt="%name%"></picture></div>';

      // replace placeholder %name% with current image name
      newhtml = html.replace(new RegExp('%name%', 'g'), imgName);
      // Add lightbox to DOM
      document.querySelector(wrapper).insertAdjacentHTML('afterend', newhtml);
      modalWin = document.querySelector(modal);
      // Add event handlers
      modalWin.addEventListener('click', modalEventsHandler, false);
      window.addEventListener('keyup', modalEventsHandler, false);
    }
  };


  var modalEventsHandler = function(event) {
    // key presses
    if (event.type === 'keyup') {
      var key = event.keyCode || event.which;
      if (key === 27) {   // esc key closes modal
          killModal();
      }
    }
    if (event.type === 'click') {   // click events
      // close via X or clicking away from img
      if (event.target === modalWin) {
        killModal();
      }
    }
  };


  var killModal = function() {
    // 1. remove event modal's event listeners
    modalWin.removeEventListener('click', modalEventsHandler, false);
    window.removeEventListener('keyup', modalEventsHandler, false);
    // 2. removeChild(modal)
    modalWin.parentNode.removeChild(modalWin);
    // 3. Clear var
    modalWin = '';
  };


  var getImgName = function(url) {
    var imgName = url.split(' ');
    imgName = imgName[0];
    imgName = url.split('/');
    imgName = imgName[imgName.length-1];
    imgName = imgName.split('.');
    imgName = imgName[0];
    imgName = imgName.split('-');
    return imgName[0];
  };

  return {
    init: function() {
      console.log('Lightbox has started');
      setupEventListeners();
    }
  }
})();

tlcLightbox.init();
