import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import AddDepartment from './AddDepartmentModel'
import EditDepModal from './EditDepModal'

class Department extends Component {
  constructor (props) {
    super(props)

    this.state = { deps: [], addModalShow: false, editModalShow: false }
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

  componentDidUpdate () {
    this.refreshList()
  }

  deleteDep (ID) {
    if (window.confirm('Are you sure?')) {
      fetch('https://localhost:44325/api/Department/' + ID, {
        method: 'DELETE',
        header: { Accept: 'application/json', 'Content-Type': 'application/json' }
      })
    }
  }

  render () {
    const { deps, ID, DeptName } = this.state
    const addModalClose = () => this.setState({ addModalShow: false })
    const editModalClose = () => this.setState({ editModalShow: false })
    return (
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {deps.map(dep =>
              <tr key={dep.ID}>
                <td>{dep.ID}</td>
                <td>{dep.DeptName}</td>
                <td>
                  <ButtonToolbar>
                    <Button className='mr-2' variant='info' onClick={() => this.setState({ editModalShow: true, ID: dep.ID, DeptName: dep.DeptName })}>Edit</Button>
                    <Button className='mr-2' variant='danger' onClick={() => this.deleteDep(dep.ID)}>delete</Button>
                    <EditDepModal show={this.state.editModalShow} onHide={editModalClose} ID={ID} DeptName={DeptName} />
                  </ButtonToolbar>
                </td>
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
