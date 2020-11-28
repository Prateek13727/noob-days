const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tvShows = require('./src/utilities/tvShowsData');

const port = process.env.PORT || 8000;
const app = express();
const publicPath = __dirname + '/dist';
app.use(express.static(publicPath));

app.get('/netflix', async(req, res) => {
  const {query:{key = ""}} = req;
  const { tvShows: { shows = [] } } = tvShows
  const tvShowsData = shows.filter((tvShow) => {
  	const { title } = tvShow;
  	if(title.toLowerCase().indexOf(key.toLowerCase()) !== -1){
		  return true;
  	}
  	return false;
  });
  if(tvShowsData.length) {
    res.send(tvShowsData);
  } else {
    res.send(shows);
  }
})

app.get('*', (req, res) => {
	res.sendFile(path.resolve(publicPath, 'index.html'));
})

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
