const toggleMode = document.querySelector('#js-toggle');
const form = document.querySelector('form');
const formResult = document.querySelector('.form-result');
const formCount = document.querySelector('#js-count');
let count = 0;

if (localStorage.getItem('theme')) {
   // debug
   // console.log(localStorage.getItem('theme'));
   setColorScheme(localStorage.getItem('theme'));
} else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
   setColorScheme('dark');
} else {
   setColorScheme('light');
}

toggleMode.addEventListener('change', function(event) {
   // debug to get event object
   // console.log(event)
   // debug making sure the input event listener is attached
   // console.log(event.target)
   if (event.target.checked) {
      // debug
      // console.log('checked');
      // document.body.dataset.theme = 'dark';
      setColorScheme('dark');
   } else {
      // debug
      // console.log('not checked');
      // document.body.dataset.theme = 'light';
      setColorScheme('light');
   }
});

function setColorScheme(theme) {
   // debug
   // console.log(theme);
   if (theme === 'dark') {
      // debug
      // console.log('🎉 Dark mode is supported');
      toggleMode.checked = true;
   }
   // console.log('setting', theme);
   document.body.dataset.theme = theme;
   localStorage.setItem('theme', theme);
}

form.addEventListener('submit', function(e) {
   // keeps the form from refreshing the page
   e.preventDefault();
   // let JS know we we're submitting a form, should treat it as such
   const formData = new FormData(e.target);
   const formObject = Object.fromEntries(formData);
   // put the result in the div
   formResult.classList.remove('is-inactive');
   formResult.querySelector('pre').innerText += '\n' + JSON.stringify(formObject, null, '\t');
   count += 1;
   formCount.innerText = count;
   // reset the entire form
   form.reset();
   // blurs any inputs currently in focus on the page
   if ('activeElement' in document) {
      document.activeElement.blur();
   }
})