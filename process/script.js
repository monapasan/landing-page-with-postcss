var smoothScroll = require('smooth-scroll');
var ScrollMagic = require('ScrollMagic');
var Flickity = require('flickity');
var ladda = require('ladda');
// smooth-scroll
window.onload = function(){
  var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: "100%"}});

  smoothScroll.init();

  if(window.location.pathname.includes("therapien/")) {
    initTopButtonFunctionality();
  } else if(!window.location.pathname.includes("disclaimer")) {
      initScrolling();
      initGallery();
      initSubmitForm();
      setOpenCloseSpan();
  }
  var menu = document.getElementsByClassName('navbar')[0];
  var triggerEl = document.getElementsByClassName('mobile-menu')[0];

  triggerEl.onclick = (function(){
    var isExpanded = false;
    return function(el){
      if(isExpanded) {
        isExpanded = false;
        triggerEl.innerHTML = "≡";
        menu.className = "navbar";
      } else {
        triggerEl.innerHTML = "&#x2715;";
        isExpanded = true;
        menu.className += " expanded";

      }
    }
  })();
  function initDropDownMenu(){
    var isShown = false;
    var item = document.getElementById('arrow-menu');
    var mobileItem = document.getElementsByClassName("mobile-cls");
    item.addEventListener("ontouchStart", function(){
      if(isShown) {
        mobileItem.style.display = "none";
        isShown = false;
      } else {
        mobileItem.style.display = "block";
        isShown = true;
      }
    });
  }
  function initScrolling() {
    var isShown = false;
    new ScrollMagic.Scene({triggerElement: "#home"})
            .setClassToggle("#circle1", "active") // add class toggle
            .addTo(controller);
    new ScrollMagic.Scene({triggerElement: "#concept"})
            .setClassToggle("#circle2", "active") // add class toggle
            .addTo(controller);
    new ScrollMagic.Scene({triggerElement: "#team"})
            .setClassToggle("#circle3", "active") // add class toggle
            .addTo(controller);
    new ScrollMagic.Scene({triggerElement: "#membership"})
            .setClassToggle("#circle4", "active") // add class toggle
            .addTo(controller);
    new ScrollMagic.Scene({triggerElement: "#contact"})
            .setClassToggle("#circle5", "active") // add class toggle
            .addTo(controller);
    new ScrollMagic.Scene({triggerElement: "#impressum"})
            .setClassToggle("#circle6", "active") // add class toggle
            .addTo(controller);
    var upLink = document.getElementById('topButton');
    var scene = new ScrollMagic.Scene({triggerElement: "#concept", duration: 10})
            .addTo(controller)
            .on("end", function (e) {
              if(isShown) {
                upLink.className = "";
                isShown = false;
              } else {
                upLink.className += " show";
                isShown = true;
              }
            });
  }
  function initGallery() {
    var flkty = new Flickity( '.main-gallery', {
        // options
        imagesLoaded: true,
        lazyLoad: true,
        autoPlay: 2000,
        contain: true,
        wrapAround: true
    });
  }
  function initSubmitForm() {
    var form = $(".contact")[0];
    var l = ladda.create( document.querySelector( '.myButton' ) );
    form.onsubmit = function(e){
      e.preventDefault();
      // masking Buttons
      l.start();
      $.ajax({
          url:'mail.php',
          type:'post',
          data: $( this ).serialize(),
          success:function(e){
            form.reset();
            $('.success').show();
          },
          complete:function(){
            // unmask button
            l.stop();
          },
          error: function(e) {
          }
        });
    }
}
  function initTopButtonFunctionality() {
    var upLink = document.getElementById('topButton');
    var isShown = false;
    var scene = new ScrollMagic.Scene({triggerElement: "#text-therapie", duration: 200})
            .addTo(controller)
            .on("end", function (e) {
              if(isShown) {
                upLink.className = "";
                isShown = false;
              } else {
                upLink.className += " show";
                isShown = true;
              }
            });
  }
  function setOpenCloseSpan() {
    var isOpen = false,
      date = new Date(),
      el = document.querySelector('.is-open'),
      day = date.getDay(),
      hour = date.getHours(), minutes =  date.getMinutes();
    if(!el) {
      return;
    }
    var isWeekend = day === 6 || day === 0;
    if(isWeekend) {
      setSpanText(false);
    } else if((hour >=  8 && hour <= 20 ) || (hour === 7 && minutes >= 30)) {
      setSpanText(true);
    } else {
      setSpanText(false);
    }
    function setSpanText(isOpen) {
      console.log(isOpen);
      console.log(el);
      if(isOpen)
        el.innerHTML = "Wir sind gerade geöffnet.";
      else
        el.innerHTML = "Wir haben gerade geschlossen.";
    }

  }
}
