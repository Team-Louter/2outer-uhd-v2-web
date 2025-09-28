import Button from "/src/component/atom/button";
import Checkbox from "../component/atom/checkbox";
import Input from "../component/atom/input";

function Index() {
  return (
    <div>
      <h3>test</h3>
      <Input placeholder="아이디" />
      <Button>기본 버튼</Button>
      <Button variant="secondary">보조 버튼</Button>
      <Checkbox />
    </div>
  );
}

export default Index;