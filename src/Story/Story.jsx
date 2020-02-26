import React, { Component } from 'react';
import axios from 'axios';

class Story extends Component {
   state = {
      title: '',
      author: '',
      time: '',
      url: ''
   };

   componentDidMount() {
      this.getStory(this.props.story);
   }

   getStory(id) {
      axios
         .get(`/api/story/${id}`)
         .then(response => {
            this.setState({
               title: response.data.title,
               author: response.data.by,
               time: this.formatTime(response.data.time),
               url: response.data.url
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   formatTime(time) {
      let unix_timestamp = time;

      var date = new Date(unix_timestamp * 1000);
      var hours = date.getHours();
      var minutes = '0' + date.getMinutes();
      var seconds = '0' + date.getSeconds();

      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      return formattedTime;
   }

   render() {
      return (
         <div key={this.props.story} className="Story">
            <a href={this.state.url}>
               <h2>{this.state.title}</h2>
            </a>
            <h3>{this.state.author}</h3>
            <p>{this.state.time}</p>
         </div>
      );
   }
}

export default Story;
