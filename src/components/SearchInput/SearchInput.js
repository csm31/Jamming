import React from 'react'

export class SearchInput extends React.Component{
    render(){
        return <input
        aria-label="Search for music"
        type="search"
        onChange={this.props.handleInputChange}
        // placeholder="Enter A Song, Album, or Artist"
        value={this.props.searchValue}
      />
    }
}
