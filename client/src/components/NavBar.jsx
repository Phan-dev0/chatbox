import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./Notification";
import { ChatContext } from "../context/ChatContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const {updateCurrentChat} = useContext(ChatContext);
  
  
  const logout = () => {
    logoutUser();
    updateCurrentChat(null);
  }

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {user ? (
          <span className="text-warning">logged as {user?.name}</span>
        ) : null}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {!user ? (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Notification />
                <Link to="/login" className="link-light text-decoration-none" onClick={logout}>
                  Logout
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
