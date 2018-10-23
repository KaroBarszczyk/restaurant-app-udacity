if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service_worker.js', {scope: './'})
  .then (function(registration) {
    //Registration worked
    console.log('Service worker registration succeeded:', registration);
  })
  .catch (function(error) {
        //Registration failed
        console.log('Registration failed with ' + error);
  });
}
