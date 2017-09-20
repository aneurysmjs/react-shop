import React from 'react';

export default class Searcher extends React.Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-xs-12 col-sm-4 col-md-4'>
          <h5 className='text-center'>Search Movies</h5>
          <form name='searcher' onSubmit={this.search}>
            <div className='form-group'>
              <label htmlFor='searcher' className='sr-only'>Just type</label>
              <input
                type='text'
                id='searcher'
                className='form-control'
                name='searcher'
                placeholder='Type...'
                value={this.props.searchTerm}
                onChange={this.search} />
            </div>
          </form>
        </div>
      </div>
    );
  }

  /**
   * pass data to parent component
   *
   * @param {SyntheticEvent} evt - the event that comes from the input
   * @return {void}
   */
  search(evt) {
    this.props.onSearch(evt.target.value);
  }
  
}