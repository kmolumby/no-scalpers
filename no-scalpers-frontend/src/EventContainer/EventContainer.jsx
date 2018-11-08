import React, {Component} from 'react';
import EventList from './EventList/EventList';
import SearchTerm from './SearchTerm/SearchTerm';
import SearchResults from './SearchResults/SearchResults'

class EventContainer extends Component {
    constructor(){
        super();
        this.state = {
            events: [],
            searchResults: []
        }
    }

    getEvents = async () => {
        try {
            const events = await fetch('https://api.songkick.com/api/3.0/metro_areas/24580/calendar.json?apikey=STzlRsvfup7hHr4s')
           
            const eventsJSON = await events.json();
            // console.log(eventsJSON.resultsPage)
            return eventsJSON

        } catch (err) {
            return err
        }
    }

    componentDidMount () {
        this.getEvents().then((events) => {
            // console.log(events.resultsPage)
          this.setState({events: events.resultsPage.results.event});
        //   console.log('hey')
        }).catch((err) => { 
          console.log(err)
        })
      }
      
      performSearch = async (searchTerm, e) => {
            e.preventDefault();
            try {
                const initialSearchResults = await fetch('https://api.songkick.com/api/3.0/search/locations.json?query='+ searchTerm +' &apikey=STzlRsvfup7hHr4s');
                const initialSearchResultsJSON = await initialSearchResults.json();
                const firstLocation = initialSearchResultsJSON.resultsPage.results.location[0].metroArea.id
                const searchResults = await fetch ('https://api.songkick.com/api/3.0/metro_areas/'+ firstLocation + '/calendar.json?apikey=STzlRsvfup7hHr4s')
                const searchResultsJSON = await searchResults.json();
                console.log(searchResultsJSON, '<-- Search Results')
                // return searchResultsJSON
                this.setState({
                    searchResults: searchResultsJSON.resultsPage.results.event
                })
                console.log(this.state.searchResults , ('results'))
    
            } catch (err) {
                return err
            }
      }

    


      


    render() {
        return(
            <div>
                <SearchTerm performSearch={this.performSearch}/>
                <SearchResults searchResults={this.state.searchResults} />
                {/* <EventList events= {this.state.events}/>  */}
            </div>
        )
    }
}

export default EventContainer;

