import React , { useState, useEffect } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from './axios';

function TinderCards()
{
    const [people, setPeople] = useState([]);
    //so when the tinder card loads it will run it once
    useEffect(() => {
              async function fetchData() {
                    //we directly wrote /tinder/cards because the base url is already mentioned
                    const req = await axios.get('./tinder/cards');
                    console.log(req.data);
                    setPeople(req.data);
                  }
                  fetchData();
    },[])

  const swiped = (direction,nametoDelete) =>
        {
              console.log("removing:"+ nametoDelete );
        };
  const outOfFrame = (name) =>
  {
          console.log(name + " left the screen");
  };
    return(
          <div className="tinderCards">
                  <div className="tinderCards__cardContainer">
                  {people.map((person) =>
                      (
                          <TinderCard
                                  className="swipe"
                                  key={person.name}
                                  preventSwipe={["up","down"]}
                                  onSwipe={(dir) => swiped(dir,person.name)}
                                  onCardLeftScreen={() => outOfFrame(person.name)}
                          >
                                <div
                                    style={{backgroundImage:`url(${person.imgUrl})`}}
                                    className="card"
                                >
                                      <h3>{person.name}</h3>
                                </div>
                          </TinderCard>


                      )
                  )}
                  </div>
          </div>
    )
}

export default TinderCards;
