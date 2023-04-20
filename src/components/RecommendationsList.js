import React from "react";
import Link from "next/link";
import styles from "../styles/RecommendationsList.module.css";

const RecommendationsList = ({ recommendations, clickHandler }) => (
  <div className={styles.recommendationsSection}>
    <h1>Trending</h1>
    <div className={styles.recommendationsList}>
      {recommendations.map((item, index) => (
        <Link
          href={`/inventory/${item._key}`}
          key={index}
          onClick={() => {
            clickHandler(item);
          }}
        >
          <div key={index} className={styles.recommendationItem}>
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

export default React.memo(RecommendationsList);
