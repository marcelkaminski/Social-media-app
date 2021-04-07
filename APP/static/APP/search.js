document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function() {
        const name = document.querySelector('#user-name').value.toLowerCase();
        document.querySelector("#search-result").innerHTML = "";

        // Send a GET request to the URL
        fetch(`search/${name}`)
        // Put response into json form
        .then(response => response.json())
        .then(data  => {
            data.forEach(element => {
                var item = document.createElement("div");
                var myJSON = JSON.stringify(element);
                item.innerHTML = `<div>
                    ${myJSON}
                    </div><br>`;
              document.querySelector("#search-result").appendChild(item);
            });
            // Get currency from user input and convert to upper case
            //const currency = document.querySelector('#currency').value.toUpperCase();

            console.log(data)
        })
        // Catch any errors and log them to the console
        .catch(error => {
            console.log('Error:', error);
        });
        // Prevent default submission
        return false;
    }
});
