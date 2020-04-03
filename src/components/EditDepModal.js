import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

class EditDepModal extends Component {
  constructor (props) {
    super(props)
    this.state = { snackbaropen: false, snackbarmsg: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  snackbarClose = (event) => {
    this.setState({snackbaropen:false})
  }

  handleSubmit (event) {
    event.preventDefault()

    fetch('https://localhost:44325/api/Department', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: event.target.ID.value,
        DeptName: event.target.DeptName.value
      })
    },
    {
      mode: 'no-cors'
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({snackbaropen:true, snackbarmsg:result})
        //window.alert(result)
      },
      (error) => {
        this.setState({snackbaropen:true, snackbarmsg:'Failed'})
        //window.alert(error)
      })
  }

  render () {
    return (
      <div className='container'>
      <Snackbar 
      anchorOrigin={{vertical: 'center' ,horizontal: 'center' }} 
      open = {this.state.snackbaropen} 
      autoHideDuration = {2000} 
      onClose={this.snackbarClose} 
      message = {<span id="message-id">{this.state.snackbarmsg}</span>}
      action = {[
        <IconButton key="close" arial-label="Close" color="inherit" onClick={this.snackbarClose}>x</IconButton>
      ]}
      />
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
          Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId='ID'>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type='text' name='ID' disabled defaultValue={this.props.ID} placeholder='ID' />
                  </Form.Group>
                  
                  <Form.Group controlId='DeptName'>
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control type='text' name='DeptName' required defaultValue={this.props.DeptName} placeholder='Department Name' />
                  </Form.Group>
                  <Form.Group>
                    <Button variant='primary' type='submit'>Update Department</Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

export default EditDepModal
