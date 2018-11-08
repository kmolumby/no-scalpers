import React, {Component} from 'react';
import './SearchResults.css'

class SearchResults extends Component {
    constructor() {
        super();

        this.state = {
            searchResultsId : ''
        }

  
    }



    render() {

        const searchResults = this.props.searchResults.map((searchResult, i) =>{
            return (
                <div key={i}>
                    <div>
                        {searchResult.displayName}<br/>
                        <a href={searchResult.uri}>Click Here to Learn More</a>
                    
                    </div>
                </div>

            )
        })


        return (  

            <div >
                <h1>City Search Results</h1>
                <p className="searchResults"><a href=""></a>{searchResults} </p>
            </div>
        )
    }
}

export default SearchResults;