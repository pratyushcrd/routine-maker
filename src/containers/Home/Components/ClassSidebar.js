import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

const styles = theme => console.log(theme) || ({
  button: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    fontWeight: 700,
    textTransform: 'none',
  },
  listButton: {
    width: '100%',
    fontWeight: 700,
    marginTop: theme.spacing.unit * 0.5,
    minHeight: theme.spacing.unit * 5,
    textAlign: 'center',
    color: theme.palette.grey[500],
    textTransform: 'none',
  },
  listButtonSelected: {
    color: theme.palette.primary.main,
    fontWeight: 900,
  },
  gap: {
    minHeight: theme.spacing.unit * 2,
    width: '100%',
  },
  backPaperContainer: {
    height: '100%',
  },
  backPaper: {
    height: '100%',
    padding: theme.spacing.unit * 0,
    paddingTop: theme.spacing.unit * 1.5,
  },
  createIcon: {
    marginLeft: theme.spacing.unit * 0.75,
    fontSize: 15,
    transform: 'translateY(1.2px)',
  },
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


  return (
    <Grid container className={classes.backPaperContainer}>
      <Grid item xs={10} >
        <Paper className={classes.backPaper}>

          <div className={classes.gap} />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.addClass}
          >
            Add Class
          </Button>

          <div className={classes.gap} />

          {classesList.map(detail => (
            <Button
              key={`@@homechips#${detail.className}`}
              color="primary"
              className={getClassForListItem(detail)}
              onClick={onSelect(detail)}
            >
              {`Class ${detail.className}`}
            </Button>
          ))}

        </Paper>
      </Grid>
    </Grid>
  )
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
