document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function(e) {
        e.preventDefault();
        const name = document.querySelector('#user-name').value.toLowerCase();
        document.querySelector("#search-result").innerHTML = "";
        var xmlhttp = new XMLHttpRequest();
        var url = `/search/${name}`;
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
            if (Object.keys(arr[0]) == "message") 
            {
                out = "<h1>User not found</h1>"
            } 
            else 
            {
                for(i = 0; i < arr.length; i++) 
                {
                    out += `<li><a href="/profile/${arr[i]['username']}">${arr[i]['username']}</a></li>`;
                }             
            }
            document.getElementById("search-result").innerHTML = out;
        }
        }
});
