import Link from "next/link";
import styles from "../styles/InventoryList.module.css";

const SearchList = ({ searchData, clickHandler }) => (
  <div className={styles.inventorySection}>
    <h1>Search Results</h1>
    <div className={styles.inventoryList}>
      {searchData.map((item, index) => (
        <Link href={`/inventory/${item._key}`} key={index}>
          <div
            key={index}
            className={styles.inventoryItem}
            onClick={() => {
              clickHandler(item);
            }}
          >
            <h2>{item.name}</h2>
            <p>Category: {item.category}</p>
            <p>Color: {item.color}</p>
            <p>Inventory mark: {item._key}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default SearchList;
