import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

//STYLING IMPORTS
import './App.css';

//COMPONENT IMPORTS
import Story from '../Story/Story';

class App extends Component {
   state = {
      stories: [],
      currentFeedLength: 20
   };

   componentDidMount() {
      this.getNews();
   }

   getNews() {
      axios
         .get('/api/news')
         .then(response => {
            this.props.dispatch({
               type: 'SET_NEWS',
               payload: response.data
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   render() {
      let storyFeed = this.props.news.slice(0, this.state.currentFeedLength).map((story, i) => {
         return <Story key={i} story={story} />;
      });

      return (
         <div className="App">
            <header>
               <h1>HackerNews Feed</h1>
            </header>
            <div className="Feed">{storyFeed}</div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   news: state.news
});

export default connect(mapStateToProps)(App);
