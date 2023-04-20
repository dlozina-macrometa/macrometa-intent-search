import { useState, useEffect } from "react";
import Link from "next/link";

import { fetchShoeDetails } from "../services/shoe-inventory";
import styles from "../styles/ItemDetails.module.css";

const ItemDetails = ({ itemKey }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchShoeDetails(itemKey).then((shoe) => setItemDetails(shoe));
    setIsReady(true);
  }, [itemKey]);

  return (
    <>
      {!isReady ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>{itemDetails.name}</h1>
          <p className={styles.detail}>Category: {itemDetails.category}</p>
          <p className={styles.detail}>Color: {itemDetails.color}</p>
          <p className={styles.detail}>Size: {itemDetails.size}</p>
          <p className={styles.detail}>Quantity: {itemDetails.quantity}</p>
        </div>
      )}
      <Link href={`/`}>
        <button className={styles.backButton}>Back to Home</button>
      </Link>
    </>
  );
};

export default ItemDetails;
