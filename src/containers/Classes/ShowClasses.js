import React from 'react'
// import PropTypes from 'prop-types'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const FADE_TIMEOUT = 200

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})


class ShowClasses extends React.Component {
  constructor() {
    super()
    this.state = {
      hovered: -1
    }
    this.hideIds = {}
    this.showIds = {}
  }

  onHover = (index) => () => {
    // hideId is set by onHoverOut
    clearTimeout(this.hideIds[index])
    this.showIds[index] = setTimeout(() => {
      this.setState({
        [`showButtonsFor${index}`]: true,
        hovered: index
      })
    }, FADE_TIMEOUT / 4)
  }

  onHoverOut = (index) => () => {
    clearTimeout(this.showIds[index])
    if (this.state.hovered === index) {
      this.setState({
        hovered: -1
      })
    }
    this.hideIds[index] = setTimeout(() => {
      this.setState({
        [`showButtonsFor${index}`]: false,
      })
    }, FADE_TIMEOUT)
  }

  /* eslint-disable react/prop-types */
  /**
   * Function to get view of a single class
   */
  getSingleClass = ({ className, subjects, sections }, index) => {
    const { classes } = this.props
    const hovered = this.state.hovered
    return (
      <Grid
        item
        xs={6}
        key={`classList@@${index}`}
        onMouseOver={this.onHover(index)}
        onMouseOut={this.onHoverOut(index)}
      >
        <Paper className={classes.paper} >
          <Grid container alignItems={'center'} spacing={16} >
            <Grid item xs={3} align={'center'} >
              <Typography variant="caption" align="center">
              Class
              </Typography>
              <Typography variant="display2" align="center">
                {className}
              </Typography>
              {
                this.state[`showButtonsFor${index}`] &&
                <Fade
                  timeout={FADE_TIMEOUT}
                  in={this.state[`showButtonsFor${index}`]}
                >
                  <Grid container alignItems={'flex-start'} justify={'flex-start'} >
                    <Grid item xs={5} >
                      <IconButton
                        style={{ width: 36, height: 36 }}
                        className={classes.button}
                        aria-label="Edit"
                      >
                        <EditIcon style={{ fontSize: 18 }} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={5} >
                      <IconButton
                        style={{ width: 36, height: 36 }}
                        className={classes.button}
                        aria-label="Delete"
                      >
                        <DeleteIcon style={{ fontSize: 18 }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Fade>
              }

            </Grid>
            <Grid item xs={9} align={'start'} >
              <Typography variant="caption" gutterBottom align="left">
              Sections
              </Typography>
              <Grid container spacing={8}>
                { sections.map(({ name }) => (
                  <Grid item key={`${className}@@${name}`} >
                    <Chip label={name} className={classes.chip} />
                  </Grid>
                )) }
              </Grid>
              <br />
              <Typography variant="caption" gutterBottom align="left">
              Subjects
              </Typography>
              <Grid container spacing={8}>
                { subjects.map(({ name }) => (
                  <Grid item key={`${className}@@${name}`} >
                    <Chip label={name} className={classes.chip} />
                  </Grid>
                )) }
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
  /* eslint-enable */

  render() {
    console.log(this.props)
    const { classList } = this.props
    return (
      <Grid container spacing={24}>
        {
          classList.map(this.getSingleClass)
        }
      </Grid>
    )
  }
}


ShowClasses.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
  })).isRequired,
}

function mapStateToProperties(state) {
  return state.input
}

export default connect(mapStateToProperties)(withStyles(styles)(ShowClasses))
