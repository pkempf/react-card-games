import React, { useState } from "react";
import axios from "axios";

const useFlip = () => {
  let [isFacingUp, setIsFacingUp] = useState(true);
  const toggleFacingUp = () => {
    setIsFacingUp((faceUp) => !faceUp);
  };

  return [isFacingUp, toggleFacingUp];
};

const useAxios = (baseUrl) => {
  const [responses, setResponses] = useState([]);

  //   const addResponse = async (
  //     formatFunction = (data) => data,
  //     remainingUrl = ""
  //   ) => {
  //     const res = await axios.get(`${baseUrl}${remainingUrl}`);
  //     setResponses((data) => [...data, formatFunction(res.data)]);
  //   };

  const addResponse = async (formatFunction, remainingUrl = "") => {
    const res = await axios.get(`${baseUrl}${remainingUrl}`);
    setResponses((data) => [
      ...data,
      formatFunction ? formatFunction(res.data) : res.data,
    ]);
  };

  const clearResponses = () => setResponses([]);

  return [responses, addResponse, clearResponses];
};

export { useFlip, useAxios };
