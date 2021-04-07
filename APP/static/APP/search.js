document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function() {
        const name = document.querySelector('#user-name').value.toLowerCase();
        document.querySelector("#search-result").innerHTML = "";

        fetch(`search/${name}`)
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
        })
        .catch(error => {
            console.log('Error:', error);
        });
        return false;
    }
});
