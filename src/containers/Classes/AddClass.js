import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import 'react-select/dist/react-select.css'
import SelectWrapped from '../common/SelectWrapped'

const suggestions = [
  {
    value: 'mh123',
    label: 'Rakesh Kumar',
  }, {
    value: 'mh124',
    label: 'Byomkesh Kumar',
  }, {
    value: 'mh125',
    label: 'Mahesh Kumar',
  }
]

const styles = {}

class AddClass extends React.Component {
  state = {
    single: null,
    multi: null,
    multiLabel: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    })
  };

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.single}
          onChange={this.handleChange('single')}
          placeholder="Search a country (start with a)"
          id="react-select-single"
          inputProps={{
            classes,
            name: 'react-select-single',
            instanceId: 'react-select-single',
            simpleValue: true,
            options: suggestions,
          }}
        />
      </div>
    )
  }
}

AddClass.defaultProps = {
  classes: {}
}

AddClass.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(AddClass)
