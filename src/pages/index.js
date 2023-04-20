import { useState, useEffect } from "react";

import {
  runSearch,
  fetchAllShoes,
  getRecommendations,
} from "../services/shoe-inventory";
import {
  getGeoLocationDetails,
  addVisitorDetails,
  publishEvent,
} from "../services/customer-data";

import SearchBar from "../components/SearchBar";
import RecommendationsList from "../components/RecommendationsList";
import InventoryList from "../components/InventoryList";
import SearchList from "../components/SearchList";

const CLICK_STREAM = "c8locals.clickShopVisitorContextStream";
const VIEWS_STREAM = "c8locals.viewsShopVisitorContextStream";

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState([]);
  const [visitorDetails, setVisitorDetails] = useState({});
  const [searchMessage, setSearchMessage] = useState("");
  //const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // Get visitor details
    const getVisitorDetails = async () => {
      const details = await getGeoLocationDetails();
      setVisitorDetails(details);
    };
    getVisitorDetails().catch(console.error);
    // Fetch all shoes
    fetchAllShoes().then((shoes) => setInventory(shoes.slice(0, 9)));
  }, []);

  useEffect(() => {
    // Check if visitorDetails is not empty, null, undefined, and has the IPv4 property
    if (
      visitorDetails &&
      Object.keys(visitorDetails).length > 0 &&
      visitorDetails.ip
    ) {
      const addVisitor = async () => {
        const details = await addVisitorDetails(visitorDetails);
      };
      addVisitor().catch(console.error);

      getRecommendations({ visitor_id: visitorDetails.ip }).then((shoes) =>
        setRecommendations(shoes.slice(0, 4))
      );
    }
  }, [visitorDetails]);

  const searchHandler = async (searchQuery) => {
    setSearchMessage("");

    if (searchQuery === "") {
      setSearchMessage("Add a keyword in the search bar.");
      return;
    }
    // Fetch search results
    runSearch({ keyword: searchQuery, visitor_id: visitorDetails.ip }).then(
      (shoes) => {
        setSearch(shoes.slice(0, 4));
        if (shoes.length === 0) {
          setSearchMessage("No search results found !");
        }
      }
    );
  };

  const viewsHandler = async (item) => {
    try {
      const response = await publishEvent(
        {
          _key: `${visitorDetails.ip}${item._key}click`,
          visitor_id: visitorDetails.ip,
          page: item._key,
          inventory_item: item._key,
        },
        { stream: VIEWS_STREAM }
      );
    } catch (error) {
      console.error("Error publishing event:", error);
    }
  };

  const clickHandler = async (item) => {
    try {
      const response = await publishEvent(
        {
          _key: `${visitorDetails.ip}${item._key}click`,
          visitor_id: visitorDetails.ip,
          page: item._key,
          inventory_item: item._key,
        },
        { stream: CLICK_STREAM }
      );
    } catch (error) {
      console.error("Error publishing event:", error);
    }
  };

  return (
    <div className="container">
      <div className="search-bar-container">
        <SearchBar onSearch={searchHandler} />
        {searchMessage && (
          <p
            className={`${
              searchMessage === "Loading..."
                ? "loading"
                : searchMessage === "No search results found"
                ? "no-results"
                : "add-keyword-message"
            }`}
          >
            {searchMessage}
          </p>
        )}
      </div>
      {search.length > 0 ? (
        <SearchList searchData={search} clickHandler={clickHandler} />
      ) : null}
      {recommendations.length > 0 ? (
        <RecommendationsList
          recommendations={recommendations}
          clickHandler={clickHandler}
        />
      ) : null}
      {search.length === 0 ? (
        <InventoryList data={inventory} clickHandler={clickHandler} />
      ) : null}
    </div>
  );
};

export default Home;
