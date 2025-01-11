import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
const UsersList = () => {

  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?'))

      try {

        await deleteUser(id)
        toast.success('User deleted successfully')
        refetch()
        
      } catch (err) {

        toast.error(err?.data?.message || err.error)
        
      }
    
  }

  return <>
  <h1>Users</h1>
  { loadingDelete && <Loader /> }
  {isLoading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : (

    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
         <th>ID</th>
         <th>Name</th>
         <th>Email</th>
         <th>Admin</th>
         <th>Edit / Delete</th> 
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
         
         <tr key={user._id}>
         <td>{user._id}</td>
         <td>{user.name}</td>
         <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
         <td>
          {user.isAdmin ? (<FaCheck style={{color: 'green'}} />) : (<FaTimes style={{color: 'red'}} />)}
          </td>

          <td>
          <LinkContainer to={`/admin/user/${user._id}/edit`}>
          <Button variant='success' className='btn-sm text-white'>
            <FaEdit />
          </Button>
          </LinkContainer>
          &nbsp; &nbsp;
          <Button variant='danger' className='btn-sm text-white' onClick={() => deleteUserHandler(user._id)}>
            <FaTrash />
          </Button>
          </td>
       </tr>

        ))}
       
      </tbody>
    </Table>
  )}
  </>
    
  
}
export default UsersList