import classes from "./AvailableMeals.module.css";
import {useEffect, useState} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [httpError, sethttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const DBresponse = await fetch(
        "https://products-c9843-default-rtdb.firebaseio.com/mainmeal.json"
      );

      if (!DBresponse.ok) {
        throw new Error("failed to fetch meals");
      }

      const responseData = await DBresponse.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setmeals(loadedMeals);

      setisloading(false);
    };

    fetchMeals().catch((error) => {
      setisloading(false);
      sethttpError(error.message);
    });
  }, []);

  if (isloading) {
    return (
      <section className={classes.mealsloading}>
        <p>loading....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.mealsloading}>
        <p>{httpError}</p>
      </section>
    );
  }
  // const MyDummyList = meals.map((TakMeals) => (

  const mealsList = meals.map((TakMeals) => (
    <MealItem
      propsId={TakMeals.id}
      propskey={TakMeals.id}
      propsName={TakMeals.name}
      propsdescription={TakMeals.description}
      propsprice={TakMeals.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
