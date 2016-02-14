//item list component
var ItemList=React.createClass({
	componentDidMount:function(){
		this.setState({data:data});
	},

	render:function(){
		//list of item nodes
		var itemNode = this.props.data.map(
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
  <ItemList data={data}/>,
  document.getElementById('content')
);