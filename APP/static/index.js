class Posts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
      };
    }

    updateState(url) {
    console.log(url);
    // get all entities - GET
    fetch(`${url}`, {
    "method": "GET",
    })
    .then(response => response.json())
    .then(response => {
    this.setState({
        posts: [...this.state.posts, response[0], response[1], response[2]]
    })
    })
    .catch(err => { console.log(err); 
    });
    }

    render() {
        return (
            
                <div>
                    {this.state.posts && this.state.posts.map(post => {
                        if(post.image != null)
                        {
                            return <div class="card w-75">
                                        <div class="card-header">
                                        {post.author} | {post.timestamp} | {post.id}
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">{post.content}</p>
                                            <img class="card-img-bottom" src={post.image} alt="Card image cap"></img><br/>
                                        </div>
                                    </div>
                        }
                        else
                        {
                            return <div class="card w-75">
                                        <div class="card-header">
                                        {post.author} | {post.timestamp} | {post.id}
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">{post.content}</p>
                                        </div>
                                    </div>
                        }

                    })}
                </div>

        );
    }
}

    let domContainer = document.querySelector('#App');
    var feed = ReactDOM.render(<Posts/>, domContainer);

    const spinerBox = document.getElementById('spinner-box');
    const loadBtn = document.getElementById('load-btn');
    
    let visible = 3;
    
    function load_posts()
    {
    var url = `/posts/${visible}`;

    feed.updateState(url);

    }

    
    loadBtn.addEventListener('click', ()=>{
        visible += 3;
        spinerBox.classList.remove('not-visible')
        setTimeout(() => {
            load_posts();
            spinerBox.classList.add('not-visible')

        }, 500)
    });
    load_posts();



