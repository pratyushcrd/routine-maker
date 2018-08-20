import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  button: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    fontWeight: 700,
  },
  listButton: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    fontWeight: 700,
    marginTop: theme.spacing.unit * 1,
    minHeight: theme.spacing.unit * 5,
    textAlign: 'center',
    color: '#9499a2',
  },
  gap: {
    minHeight: theme.spacing.unit,
    width: '100%',
  }
})

const ClassSideBar = (props) => {
  const classesList = props.classesList
  const classes = props.classes
  const onSelect = detail => () => props.selectClass(detail)
  return (<Grid container>
    <Grid item xs={11} >

      <Button
        variant="contained"
        
        color="primary"
        className={classes.button}
        onClick={props.addClass}
      >
            NEW CLASS
      </Button>

      <div className={classes.gap} />

      {classesList.map(detail => (
        <Button
          key={`@@homechips#${detail.className}`}
          
          color="primary"
          className={classes.listButton}
          onClick={onSelect(detail)}
        >
          {`CLASS ${detail.className}`}
        </Button>
      ))}

    </Grid>
  </Grid>)
}

ClassSideBar.propTypes = {
  classesList: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string.isRequired
    })
  ).isRequired,
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired
  }).isRequired,
  selectClass: PropTypes.func.isRequired,
  addClass: PropTypes.func.isRequired
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(ClassSideBar))
