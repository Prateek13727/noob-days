import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    age: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    const { selectCrypto } = this.props;
    selectCrypto(event.target.value);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  getMenuItems = (menuItems) => {
  	if(menuItems.length) {
  		return menuItems.map((crypto) => {
	  		const { name, key } = crypto;
	  		return <MenuItem key={key} value={key}>{name}</MenuItem>
		})
  	} else {
  		return [<MenuItem key="none" value=""><em>None</em></MenuItem>]
  	}
  }

  render() {
    const { classes, menuItems:dropdownData, defaultValue } = this.props;
    const menuItems = this.getMenuItems(dropdownData);
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
			<InputLabel htmlFor="demo-controlled-open-select">MyCryptos</InputLabel>
			<Select
				open={this.state.open}
				onClose={this.handleClose}
				onOpen={this.handleOpen}
				value={this.state.age}
				onChange={this.handleChange}
				inputProps={{
				  name: 'age',
				  id: 'demo-controlled-open-select',
				}}
			>
    			{menuItems}                     
          	</Select>
    	</FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
