import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import AddClass from '../Components/AddClass'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    outline: '0 !important',
    padding: theme.spacing.unit * 4,
  },
})

const combineFn = (a, b) => (...params) => a(...params) && b()


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

function AddClassDialog(props) {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.onClose}
    >
      <div style={getModalStyle()} className={props.classes.paper}>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6} >
            <AddClass
              classList={props.classList}
              addClass={combineFn(props.addClass, props.onClose)}
            />
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

AddClassDialog.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addClass: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
}

export default withStyles(styles)(AddClassDialog)
