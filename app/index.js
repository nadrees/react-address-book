import React from 'react';
import ReactDOM from 'react-dom';

function Address(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.emailAddress}</td>
            <td>
                <button onClick={props.onClick}>Remove</button>
            </td>
        </tr>
    );
}

class AddAddressForm extends React.Component {
    constructor() {
        super();

        this.state = this.getInitialState();

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getFormIsValid = this.getFormIsValid.bind(this);
    }

    render() {
        return (
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="New Name"
                           onChange={(event) => this.handleOnChange(event, 'name')}
                           value={this.state.name} />
                </div>
                <div>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input type="email" id="emailAddress" placeholder="Email Address"
                           onChange={(event) => this.handleOnChange(event, 'emailAddress')}
                           value={this.state.emailAddress} />
                </div>
                <div>
                    <button onClick={this.handleOnClick} disabled={!this.getFormIsValid()}>Add</button>
                </div>
            </form>
        );
    }

    handleOnClick(event) {
        event.preventDefault();

        this.props.addAddress(this.state);
        this.setState(this.getInitialState());
    }

    handleOnChange(event, prop) {
        let newState = {};
        newState[prop] = event.target.value;
        this.setState(newState);
    }

    getFormIsValid() {
        return this.state.name && this.state.emailAddress;
    }

    getInitialState() {
        return {
            name: '',
            emailAddress: ''
        };
    }
}

class AddressBook extends React.Component {
    constructor() {
        super();
        this.state = {
            entries: [
                { name: 'Nathen Drees', emailAddress: 'nadrees@gmail.com' },
                { name: 'Lizzy Mosier', emailAddress: 'lizzymosier@gmail.com' }
            ]
        };

        this.removeAddress = this.removeAddress.bind(this);
        this.addAddress = this.addAddress.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Address Book</h1>
                <AddAddressForm addAddress={this.addAddress}/>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.entries.map((entry) =>
                        <Address {...entry}
                                 onClick={() => this.removeAddress(entry.emailAddress)}
                                 key={entry.emailAddress}
                        />
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    addAddress(address) {
        let entries = this.state.entries.slice();
        entries.push(address);
        this.setState({entries: entries});
    }

    removeAddress(emailAddress) {
        let entries = this.state.entries.slice();
        let entryIndex = this.state.entries.indexOf((entry) => entry.emailAddress === emailAddress);
        entries.splice(entryIndex, 1);
        this.setState({entries: entries});
    }
}

ReactDOM.render(
    <AddressBook/>,
    document.getElementById('container')
);