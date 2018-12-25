/* eslint-disable react/no-multi-comp */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'


const styles = theme => ({
  select: {
    width: '100%'
  }
})

class SelectTeacher extends React.Component {
  state = {
    teacher: '',
    open: false,
  }

  componentWillReceiveProps = props => {
    this.setState({
      teacher: props.teacher,
    })
  }

  onChange = (event) => {
    let value = event.target.value

    // garbage value should not be sent
    if (value === '@@garbage@@') {
      value = ''
    }

    this.props.changeTeacher(value)
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { classes, allTeachers, teacher } = this.props
    const teacherId = teacher.id || '@@garbage@@'
    const teachers = [{
      name: 'None',
      id: '@@garbage@@',
    }, ...allTeachers]

    return (
      <Select
        open={this.state.open}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        value={teacherId}
        onChange={this.onChange}
        className={classes.select}
        inputProps={{
          name: 'Hello'
        }}
      >
        {
          teachers.map(curTeacher => (
            <MenuItem key={`@@selTeacher-${curTeacher.id}`} value={curTeacher.id}>{curTeacher.name}</MenuItem>
          ))
        }
      </Select>
    )
  }
}

SelectTeacher.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  allTeachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  teacher: PropTypes.shape({}).isRequired,
  changeTeacher: PropTypes.func.isRequired,
}

export default withStyles(styles)(SelectTeacher)
