import React from 'react';
import './App.css';
import Table from '../components/Table/Table';
import LoadButton from '../components/Button/LoadButton'

export default class App extends React.Component {
  url = {
    small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    big: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
  };
  rowsOnPage = 50;
  state = {
    tableData: {
      data: [],
      currentPage: 1,
      pageCount: Math.ceil(this.tableData.data.length / this.rowsOnPage)
    },
    isLoading: false
  };
  getJSON = url => {
    this.setState({ isLoading: true });
    this.loadJSON(url)
      .then(res => {
        console.log(res);
        this.setState({ data: res, isLoading: false })
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  };

  loadJSON = url => {
    return fetch(url)
      .then(res => res = res.json())
      .then(data => data)
      .catch(err => console.error(err));
  };

  render() {
    let loginStatus;
    if (this.state.isLoading) {
      loginStatus = <p>Loading...</p>
    } else {
      loginStatus = <p>Not loading.</p>
    }

    let table;
    if (Object.keys(this.state.data).length !== 0) {
      table = <Table data={this.state.data} />;
    } else {
      table = null;
    }

    return (
      <div className="App">
        <LoadButton type='small' clicked={this.getJSON.bind(this, this.url.small)} />
        <LoadButton type='big' clicked={this.getJSON.bind(this, this.url.big)} />
        {loginStatus}
        {table}
      </div>
    );
  }
}

