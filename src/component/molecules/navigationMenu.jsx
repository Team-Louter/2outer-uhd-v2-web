import NavLink from "../atom/navLink";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 11vw;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 1rem;
  font-weight: 600;
`;

const NavigationMenu = () => {
  return (
    <Nav className="navigation-menu">
      <NavList>
        <NavItem><NavLink to="/Intro">서비스 소개</NavLink></NavItem>
        <NavItem><NavLink to="/">분실물</NavLink></NavItem>
        <NavItem><NavLink to="/">채팅</NavLink></NavItem>
        <NavItem><NavLink to="/Mypost">내 게시글</NavLink></NavItem>
      </NavList>
    </Nav>
  )
}

export default NavigationMenu;