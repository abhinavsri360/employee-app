import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import AddEmpModal from './AddEmpModal'
import EditEmpModal from './EditEmpModal'

class Employee extends Component {
  constructor (props) {
    super(props)

    this.state = { emps: [], addModalShow: false, editModalShow: false }
  }

  componentDidMount () {
    this.refreshList()
  }

  refreshList () {
    fetch('https://localhost:44325/api/Employee').then(response => response.json())
      .then(data => {
        this.setState({ emps: data })
      })
  }

  componentDidUpdate () {
    this.refreshList()
  }

  deleteEmp (ID) {
    if (window.confirm('Are you sure?')) {
      fetch('https://localhost:44325/api/Employee/' + ID, {
        method: 'DELETE',
        header: { Accept: 'application/json', 'Content-Type': 'application/json' }
      })
    }
  }

  render () {
    const { emps, ID, EmpName, Dept, Mail, DOJ} = this.state
    const addModalClose = () => this.setState({ addModalShow: false })
    const editModalClose = () => this.setState({ editModalShow: false })
    return (
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee Department</th>
              <th>Employee Mail</th>
              <th>Date of joining</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map(emp =>
              <tr key={emp.ID}>
                <td>{emp.ID}</td>
                <td>{emp.EmpName}</td>
                <td>{emp.Dept}</td>
                <td>{emp.Mail}</td>
                <td>{emp.DOJ}</td>
                <td>
                  <ButtonToolbar>
                    <Button className='mr-2' variant='info' onClick={() => this.setState({ editModalShow: true, ID: emp.ID, DeptName: emp.DeptName, Dept: emp.Dept, Mail: emp.Mail, DOJ: emp.DOJ })}>Edit</Button>
                    <Button className='mr-2' variant='danger' onClick={() => this.deleteEmp(emp.ID)}>delete</Button>
                    <EditEmpModal show={this.state.editModalShow} onHide={editModalClose} ID={ID} EmpName={EmpName} Dept={Dept} Mail={Mail} DOJ={DOJ}/>
                  </ButtonToolbar>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Employee</Button>
          <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    )
  }
}

export default Employee
