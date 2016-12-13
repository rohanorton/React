/*
 * Get a user from the GitHub API using React JS and Vanilla JS
 */

// create a navbar (for demo purposes only)
var NavBar = React.createClass({
  render: function() {
    var title = 'React GitHub API Users'
    var root = window.location;
    var pages = ['home', 'services', 'portfolio', 'team', 'contact'];
    var navLinks = pages.map(function(page, index){
      return (
        <li key={'item_' + index}>
          <a href={root + page}>{page}</a>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
              <a className="navbar-brand" href="/React-page/">{title}</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {navLinks}
            </ul>
          </div>

        </div>
      </nav>
    );
  }
});


// Explain to the user what to do
var Intro = React.createClass({
  render: function() {
    return (
      <p>Enter a GitHub username in the input fields below and click the submit button to see the user profile.</p>
    );
  }
});

// get the GitHub API link
var gitHubAPI = {
  url: 'https://api.github.com/users/'
}

// Get the user and render the DOM elements for
// the input field and button
var UserForm = React.createClass({
  getUser: function(event) {

    // Prevent form from attempting HTTP request
    event.preventDefault();

    var input = document.getElementById('username');
    // append the username on based on the
    // value of the input field
    var url = gitHubAPI.url + input.value;
    this.props.onSubmit(url);
  },
  render: function() {
    return (
    <form id="userForm" className="form-inline" onSubmit={this.getUser}>
      <input type="text" id="username" className="form-control" defaultValue="rohanorton"/>
      <input type="submit" className="btn btn-default" value="Get User"/>
    </form>
    );
  }
});

var App = React.createClass({

  getInitialState: function () {
    return {
      user: null
    };
  },

  onFormSubmit: function (url) {
    var that = this;

    getJson(url, function (data) {

      that.setState({ user: data });

      ReactDOM.render(
        <UserDetails login={data.login} avatar={data.avatar_url} bio={data.bio} link={data.html_url} />,
        document.getElementById('mainPane')
      );
    });
  },

  render: function () {
    return (
      <div>

        <NavBar />

        {/* Left sidebar */}
        <div id="page">
          <div className="container">
            <Intro />
            <div className="row">
              <div className="col-md-4">
                <div id="leftPane">

                  <UserForm onSubmit={this.onFormSubmit} />

                </div>
              </div>
              <div className="col-md-8">
                <div id="mainPane">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

var UserDetails = React.createClass({
 render: function() {
   return (
     <div className="user-details">
      <h1>{this.props.login}</h1>
      <img className="img-responsive img-thumbnail" width="300" height="300" src={this.props.avatar}/>
      <p>{this.props.bio}</p>
      <a className="btn btn-primary" href={this.props.link} target="_blank">View Full Profile</a>
     </div>
   );
 }
});

// Ajax GET request
function getJson(url, callback) {
  var xhttp, jsonData, parsedData;

  // check that we have access to XMLHttpRequest
  if(window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

     // get the data returned from the request...
     jsonData = this.responseText;
     // ...and parse it
     parsedData = JSON.parse(jsonData);

     callback(parsedData);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
