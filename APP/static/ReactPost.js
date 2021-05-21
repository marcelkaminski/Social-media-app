class Posts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
      };
    }

    componentDidMount() {
    // get all entities - GET
    fetch(`${this.props.url}`, {
    "method": "GET",
    })
    .then(response => response.json())
    .then(response => {
    this.setState({
    posts: response
    })
    })
    .catch(err => { console.log(err); 
    });
    }

    render() {
        return (

                <div>
                    {this.state.posts && this.state.posts.map(post => {
                        return <div class="card w-75">
                                    <div class="card-header">
                                    {post.author} | {post.timestamp} | {post.id}
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">{post.content}</p>
                                        <img class="card-img-bottom" src={post.image} alt="Card image cap"></img><br/>
                                        <a href="#" class="btn btn-primary">Like</a>
                                    </div>
                                </div>
                    })}
                </div>

        );
    }
}

let domContainer = document.querySelector('#App');
ReactDOM.render(<Posts url={url}/>, domContainer);
