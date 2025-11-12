import LostItemFormTemplate from '../component/template/LostItemFormTemplete.jsx';
import LostItemForm from '../component/organisms/LostItemForm.jsx';

const LostItemFormPage = () => {
  return (
    <LostItemFormTemplate
      title="분실물 등록 - 내 물건"
      description="잃어버린 물건을 등록하면 다른 이용자에게 빠르게 도움을 받을 수 있어요."
    >
      <LostItemForm mode="lost" />
    </LostItemFormTemplate>
  );
};

export default LostItemFormPage;