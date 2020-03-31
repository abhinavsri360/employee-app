import React, { Component } from 'react'
import { Table , Button, ButtonToolbar } from 'react-bootstrap'
import AddDepartment from './AddDepartmentModel'

class Department extends Component {
  constructor (props) {
    super(props)

    this.state = { deps: [], addModalShow: false }
  }

  componentDidMount () {
    this.refreshList()
  }

  refreshList () {
    fetch('https://localhost:44325/api/Department').then(response => response.json())
      .then(data => {
        this.setState({ deps: data })
      })
  }

  render () {
    const { deps } = this.state
    const addModalClose = () => this.setState({ addModalShow: false })
    return (
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thred>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
            </tr>
          </thred>
          <tbody>
            {deps.map(dep =>
              <tr key={dep.ID}>
                <td>{dep.ID}</td>
                <td>{dep.DeptName}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Department</Button>
          <AddDepartment show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    )
  }
}

export default Department
