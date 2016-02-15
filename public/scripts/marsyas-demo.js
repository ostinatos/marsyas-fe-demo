//item list component
var ItemList=React.createClass({

	loadDataFromServer:function(){
		$.ajax(
		    {
		      url: this.props.url,
		      dataType: 'json',
		      cache: false,
		      success: function(data){
		        this.setState({data: data});//set returned data to component state
		      }.bind(this),
		      error: function(xhr, status, err){
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    }
      	);
	},
	//react native function: component initialization function
	componentDidMount:function(){
		//this.setState({data:data});
		this.loadDataFromServer();
	},

	//react native function: initialize state, before componentDidMount
	getInitialState:function(){
		//this is crucial, without this the render() method will throw error, because this.state.data will be undefined
		return {data:[]};
	},

	render:function(){
		//list of item nodes
		var itemNode = this.state.data.map(
			function(item){
				return (
<div  className="row list-group-item" key={item.id}>
	<div className="col-md-2 col-sm-2">
		<img src={item.imgSrc} alt="..."/>
	</div>
	<div className="col-md-6 col-sm-6">
		<h4 className="list-group-item-heading">{item.albumName}</h4>
		<p className="list-group-item-text">{item.artist}</p>
		<p className="list-group-item-text">{item.releaseDate}</p>
		<p className="list-group-item-text">{item.label}</p>
		
	</div>
</div>
					);
			}
			);

		return (
<div className="container">
      <div className="list-group">
        {itemNode}
      </div>
    </div>
			);
	}
});

var data = [{
	id: "1",
	albumName: "Wave Function Collapse",
	imgSrc: "http://img6.douban.com/mpic/s28271478.jpg",
	artist: "Broken Thoughts",
	releaseDate: "2015",
	label:"Self-Released"
},
{
	id: "2",
	albumName: "Polaris",
	imgSrc: "http://img3.douban.com/mpic/s28313901.jpg",
	artist: "Tesseract",
	releaseDate: "2015",
	label:"Self-Released"
}];

ReactDOM.render(
  // <CommentBox data={data}/>,
  <ItemList url="api/items"/>,
  document.getElementById('content')
);