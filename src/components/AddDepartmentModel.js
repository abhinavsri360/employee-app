import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

class AddDepartmentModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    fetch('https://localhost:44325/api/Department', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: null,
        DeptName: event.target.DeptName.value
      })
    },
    {
      mode: 'no-cors'
    })
      .then(res => res.json())
      .then((result) => {
        window.alert(result)
      },
      (error) => {
        window.alert(error)
      })
  }

  render () {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
          Add Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId='DeptName'>
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control type='text' name='DeptName' required placeholder='Department Name' />
                  </Form.Group>
                  <Form.Group>
                    <Button variant='primary' type='submit'>Add Department</Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddDepartmentModel
