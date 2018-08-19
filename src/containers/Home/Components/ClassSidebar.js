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

})

const ClassSideBar = (props) => {
  const classesList = props.classesList
  const classes = props.classes
  const onSelect = detail => () => props.selectClass(detail)
  return (<Grid container>
    <Grid item xs={12} >
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" gutterBottom>
                    School
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.addClass}
          >
            Add Class
          </Button>
          {classesList.map(detail => (
            <div
              key={`@@homechips#${detail.className}`}
            >
              <ListItem
                button
                onClick={onSelect(detail)}
              >
                <ListItemText primary={`Class ${detail.className}`} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </Grid>
      </Grid>

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
