import React from 'react';
import {Container, ImageInput, Input, FormGroup, Button, NavBar} from '../../components';
import { useHistory, useParams } from 'react-router-dom';
import { createFriend, updateFriend } from '../../services';
import { getFriend } from '../../services'


const FormFriend = () => {
  const history = useHistory();
  const { id } = useParams();

  const [image, setImage] = React.useState(null);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [age, setAge] = React.useState('');

  const handleChangeImage = ({ imageFile, imageBase64 }) => {
    console.log(imageFile, imageBase64);
    setImage(imageBase64);
  }

  const submit = async () => {
    const payload = {
      firstName,
      lastName,
      age: parseInt(age),
      photo: image
    }

    if(id) {
      await updateFriend(id, payload);
    } else {
      await createFriend(payload);
    }
    history.goBack()
  }

  const initialData = React.useCallback(() => {
    if(id) {
      getFriend(id).then(data => {
        setImage(data.photo)
        setFirstName(data.firstName)
        setLastName(data.lastName);
        setAge(data.age)
      })
    }
  }, [id])

  React.useEffect(() => {
    initialData();
  }, [initialData])



  return (
    <div className="form-friend">
      <NavBar title="Your Friend" />
      <div className="form-friend__content">
        <Container size="lg">
          <ImageInput image={image} onChange={handleChangeImage} className="form-friend__image-input" />
          <FormGroup>
            <Input placeholder="First Name" onChange={e => setFirstName(e.target.value)} value={firstName}/>
          </FormGroup>

          <FormGroup>
            <Input placeholder="Last Name" onChange={e => setLastName(e.target.value)} value={lastName}/>
          </FormGroup>

          <FormGroup>
            <Input type="number" min={0} max={100} placeholder="Age" onChange={e => setAge(e.target.value)} value={age}/>
          </FormGroup>
          <Button block onClick={submit}>Save</Button>
        </Container>
      </div>
    </div>
  )
}


export default FormFriend;