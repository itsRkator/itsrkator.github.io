// Typed text (only when target exists)
if (document.querySelector('#typed') && typeof Typed !== 'undefined') {
  var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 200,
    loop: true,
    strings: ['Software Engineer!', 'Full Stack Developer!', 'Learner!'],
  });
}