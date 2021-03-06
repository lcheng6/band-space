//Here we grab React, and peel component out of the library using ES6 syntax.
import React, { Component } from 'react'

import { Spinner, ResultsList, SearchBar } from '../../../components'

class VenueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddVenue: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Get list of venues from database when component is mounting
  // Draw list of components
  componentDidMount() {
    this.props.getVenueList();
    this.props.changeSearchType({target:{value:'venues'}});
  }

  handleSubmit(values) {
    this.props.addVenue(values);
  }

  render() {
    if (this.props.isLoading) return (<Spinner />)

    return (
      <div>
        <div className="splash">
          <SearchBar />
        </div>

        <ResultsList />
      </div>
    );
  }
}
export default VenueList;
