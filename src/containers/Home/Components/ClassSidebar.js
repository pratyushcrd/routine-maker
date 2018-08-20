import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const styles = theme => console.log(theme) || ({
  button: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    fontWeight: 700,
  },
  listButton: {
    width: '90%',
    // display: 'block',
    fontWeight: 700,
    marginTop: theme.spacing.unit * 1,
    minHeight: theme.spacing.unit * 5,
    textAlign: 'center',
    color: theme.palette.grey[500],
  },
  listButtonSelected: {
    color: theme.palette.primary.main,
    fontWeight: 900,
  },
  gap: {
    minHeight: theme.spacing.unit * 2,
    width: '100%',
  }
})

function listClassGetter(classes, activeClass) {
  const normalClass = classes.listButton
  const activeClassName = [classes.listButton, classes.listButtonSelected].join(' ')

  return function (item) {
    if (item.className === activeClass) {
      return activeClassName
    }
    return normalClass
  }
}

const ClassSideBar = (props) => {
  const classesList = props.classesList
  const classes = props.classes
  const activeClass = props.activeClass
  const getClassForListItem = listClassGetter(classes, activeClass)
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
          className={getClassForListItem(detail)}
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
  }).isRequired,
  selectClass: PropTypes.func.isRequired,
  addClass: PropTypes.func.isRequired,
  activeClass: PropTypes.string.isRequired,
}

export default withStyles(styles)(ClassSideBar)
