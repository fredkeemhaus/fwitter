import React, { useState } from "react";
import { dbService } from "fBase";

const Fweet = ({ fweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newFweet, setNewFweet] = useState(fweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this fweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`fweets/${fweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing(prev => !prev);
  };
  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`fweets/${fweetObj.id}`).update({
      text: newFweet
    });

    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNewFweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your fweet"
              value={newFweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Fweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{fweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Fweet</button>
              <button onClick={toggleEditing}>Edit Fweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Fweet;
