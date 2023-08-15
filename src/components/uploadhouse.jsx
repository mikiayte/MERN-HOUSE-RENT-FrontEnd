import { useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify';

import Loader from '../components/Loader';
import { useUploadMutation } from '../slices/houseApiSlice';
import { setHouses} from '../slices/houseSlice';

const UploadHouse = () => {
     const citiesArray  = [
        'Addis Ababa', 'Bahirdar', 'Hawassa', 'Dire Dawa', 'Harrar', 'Gondar', 'Mekele', 'Adama', 'Dessie'
     ]
const resetForm = () => {
    setFormData({  type:'Villa',
    city:'Addis Ababa',
    location:'',
    bedRooms:'studio',
    description:'',
    rentalPlan:'All',
    price:1000, 
    story: 0});

}
    const [formData, setFormData] = useState({
        type:'Villa',
        city:'Addis Ababa',
        location:'',
        bedRooms:'studio',
        description:'',
        rentalPlan:'All',
        price:1000, 
        story: 0
      })
      const  {  
        type,
        city,
        location,
        bedRooms,
        description,
        rentalPlan,
        price, story
      } = formData
      const onChange  = (e) => {
        setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
        }))
       }
  const {housesArray } = useSelector((state) => state.house);
   const [upload , {isLoading} ] = useUploadMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(()=> {
   if(housesArray) {
       navigate('/')
   }
 }, [navigate, housesArray]);

   const submitHandler = async (e)  => {
    e.preventDefault();

           try {

            const res = await upload({type, city, location, bedRooms, price, description, rentalPlan, story}).unwrap();
            console.log(res)
            dispatch(setHouses({...res}))
            navigate('/')
           }

           catch(err) {
            toast.error(err.data.message || err.error)

           }
       
    
   }
 
  
  return (
    <FormContainer >
       <h2 className='w-full text-center formLabel'> Upload House </h2>

       <Form onSubmit={submitHandler}>
     <Form.Group className='my-2'>
     <Form.Label className='formLabel'>
       City <span className='asterix'>*</span>
    </Form.Label>
     <Form.Select value={city} onChange={onChange}>
        {citiesArray.map((city) => {
              return   <option value={city}>{city}</option>
                

        })}
     </Form.Select>
        </Form.Group>
       <Form.Group className='my-2'>
       <Form.Label className='formLabel'>
       House Type  <span className='asterix'>*</span>
    </Form.Label>
    <div className="w-full my-2 d-flex justify-content-between" >
   
    <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           value='Villa'
           name='type'
           label='Villa'
           checked={type === 'Villa'}
           onChange={onChange}
         />
   <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           name='type'
           value='Condominium'
           label='Condominium'
           checked={type === 'Condominium'}

           onChange={onChange}

         />
    
      

   <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           name='type'
           value='Apartment'
           label='Apartment'
           checked={type === 'Apartment'}

           onChange={onChange}

         />
   


        </div>


    </Form.Group>

    {(type === 'Condominium' || type === 'Apartment') ? 
        <Form.Group className='my-2'>
        <Form.Label className='formLabel'> Number Of Bed Rooms </Form.Label>
    <Form.Select value={bedRooms} onChange={onChange} className='my-2'>
      <option value="studio">Studio</option>
      <option value="1 bed room">One</option>
      <option value="2 bed room ">Two</option>
      <option value="3 bed room ">Three</option>
    </Form.Select> 
    </Form.Group> :       
    <Form.Group className="my-2">
    <Form.Label className='formLabel'>
       How many stairs or stories   </Form.Label>
    <Form.Control type='number' placeholder='Enter number of stairs of the Villa'
    value={story} 
    name='story'
    onChange={onChange} >

    </Form.Control>
    </Form.Group>
    }
    <Form.Group className='my-2' >
       <Form.Label className='formLabel'>
       House Rental plan (how to pay the rent)
    </Form.Label>
    <div className="w-full my-2 d-flex justify-content-between" >
   
    <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           value='All'
           name='rentalPlan'
           label='All'
           checked={rentalPlan === 'All'}
           onChange={onChange}
         />
            <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           name='rentalPlan'
           value='1 month'
           label='1 month'
           checked={rentalPlan === '1 month'}

           onChange={onChange}
         />
   
   <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           name='rentalPlan'
           value='3 months'
           label='3 months'
           checked={rentalPlan === '3 months'}

           onChange={onChange}
         />
    
      

   <Form.Check // prettier-ignore
           type='radio'
           className='hover'
           name='rentalPlan'
           value='6 months'
           label='6 months'
           checked={rentalPlan === '6 months'}

           onChange={onChange}
         />
   


        </div>


    </Form.Group>

    <Form.Group className="mb-2" >
        <Form.Label className='formLabel'>House Description</Form.Label>
        <Form.Control as="textarea"  name='description' rows={3}  value={description} 
    onChange={onChange} />
     </Form.Group>

 

    <Form.Group className="my-2">
    <Form.Label className='formLabel'>
      Rent Price Per Month  <span className='asterix'>*</span> </Form.Label>
     <Form.Control type='number' placeholder='Enter price '
    value={price} 
    name='price'
    onChange={onChange} />

    
    </Form.Group>
    <div className='d-flex justify-content-center gap-2' >
    <Button type='submit' variant='primary' className='mt-3 btn btn-success' disabled = { !price  }>
        upload
    </Button>
    <Button type='button' className=" mt-3 btn btn-danger" variant='primary' onClick={resetForm} >
        Cancel
    </Button>
    </div>


       </Form>
    </FormContainer>
  )
}

export default UploadHouse
