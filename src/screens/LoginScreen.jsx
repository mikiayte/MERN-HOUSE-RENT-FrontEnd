import { useEffect, useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux'
import {Navbar , Nav, Container} from 'react-bootstrap';
import {FaSignOutAlt} from 
'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import { useLoginMutation } from '../slices/userApiSlice';

import { setCredentials } from '../slices/authSlice';

import {toast} from 'react-toastify';

import Loader from '../components/Loader'

const LoginScreen = () => {
   const [email, setEmail] = useState('');

   const [password, setPassword] = useState('');

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [login, {isLoading} ] = useLoginMutation();


   const {userInfo} = useSelector((state) => state.auth);

    useEffect(()=> {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo]);
   const submitHandler = async (e)  => {
    e.preventDefault();
        try { 
           const res = await login ({email, password}).unwrap();
           dispatch(setCredentials({...res}))
           navigate('/')

        } catch(err)
        {
            
            toast.error(err.data.message || err.error)
        }
    
   }
  return (
    <FormContainer>
       <h1> Sign In </h1>

       <Form onSubmit={submitHandler}>
    <Form.Group className="my-2" controlId = 'email'>
    <Form.Label>
        Email Address
    </Form.Label>
    <Form.Control type='email' placeholder='Enter email '
    value={email} 
    onChange={(e) => setEmail(e.target.value) }>

    </Form.Control>
    </Form.Group>
    <Form.Group className="my-2" controlId = 'password'>
    <Form.Label>
        password    </Form.Label>
    <Form.Control type='password' placeholder='Enter password '
    value={password} 
    onChange={(e) => setPassword(e.target.value) }>

    </Form.Control>
    </Form.Group>

      {isLoading && <Loader/>}
    <Button type='submit' variant='primary' className='mt-3'>
        Sign In 
        
    </Button>

    <Row className="py-3">
    <Col>
       New Customer ? 
       Register 
       <LinkContainer to='/register'>
            <Nav.Link >
                <FaSignOutAlt /> Sign Up
            </Nav.Link>
        </LinkContainer>
    </Col>
    </Row>
       </Form>
    </FormContainer>
  )
}

export default LoginScreen
