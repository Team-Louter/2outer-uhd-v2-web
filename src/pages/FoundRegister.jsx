import LostItemFormTemplate from '../component/template/LostItemFormTemplete.jsx';
import LostItemForm from '../component/organisms/LostItemForm.jsx';

const LostItemFormPage = () => {
  return (
    <LostItemFormTemplate
      title="분실물 등록 - 네 물건"
      description="습득한 물건 정보를 남겨주세요. 분실자에게 소중한 물건이 돌아갈 수 있어요."
    >
      <LostItemForm mode="found" />
    </LostItemFormTemplate>
  );
};

export default LostItemFormPage;