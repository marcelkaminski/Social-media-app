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
ReactDOM.render(<Posts url={url}/>, domContainer);
