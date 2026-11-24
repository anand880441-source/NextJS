"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNum((prev) => (prev < 9 ? prev + 1 : 0));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (num === 0) {
      setIsActive([1, 1, 1, 0, 1, 1, 1]);
    }
    if (num === 1) {
      setIsActive([0, 0, 1, 0, 0, 1, 0]);
    }
    if (num === 2) {
      setIsActive([1, 0, 1, 1, 1, 0, 1]);
    }
    if (num === 3) {
      setIsActive([1, 0, 1, 1, 0, 1, 1]);
    }
    if (num === 4) {
      setIsActive([0, 1, 1, 1, 0, 1, 0]);
    }
    if (num === 5) {
      setIsActive([1, 1, 0, 1, 0, 1, 1]);
    }
    if (num === 6) {
      setIsActive([1, 1, 0, 1, 1, 1, 1]);
    }
    if (num === 7) {
      setIsActive([1, 0, 1, 0, 0, 1, 0]);
    }
    if (num === 8) {
      setIsActive([1, 1, 1, 1, 1, 1, 1]);
    }
    if (num === 9) {
      setIsActive([1, 1, 1, 1, 0, 1, 1]);
    }
  }, [num]);


  return (
    <div className="flex">
      <div className="m-10">
        <div
          className="w-20 h-3 mb-1 ml-2"
          style={{ backgroundColor: isActive[0] ? "blue" : "gray", opacity : isActive[0] ? 1 : 0}}
        ></div>
        <div className="flex">
          <div
            className="w-3 h-20"
            style={{ backgroundColor: isActive[1] ? "blue" : "gray", opacity : isActive[1] ? 1 : 0 }}
          ></div>
          <div
            className="w-3 h-20 ml-18"
            style={{ backgroundColor: isActive[2] ? "blue" : "gray", opacity : isActive[2] ? 1 : 0 }}
          ></div>
        </div>
        <div
          className="w-20 h-3 mt-1 ml-2"
          style={{ backgroundColor: isActive[3] ? "blue" : "gray", opacity : isActive[3] ? 1 : 0 }}
        ></div>
        <div className="flex">
          <div
            className="w-3 h-20 mt-1"
            style={{ backgroundColor: isActive[4] ? "blue" : "gray", opacity : isActive[4] ? 1 : 0 }}
          ></div>
          <div
            className="w-3 h-20 ml-18 mt-1"
            style={{ backgroundColor: isActive[5] ? "blue" : "gray", opacity : isActive[5] ? 1 : 0 }}
          ></div>
        </div>
        <div
          className="w-20 h-3 mt-1 ml-2"
          style={{ backgroundColor: isActive[6] ? "blue" : "gray", opacity : isActive[6] ? 1 : 0 }}
        ></div>
      </div>
    </div>
  );
}
