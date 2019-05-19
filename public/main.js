var userName = document.getElementById('name');
var placeName = document.getElementById('placeName');
var rating = document.getElementById('rating');
var button = document.getElementById('button');

button.addEventListener('click', function(e) {
  e.preventDefault();
  fetchData(userName.value, placeName.value, rating.value);
});

function fetchData(str1, str2, str3) {
  fetch("/add-place?userName="+str1+"&placeName="+str2+"&rating="+str3)
  .then(function(response) {
    console.log('response json', response.json());
    return response;
  })
  .then(function(data) {
    console.log('my data is', data);
  })
  .catch(function(err) {
    console.log('my error:', err);
  })
};
