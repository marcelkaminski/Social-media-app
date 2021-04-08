document.addEventListener('DOMContentLoaded', function() {
    load_posts();
  });

function load_posts()
{
var xmlhttp = new XMLHttpRequest();
var url = "/posts";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += `<li>${JSON.stringify(arr[i])}</li>`;
    }
    document.getElementById("posts").innerHTML = out;
}
}


function like_post()
{
    console.log("LIKED");
}