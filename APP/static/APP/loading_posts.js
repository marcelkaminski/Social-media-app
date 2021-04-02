document.addEventListener('DOMContentLoaded', function() {
    load_posts();
  });

function load_posts()
{
    fetch('/posts')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(element => {
            var item = document.createElement("div");
            var myJSON = JSON.stringify(element);
            item.innerHTML = `<div>
                ${myJSON}
                </div>`;
          document.querySelector("#posts").appendChild(item);
        });
    });
}
