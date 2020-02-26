import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import BottomScrollListener from 'react-bottom-scroll-listener';

//STYLING IMPORTS
import './App.css';

//COMPONENT IMPORTS
import Story from '../Story/Story';

class App extends Component {
   state = {
      feedLength: 20
   };

   componentDidMount() {
      setInterval(this.getNews.bind(this), 5000);
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

   handleBottomReached() {
      // this.setState({
      //    feedLength: this.state.feedLength + 10
      // });
      console.log('Queuing up more stories...');
   }

   render() {
      let storyFeed = this.props.news.slice(0, this.state.feedLength).map((story, i) => {
         return <Story key={i} story={story} />;
      });

      return (
         <div className="App">
            <header>
               <h1>HackerNews Feed</h1>
            </header>
            <BottomScrollListener onBottom={this.handleBottomReached}>
               {scrollRef => (
                  <div ref={scrollRef} className="Feed">
                     {storyFeed}
                  </div>
               )}
            </BottomScrollListener>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   news: state.news
});

export default connect(mapStateToProps)(App);
