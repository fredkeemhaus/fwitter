import React, { useState, useEffect } from "react";
import { dbService } from "fBase";
import Fweet from "components/Fweet";

const Home = ({ userObj }) => {
  const [fweet, setFweet] = useState("");
  const [fweets, setFweets] = useState([]);

  useEffect(() => {
    dbService.collection("fweets").onSnapshot(snapshot => {
      const fweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFweets(fweetArray);
    });
  }, []);

  const onSubmit = async event => {
    try {
      event.preventDefault();
      await dbService.collection("fweets").add({
        text: fweet,
        createdAt: Date.now(),
        creatorId: userObj.uid
      });

      setFweet("");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setFweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={fweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="fweet" />
      </form>
      <div>
        {fweets.map(fweet => {
          return (
            <Fweet
              key={fweet.id}
              fweetObj={fweet}
              isOwner={fweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
