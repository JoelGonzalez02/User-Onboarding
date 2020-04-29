import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function Form () {

    const initinalFormState = {
        name: '',
        email: '',
        password: '',
        terms: '',

    };

    const [form, setForm] = useState(initinalFormState);
    const [errors, setErrors] = useState(initinalFormState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [serverError, setServerError] = useState('');
    const [post, setPost] = useState([]);

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field'),
        email: yup.string().email('Please enter a valid email'),
        password: yup.string().required('Please select a password (min 10 characters, max 15)'),
        terms: yup.boolean().oneOf([true])
    });

    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
               setErrors({...errors, [e.target.name]: ''});
          })
          .catch(err => {
              setErrors({...errors, [e.target.name]: err.errors[0]});
          });
    };

    useEffect(() => {
        formSchema.isValid(form)
        .then(valid => {
            setIsButtonDisabled(!valid);
        })
    }, [form]);

    const onSubmit = e => {
        e.preventDefault();

        axios
            .post('https://reqres.in/api/users', form)
            .then(res => {
                setPost(res.data);

            setForm(initinalFormState);
            setServerError(null);
            })
            .catch(err => {
                setServerError(alert('There was a server error'));
            }); 
    };

    const handleChange = e => {
        e.persist();
        const newForm = {
            ...form, [e.target.name] :
            e.target.type === 'checkbox' ?
            e.target.checked : e.target.value
        };
        validateChange(e);
        setForm(newForm);
    };




    return (
        <form onSubmit={onSubmit}>
            {serverError ? <p className='error'>{serverError}</p> : null}
            <label htmlFor='name'>
                Name
                <input 
                    id='name'
                    type='text'
                    placeholder='Enter name'
                    minLength='2'
                    maxLength='25'
                    name='name'
                    onChange={handleChange}
                    value={form.name}
                    />
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor='email'>
                Email 
                <input
                    id='email'
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    maxLength='25'
                    onChange={handleChange}
                    value={form.email}
                    />
                    {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            </label>
            <label htmlFor='password'>
                Password 
                <input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    minLength='10'
                    maxLength='15'
                    onChange={handleChange}
                    value={form.password}
                    />
                    {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>

                    <input className='box'
                    type='checkbox'
                    name='terms'
                    onChange={handleChange}
                    checked={form.terms}
                    /> 

            <label htmlFor='terms' className='terms'>Terms & Conditions</label>
                   
    
            <button type='submit' disabled={isButtonDisabled}>Submit</button>

    
         <pre className='pre'>{JSON.stringify(post, null, 2)}</pre>
        </form>
    );

}