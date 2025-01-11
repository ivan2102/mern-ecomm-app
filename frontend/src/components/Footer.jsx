import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {

    const currentYear = new Date().getFullYear()
  return (
    <footer style={{ background: '#F6F4F0' }}>
        <Container>
         <Row>
          <Col className='text-center py-3'>
          <p>E-Commerce Store &copy; { currentYear }</p>
          </Col>
        </Row>   
        </Container>
    </footer>
  )
}
export default Footer