import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import { useSelector } from "react-redux";

export default function SearchResults({ searchResults }) {
  const [resultData, setResultData] = useState(searchResults);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    let indexToMove = findIndexToMove(searchResults, user._id);
    // Move the object to the top if found
    if (indexToMove !== -1) {
      let movedObject = searchResults.splice(indexToMove, 1)[0];
      searchResults.unshift(movedObject);
    }
    setResultData();
  }, []);

  function findIndexToMove(array, name) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === name) {
        return i;
      }
    }
    return -1; // Return -1 if no match found
  }

  return (
    <div className="w-full convos scrollbar">
      <div>
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>

        <ul>
          {searchResults &&
            searchResults.map((user) => [
              <Contact contact={user} key={user._id} />,
            ])}
        </ul>
      </div>
    </div>
  );
}
