import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class Department extends Component {
  constructor (props) {
    super(props)

    this.state = { deps: [] }
  }

  componentDidMount () {
    this.refreshList()
  }

  refreshList () {
    this.setState({
      deps: [{ DepartmentID: 1, DepartmentName: 'IT' },
        { DepartmentID: 2, DepartmentName: 'Biotech' }]
    })
  }

  render () {
    const { deps } = this.state
    return (
      <Table className='mt-4' striped bordered hover size='sm'>
        <thred>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
          </tr>
        </thred>
        <tbody>
          {deps.map(dep =>
            <tr key={dep.DepartmentID}>
              <td>{dep.DepartmentID}</td>
              <td>{dep.DepartmentName}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

export default Department
