import React, { Component } from 'react'

export default class Username extends Component {
    
    state = {
        text: ""
    }

    onChange(e) {
        this.setState({text: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ""});
        this.props.onSetUserName(this.state.text)
    }
  render() {
    return (
      <div className='Input'>
          <form onSubmit={e => this.onSubmit(e)}>
            <input onChange = {e => this.onChange(e)} value={this.state.text} type="text" placeholder='Enter your username here...' autoFocus = {true}/>
            <button>Set</button>
          </form>
      </div>
    )
  }
}
