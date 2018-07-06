import React, { Component } from 'react';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      names: [
        {
          title: "avengers"
        },
        {
          title: "batman"
        },
        {
          title: "superman"
        },
        {
          title: "dareDevil"
        }
      ],
      filteredNames: [],
      selectedNames: [],
      highlightedName: ""
    }
  }


  onSelectName(name) {
    const { selectedNames } = this.state;
    const taggedNames = selectedNames.filter( str => str === name.title)
    if (!taggedNames.length) {
      selectedNames.push(name.title)
    }
    this.setState({
      selectedNames
    })
  }

  onDeselectName(name) {
    const { selectedNames } = this.state;
    const taggedNames = selectedNames.filter( str => str !== name)
    this.setState({
      selectedNames: taggedNames
    })
  }

  renderSelectedElements() {
    const { selectedNames, highlightedName } = this.state;
    return selectedNames.map((name) => {
        const className = highlightedName === name ? 'highlightedButton' : 'button';
        return  <span><button className={className} >{name}</button><button key={name} onClick={() => this.onDeselectName(name)}>X</button></span>
    });

  }

  renderList() {
    let { names, filteredNames } = this.state;
    if (!filteredNames.length) {
      filteredNames = names
    }
    return filteredNames.map((name) => {
        return  <li key={name.title} onClick={() => this.onSelectName(name)}>{name.title}</li>
    });
  }

  onChange(event) {
    const { names } = this.state;
    const chars = event.target.value;
    const filteredNames = names.filter((name) => {
      const {title} = name;
      return title.indexOf(chars) !== -1
    })
    this.setState({
      filteredNames
    })
  }

  onKeyDown(event) {
    const { selectedNames, highlightedName } = this.state;
    if(event.target.value !== "") {
      return
    }
    if (event.keyCode === 8) {
      if (highlightedName) {
        this.onDeselectName(highlightedName)
        this.setState({
          highlightedName: ""
        })
      } else if(selectedNames.length) {
        const highlightedName = selectedNames[selectedNames.length - 1]
        this.setState({
          highlightedName
        })
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="dropdown col-md-2">
          <div id="myDropdown" className="dropdown-content">
            <input
              type="text"
              placeholder="Search.."
              id="myInput"
              onKeyDown={this.onKeyDown.bind(this)}
              onChange={this.onChange.bind(this)}/>
            {this.renderList()}
          </div>
        </div>
        <div className="col-md-10">
          {this.renderSelectedElements()}
        </div>
      </div>
    );
  }
}
