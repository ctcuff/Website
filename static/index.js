$(document).ready(() => {
  const $aboutLeft = $('#about-left');
  const isMobile = $(window).width() <= 600;

  // Activate all tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip({
      delay: {
        show: 250,
        hide: 0
      },
      trigger: 'hover',
    });
  });

  // On mobile, the image in the about section will be
  // underneath the text. On desktop, it'll be to the right
  $aboutLeft.addClass(isMobile ? 'row' : 'column');

  // Used to make sure the animation only triggers one
  const animationFinished = {
    about: false,
    projects: false,
    contact: false,
  };

  $(document).on("scroll", function () {
    if (isScrolledIntoView('#about') && !animationFinished.about) {
      $('#about-left').css({ animation: 'slideLtoR 3s ease 0s forwards' });
      $('#about-right').css({ animation: 'slideRtoL 3s ease 0s forwards' });
      animationFinished.about = !animationFinished.about;
    }

    if (isScrolledIntoView('#projects') && !animationFinished.projects) {
      $('#projects').css({
        animation: 'fadeIn 2s ease 0s forwards'
      });
    }

    // This animation is disabled on mobile since it causes the page to resize
    if (isScrolledIntoView('#contact') && !animationFinished.contact && !isMobile) {
      $('.contact-wrapper > div:nth-child(even)').css({
        animation: 'slideLtoRandRotateZ 2s ease 0s forwards'
      });

      $('.contact-wrapper > div:nth-child(odd)').css({
        animation: 'slideRtoLandRotateZ 2s ease 0s forwards'
      });
      animationFinished.contact = !animationFinished.contact;
    }
  });

  $('#href-about').click(e => {
    e.preventDefault();
    smoothScrollTo('#about');
  });

  $('#href-projects').click(e => {
    e.preventDefault();
    smoothScrollTo('#projects');
  });

  $('#href-contact').click(e => {
    e.preventDefault();
    smoothScrollTo('#contact');
  });


  function smoothScrollTo(selector) {
    const animation = { scrollTop: $(selector).offset().top };
    $('html, body').animate(animation, isMobile ? 2500 : 1500, 'swing');
  }

  function isScrolledIntoView(elem) {
    const elementTop = $(elem).offset().top;
    const elementBottom = elementTop + $(elem).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
});