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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Author</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts && this.state.posts.map(post => {
                        return <tr>
                            <td>{post.id}</td>
                            <td>{post.author}</td>
                            <td>{post.content}</td>
                        </tr>
                    })}
                </tbody>
            </table>
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



