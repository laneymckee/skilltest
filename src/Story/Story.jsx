import React, { Component } from 'react';

class Story extends Component {
   render() {
      return (
         <div key={this.props.story.id} className="Story">
            <a href={this.props.story.url}>
               <h2>{this.props.story.title}</h2><br/>
            <h3>{this.props.story.by}</h3>
            <p>{this.props.story.text}</p>
            </a>
         </div>
      );
   }
}

export default Story;
