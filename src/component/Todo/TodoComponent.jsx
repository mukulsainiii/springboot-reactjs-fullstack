import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { retrieveTodo, createTodoApi, updateTodoApi } from './API/HelloWorldApi';
import { Formik, Field, ErrorMessage, Form } from 'formik'
import moment from 'moment'

function TodoComponent() {
    const { id } = useParams()
    const { username } = useAuth()
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [dueDate, setTargetDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => { 
        retrieve();
    }, [id])
    
    function retrieve() {
        if (id !== '-1') {
            retrieveTodo(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTitle(response.data.title)
                    setTargetDate(response.data.dueDate)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            "id": id,
            "username": username,
            "description": values.description,
            "title": values.title,
            "dueDate": values.dueDate,
        }

        if (id === '-1') {
            createTodoApi(username, todo)
                .then(response => {
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(response => {
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 5) {
            errors.description = 'Enter a valid description'
        }
        if (!values.title) {
            errors.title = 'Enter a valid title'
        }
        if (!values.dueDate || !moment(values.dueDate).isValid()) {
            errors.dueDate = 'Enter a valid due date'
        }
        return errors;
    }

    return (
        <div className='container'>
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{ description, title, dueDate }}
                    enableReinitialize={true} onSubmit={onSubmit}
                    validate={validate} validateOnChange={false} 
                    validateOnBlur={false}>
                    {(props) => (
                        <Form>
                            <ErrorMessage name='description' component='div' className='alert alert-warning'/>
                            <ErrorMessage name='title' component='div' className='alert alert-warning'/>
                            <ErrorMessage name='dueDate' component='div' className='alert alert-warning'/>
                            <fieldset className='form-group'>
                                <label>Description</label>
                                <Field type='text' className='form-control' name='description'></Field>
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Title</label>
                                <Field type='text' className='form-control' name='title'></Field>
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Due Date</label>
                                <Field type='date' className='form-control' name='dueDate'></Field>
                            </fieldset>
                            <div>
                                <button className='btn btn-success m-5' type='submit'>Save</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default TodoComponent
