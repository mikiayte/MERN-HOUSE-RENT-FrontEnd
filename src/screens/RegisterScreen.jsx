import { useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import {Navbar , Nav, Container} from 'react-bootstrap';
import {FaSignOutAlt} from 
'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify';

import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
   const [email, setEmail] = useState('');

   const [password, setPassword] = useState('');
   
   const [name, setName] = useState('');

   const {userInfo} = useSelector((state) => state.auth);

   const [confirmPassword, setConfirmPassword] = useState('');

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [register , {isLoading} ] = useRegisterMutation();

   useEffect(()=> {
    if(userInfo) {
        navigate('/')
    }
}, [navigate, userInfo]);

   const submitHandler = async (e)  => {
    e.preventDefault();

       if(password !== confirmPassword)
       {
        toast.error('passwords do not match')
       }
       else {
           try {
            const res = await register({email, password, name}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
           }

           catch(error) {
            toast.error(err.data.message || err.error)

           }
       }
    
   }
  return (
    <FormContainer>
       <h1> Sign Up </h1>

       <Form onSubmit={submitHandler}>
       <Form.Group className="my-2" controlId = 'email'>
    <Form.Label>
       Name
    </Form.Label>
    <Form.Control type='name' placeholder='Enter Name '
    value={name} 
    onChange={(e) => setName(e.target.value) }>

    </Form.Control>
    </Form.Group>
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

    <Form.Group className="my-2" controlId = 'confirmPassword'>
    <Form.Label>
       Confirm  password    </Form.Label>
    <Form.Control type='password' placeholder='Enter Confirm password '
    value={confirmPassword} 
    onChange={(e) => setConfirmPassword(e.target.value) }>

    </Form.Control>
    </Form.Group>
    {isLoading && <Loader />}
    <Button type='submit' variant='primary' className='mt-3'>
        Sign Up 
    </Button>

    <Row className="py-3">
    <Col>
      Already have an account ?
      Login 
      <LinkContainer to='/Login'>
            <Nav.Link >
                <FaSignOutAlt /> Login
            </Nav.Link>
        </LinkContainer>
    </Col>
    </Row>
       </Form>
    </FormContainer>
  )
}

export default RegisterScreen
