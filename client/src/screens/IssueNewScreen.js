import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'
import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import StyledTitle from '../components/layout/StyledTitle'
import TextFieldGroup from '../components/common/TextFieldGroup'
import StyledButtonRight from '../components/layout/StyledButtonRight'
import StyledButton from '../components/common/StyledButton'
import BackButton from '../components/common/BackButton'

import { createIssue } from '../actions/issuesActions'

class IssueNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      description: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const { user } = this.props.auth

    const newIssue = {
      name: this.state.name,
      description: this.state.description,
      user: user.id,
      avatar: user.avatar
    }

    this.props.createIssue(newIssue)
    this.setState({
      text: '',
      description: ''
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { errors } = this.state
    return (
      <StyledPage>
        <BackButton path={'/profile'} />
        <StyledNarrowSection>
          <h1>New Issue</h1>
          <form onSubmit={this.onSubmit}>
            <div>
              <p>Title of the Issue</p>
              <TextFieldGroup
                placeholder=''
                name='name'
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <p>Description</p>
              <TextFieldGroup
                placeholder=''
                name='description'
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />
            </div>
            <StyledButtonRight>
              <StyledButton big type='submit'>
                Publish
              </StyledButton>
            </StyledButtonRight>
          </form>
        </StyledNarrowSection>
      </StyledPage>
    )
  }
}

IssueNew.propTypes = {
  auth: PropTypes.object.isRequired,
  createIssue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  issues: state.issues,
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createIssue }
)(IssueNew)
