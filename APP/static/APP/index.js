document.addEventListener('DOMContentLoaded', function() {
    
    const postsBox = document.getElementById('posts-box');
    const spinerBox = document.getElementById('spinner-box');
    const loadBtn = document.getElementById('load-btn');
    const loadBox = document.getElementById('loading-box');
    
    let visible = 3;

    const likeBtn = `<div class='likes-box'>{% if user.is_authenticated %}{% if request.user in post.likes.all %}<form action={% url 'like' pk=post.id %} method="POST">{% csrf_token %}<input type="submit" value="Unlike"/></form>{% else %}<form action={% url 'like' pk=post.id %} method="post">{% csrf_token %}<input type="submit" value="Like"/></form>{% endif %}{% endif %}Likes: {{post.likes.count}}</div>`
    
    function load_posts()
    {
    var xmlhttp = new XMLHttpRequest();
    var url = `/posts/${visible}`;
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function myFunction(arr) {
       arr.map(post =>{
           postsBox.innerHTML += `<div class='card w-75'>
           ${post.author} | ${post.timestamp}
           <br>
           ${post.content}
           </div>`
       });
    }}
    
    loadBtn.addEventListener('click', ()=>{
        visible += 3;
        spinerBox.classList.remove('not-visible')
        setTimeout(() => {
            load_posts();
            spinerBox.classList.add('not-visible')

        }, 500)
    });
    load_posts();
});

