import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField';

injectTapEventPlugin();

const Address = (props) => (
    <TableRow>
        <TableRowColumn>{props.name}</TableRowColumn>
        <TableRowColumn>{props.emailAddress}</TableRowColumn>
        <TableRowColumn>
            <FlatButton label="Remove" onTouchTap={props.onClick} />
        </TableRowColumn>
    </TableRow>
);

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
            <Paper zDepth={1}>
                <Subheader>Add New Entry</Subheader>
                <TextField hintText="Your Name" floatingLabelText="Name" className="input-field"
                           value={this.state.name}
                           onChange={(event) => this.handleOnChange(event, 'name')} />
                <TextField hintText="sample@example.com" floatingLabelText="Email Address" className="input-field"
                           value={this.state.emailAddress}
                           onChange={(event) => this.handleOnChange(event, 'emailAddress')} />
                <FlatButton className="input-field" label="Add" primary={true}
                            onTouchTap={this.handleOnClick}
                            disabled={!this.getFormIsValid()} />
            </Paper>
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
                <AppBar title="Address Book" showMenuIconButton={false} />
                <AddAddressForm addAddress={this.addAddress}/>
                <Subheader>Entries</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email Address</TableHeaderColumn>
                            <TableHeaderColumn />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {this.state.entries.map((entry) =>
                        <Address {...entry}
                                 onClick={() => this.removeAddress(entry.emailAddress)}
                                 key={entry.emailAddress}
                        />
                    )}
                    </TableBody>
                </Table>
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

const App = () => (
    <MuiThemeProvider>
        <AddressBook/>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);