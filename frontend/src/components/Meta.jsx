import { Helmet } from 'react-helmet-async';
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
    <title>{ title }</title>
    <meta name='description'content={ description } />
    <meta name='keywords'content={ keywords } />
    </Helmet>
  )
}

Meta.defaultProps = {

    title: 'Welcome to E-Commerce Store',
    description: 'We offer lower price  for higher quality',
    keywords: 'accessories, watches, sneakers, clothes'
}
export default Meta