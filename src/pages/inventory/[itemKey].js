import { useRouter } from "next/router";
import ItemDetails from "../../components/ItemDetails";

const ItemDetailsPage = () => {
  const router = useRouter();
  const { itemKey } = router.query;

  return <ItemDetails itemKey={itemKey} />;
};

export default ItemDetailsPage;
