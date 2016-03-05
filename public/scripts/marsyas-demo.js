//wrapper container class for the demo
var DemoApp=React.createClass(
	{
		getInitialState:function(){
			return {
				activeNavItemIndex:"Digging",
				data:[]
			}
		},
		//react native function: component initialization function
		componentDidMount:function(){
			//this.setState({data:data});
			this.loadDataFromServer("api/items");
		},
		appNavClickHandler:function(navIndex){
			var tmpListUrl="api/items";
			switch(navIndex){
				case "Digging":
				tmpListUrl="api/items";break;
				case "Wishlist":
				tmpListUrl="api/items/wishlist";break;
				case "Collected":
				tmpListUrl="api/items/collected";break;
				default:
				tmpListUrl="api/items";
			}

			//update data only if user clicked a tab other than current tab
			if(navIndex!=this.state.activeNavItemIndex){
				this.loadDataFromServer(tmpListUrl);
			}

			//update active tab index
			this.setState({activeNavItemIndex:navIndex});			
		},
		loadDataFromServer:function(listUrl){
			$.ajax(
			    {
			      url: listUrl,
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
		render:function(){

			return (
			<div className="col-md-12">
				<Nav onNavClick={this.appNavClickHandler}></Nav>
				<ItemList data={this.state.data}/>
			</div>
			);}
	}
	);

//item list nav components
//switch between different item list view
var Nav=React.createClass({

	//react native method: assign default properties values.
	getDefaultProps:function(){
		return {
			navItems:[
			{index:"Digging", value:"Digging", link:"#"},
			{index:"Wishlist", value:"Wishlist", link:"#"},
			{index:"Collected", value:"Collected", link:"#"}],
			onNavClick:function(){
				console.log("default onclick nav callback");
			}
		};
	},

	getInitialState:function(){
		return {
			activeNavItemIndex:'Digging'
		};
	},

	clickHandler:function(index){
		event.preventDefault();
		this.setState({activeNavItemIndex:index});
		//call click event callback function
		this.props.onNavClick(index);
	},

	render:function(){
		var navItemNodes = this.props.navItems.map(
				function(item){
					return (
						<li role="presentation" key={item.index} className={this.state.activeNavItemIndex==item.value?"active":""}>
							<a href={item.link} onClick={this.clickHandler.bind(this, item.index)}>{item.value}</a>
						</li>
						);
				}, this
			);
		return (
			<ul className="nav nav-tabs nav-justified">
		        {navItemNodes}
      		</ul>
			);
	}

}

	);//end Nav class

//item list component
var ItemList=React.createClass({

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

ReactDOM.render(
  // <CommentBox data={data}/>,
  <DemoApp/>,
  document.getElementById('content')
);

//@sourceURL=marsyas-demo.js