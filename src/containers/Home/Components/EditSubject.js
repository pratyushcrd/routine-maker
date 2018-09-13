import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import SelectTeacher from './SelectTeacher'

const styles = theme => ({
  noPadding: {
    padding: '0 !important',
  },
  subjectName: {
    fontWeight: 400,
  },
  infoDivider: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
    height: '85%',
    marginTop: '-43%',
    marginLeft: '-5%',
  },
  periodsText: {
    marginTop: -theme.spacing.unit * 1,
  },
  divider: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  textRight: {
    textAlign: 'right',
  },
  subjectInfoContainer: {
    padding: 0,
    marginTop: theme.spacing.unit * 1.5,
  },
  subjectInfo: {
    textAlign: 'center',
    fontSize: '15px',
    margin: 'auto',
    display: 'block',
    width: '70%',
  },
  subjectInfoDesc: {
    textAlign: 'center',
    fontSize: '13px',
    color: theme.palette.text.secondary
  },
  actions: {
    // marginTop: theme.spacing.unit * 4
  }
})

/**
 * Component to render Section Details
 */
class EditSubject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogueOpen: false,
      teacherDialogOpen: false,
      teacherId: props.subject.teacherId || '',
      periodsPerWeek: +props.subject.periodsPerWeek || 0,
      commonArea: props.subject.commonArea || '',
      classLength: props.subject.classLength || 1,
      periodsPerWeekSelectOpen: false,
      commonAreaSelectOpen: false,
      classLengthSelectOpen: false,
    }
  }

  // Do certain operations when props change
  componentWillReceiveProps = props => {
    this.setState({
      periodsPerWeek: +props.subject.periodsPerWeek || 0,
      commonArea: props.subject.commonArea || '',
      classLength: props.subject.classLength || 1,
    })
  }

  onSelectChange = name => event => this.setState({
    [name]: event.target.value
  })

  changeTeacher = (teacherId = '') => this.setState({
    teacherId
  })

  changePeriodsPerWeek = (periodsPerWeek = 1) => this.setState({
    periodsPerWeek
  })

  changeClassLength = (classLength = 1) => this.setState({
    classLength
  })

  toggleSelects = (selectName, value) => () => this.setState({
    [selectName]: value
  })

  render() {
    const classes = this.props.classes
    const subject = this.props.subject
    const teachersMap = this.props.teachersMap
    const toggleEdit = this.props.toggleEdit

    const periodsPerWeek = this.state.periodsPerWeek
    const subjectName = subject.subject
    const teacherId = this.state.teacherId || ''
    const commonAreas = [{
      name: '',
    }, ...this.props.commonAreas]

    const teacher = teacherId ? teachersMap[teacherId] : ({})

    const allTeachers = Object.entries(teachersMap)
      .map(arr => arr[1])

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              <TextField
                defaultValue={subjectName}
                className={classes.subjectName}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.textRight}>
                  Class {subject.className} - {subject.section}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <Typography variant="caption" style={{ textAlign: 'center' }}>
                Select Teacher
              </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={9}>
              {/* Select teacher dialog */}
              <SelectTeacher
                teacher={teacher}
                changeTeacher={this.changeTeacher}
                allTeachers={allTeachers}
              />
              {/* <Typography
                className={classes.textRight}
                variant="body1"
                onClick={this.openTeachersDialog}
              >
                {teacherNameText} {teacherPeriodsText}
              </Typography> */}
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.subjectInfoContainer}>
            <Grid item xs={12}>
              <Typography variant="caption">
                Edit details
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                open={this.state.periodsPerWeekSelectOpen}
                onClose={this.toggleSelects('periodsPerWeekSelectOpen', false)}
                onOpen={this.toggleSelects('periodsPerWeekSelectOpen', true)}
                value={this.state.periodsPerWeek}
                onChange={this.onSelectChange('periodsPerWeek')}
                className={classes.subjectInfo}
              >
                {
                  Array(21).fill(0).map((a, i) => a + i).map(val => (
                    <MenuItem key={`@@selPPW-${val}`} value={val}>{String(val)}</MenuItem>
                  ))
                }
              </Select>
              <Typography className={classes.subjectInfoDesc}>
                Periods / Week
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                open={this.state.commonAreaSelectOpen}
                onClose={this.toggleSelects('commonAreaSelectOpen', false)}
                onOpen={this.toggleSelects('commonAreaSelectOpen', true)}
                value={this.state.commonArea}
                onChange={this.onSelectChange('commonArea')}
                className={classes.subjectInfo}
              >
                {
                  commonAreas.map((a) => a.name).map(val => (
                    <MenuItem key={`@@selPPW-${val}`} value={val}>{String(val) || 'None'}</MenuItem>
                  ))
                }
              </Select>
              <Typography className={classes.subjectInfoDesc}>
                Common Area
              </Typography>
              <div className={classes.infoDivider} />
            </Grid>
            <Grid item xs={4}>
              <Select
                open={this.state.classLengthSelectOpen}
                onClose={this.toggleSelects('classLengthSelectOpen', false)}
                onOpen={this.toggleSelects('classLengthSelectOpen', true)}
                value={this.state.classLength}
                onChange={this.onSelectChange('classLength')}
                className={classes.subjectInfo}
                inputProps={{
                  name: 'Hello'
                }}
              >
                {
                  Array(10).fill(1).map((a, i) => a + i).map(val => (
                    <MenuItem key={`@@selCLength-${val}`} value={val}>{val}</MenuItem>
                  ))
                }
              </Select>
              <Typography className={classes.subjectInfoDesc}>
                Class Length
              </Typography>
              <div className={classes.infoDivider} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small" color="primary">
            Save
          </Button>
          <Button size="small" color="primary" onClick={toggleEdit}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    )
  }
}

EditSubject.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  subject: PropTypes.shape({
    teacherId: PropTypes.subject
  }).isRequired,
  teachersMap: PropTypes.shape({}).isRequired,
  toggleEdit: PropTypes.func.isRequired,
  commonAreas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
}

export default withStyles(styles)(EditSubject)
