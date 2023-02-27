import React from 'react'

class todoDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        },
            this.handleChange = this.handleChange.bind(this)
    }
    render() {
        return (
            <div>
                <form>
                    <label htmlFor='id'>Input Item</label>
                    <input type={Text} id="id" onChhandleChangeange={this.handleChange} value={this.state.text} />
                    <button >submit</button>
                    <br />
                    <p>{this.state.text}</p>
                </form>
            </div>
        )
    }
}

export default todoDemo
