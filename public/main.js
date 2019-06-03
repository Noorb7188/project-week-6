// var userName = document.getElementById('name');
// var placeName = document.getElementById('placeName');
// var rating = document.getElementById('rating');
// var button = document.getElementById('button');

button.addEventListener('click', function(e) {
  e.preventDefault();
  fetchData();
});

function fetchData() {
  fetch('/places')
  .then(function(response) {
    console.log('my response', response.JSON());
  })
  .then(function(data) {
    var objectData = JSON.stringify(data);
    console.log('my data is', data);
    console.log('my stringfyed data', objectData);
  })
  .catch(function(err) {
    console.log('my error:', err);
  })
};
