"use client"
import * as React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100;
  const value2 = (15 + 36 * Math.random()) / 100;
  return {
    originX: value,
    originY: value2
  };
};

const getRandomDelay = () => -(Math.random() * 0.2 + 0.05);

const randomDuration = () => Math.random() * 0.02 + 0.23;

const variants = {
  start: (i: number) => ({
    rotate: 0.2,
    transition: {
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration(),
    }
  }),
  reset: {
    rotate: 0
  }
};

export default function MotionList({ children, room_id }: { children: React.ReactNode, room_id: number }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("start");
  }, [controls]);

  return (


    <motion.div

      key={`${room_id}`}
      // style={{
      //   transformOrigin: getRandomTransformOrigin(),
      // }}
      style={{
        ...getRandomTransformOrigin(),

      }}

      custom={room_id}
      variants={variants}
      animate={controls}
    >
      {children}
    </motion.div>

  );
}
