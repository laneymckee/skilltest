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
      console.log('Getting Hacker News...');
      axios
         .get('/api/news')
         .then(response => {
            this.props.dispatch({
               type: 'SET_NEWS',
               payload: response.data
            });
            this.setFeed(response.data);
         })
         .catch(err => {
            console.log(err);
         });
   }

   setFeed(storyIds) {
      for (let index = 0; index < this.state.currentFeedLength; index++) {
         this.getStory(storyIds[index]);
         if (index = this.state.currentFeedLength) {
            this.props.dispatch({
               type: 'SET_CURRENT_FEED',
               payload: this.state.stories
            });
         }
      }
   }

   getStory(id) {
      console.log('Getting story...');
      axios
         .get(`/api/story/${id}`)
         .then(response => {
            console.log(response.data);
            this.setState(() => {
               stories: this.state.stories.push(response.data);
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   render() {
      let storyFeed = this.state.stories.map((story, i) => {
         return <Story key={i} story={story} />;
      });

      return (
         <div className="App">
            <header>
               <h1>HackerNews Feed</h1>
            </header>
            <body>{storyFeed}</body>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   news: state.news,
   stories: state.currentFeed
});

export default connect(mapStateToProps)(App);
