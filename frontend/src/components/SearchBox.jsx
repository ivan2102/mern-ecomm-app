import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {

  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [ keyword, setKeyword ] = useState(urlKeyword || '')

  const submitHandler = (event) => {
    event.preventDefault()

    if (keyword.trim()) {

      setKeyword('')

      navigate(`/search/${keyword}`)

    } else {

      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler } className="d-flex">
      <FormControl
      type='text'
      name='q'
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
      placeholder='Search products...'
      className='mr-sm-2 ml-sm-5'
      ></FormControl>

      <Button type='submit' variant="outline-secondary" className="p-2 mx-2">Search</Button>
    </Form>
  )
}
export default SearchBox