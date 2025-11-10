import {Link} from 'react-router-dom';

const NavLink = ({to, children, ...props}) => {
  return (
    <Link to={to} 
    className='nav-link'
    {...props}>
      {children}
    </Link>
  );
};

export default NavLink;