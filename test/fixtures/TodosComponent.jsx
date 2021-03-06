import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TodosTable from './TodosTable'
import propType from '../../lib/propType'

export default function withResource (resource) {
  class TodosComponent extends React.Component {
    constructor () {
      super()
      this.handleFetch = this.handleFetch.bind(this)
      this.handleReset = this.handleReset.bind(this)
    }

    handleFetch () {
      return this.props.fetch({ id: this.props.id })
    }

    handleReset () {
      return this.props.reset({ reset: true })
    }

    render () {
      const { resource } = this.props
      return (
        <div id='root'>
          <div>
            <button id='refresh' disabled={!resource.ready} onClick={this.handleFetch}>Refresh</button>
            <button id='reset' disabled={!resource.ready} onClick={this.handleReset}>Reset</button>
          </div>
          <TodosTable resource={resource} />
        </div>
      )
    }
  }

  TodosComponent.propTypes = {
    resource: propType,
    fetch: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }

  function mapStateToProps (state) {
    return { resource: resource(state) }
  }

  function mapDispatchToProps (dispatch) {
    return bindActionCreators({
      fetch: resource.fetch,
      create: resource.create,
      destroy: resource.destroy,
      reset: resource.reset
    }, dispatch)
  }

  return connect(mapStateToProps, mapDispatchToProps)(TodosComponent)
}
