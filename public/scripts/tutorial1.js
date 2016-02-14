// tutorial1.js
// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    // return (
    //   <div className="commentList">
    //     Hello, world! I am a CommentList.
    //     // <Comment author="Pete Hunt">This is one comment</Comment>
    //     // <Comment author="Jordan Walke">This is *another* comment</Comment>
    //   </div>
    // );

  // var commentNode = this.props.data.map(function(comment){
	var commentNode = this.props.data.map(function(comment){
		//anonymous function to define the mapping between pass-in data and template
		return (
			<Comment author={comment.author} key={comment.id}>
				{comment.text}
			</Comment>
			); 
	});

	return (
		<div className="CommentList">
		{commentNode}
		</div>
		);
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  loadDataFromServer:function(){
    $.ajax(
    {
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    }
      );
  },
  getInitialState: function() {
    return {data: [{id:3,author:"jarrod Alonge", text:"first world tragedy"}]};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
    //setInterval(this.loadDataFromServer, this.props.pollInterval);
  },
  handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />

        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});



// var Comment = React.createClass({
//   render: function() {
//     return (
//       <div className="comment">
//         <h2 className="commentAuthor">
//           {this.props.author}
//         </h2>
//         {marked(this.props.children.toString())}
//       </div>
//     );
//   }
// });

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var data = [
  {id: 1, author: "Rob Scallon", text: "But does it DJENT?"},
  {id: 2, author: "Rick Riffson", text: "This is *NOT* djent"}
];

ReactDOM.render(
  // <CommentBox data={data}/>,
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
