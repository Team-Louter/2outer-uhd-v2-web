import Header from "../component/organisms/header";
import Filter from "../component/organisms/Filter";

import { Container } from "../styles/list";

function List() {
  return (
    <Container>
      <Header />
      <Filter />
    </Container>
  );
}

export default List;