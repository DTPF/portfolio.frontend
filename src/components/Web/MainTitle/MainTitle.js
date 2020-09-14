import React, { useState } from "react";
import Texty from "rc-texty";
import TweenOne from "rc-tween-one";

import "./MainTitle.scss";

export default function MainTitle() {

  return (
    <div className="main-title">
      <div className="combined-wrapper">
        <div className="combined">
          <Texty
            className="title"
            type="left"
            delay={350}
            component={TweenOne}
            componentProps={{
              animation: [
                { x: 130, type: "set" },
                { x: 100, delay: 100, duration: 50 },
                {
                  ease: "easeOutQuart",
                  duration: 100,
                  x: 0,
                },
                {
                  letterSpacing: 0,
                  delay: -300,
                  scale: 0.9,
                  ease: "easeInOutQuint",
                  duration: 50,
                },
                {
                  scale: 1,
                  width: "100%",
                  delay: 0,
                  duration: 50,
                  ease: "easeInOutQuint",
                },
              ],
            }}
          >
            David&nbsp;Thomas
          </Texty>
          <Texty
            className="title-2"
            type="right"
            delay={350}
            component={TweenOne}
            componentProps={{
              animation: [
                { x: 130, type: "set" },
                { x: 100, delay: 550, duration: 50 },
                {
                  ease: "easeOutQuart",
                  duration: 100,
                  x: 0,
                },
                {
                  letterSpacing: 0,
                  delay: -300,
                  scale: 0.9,
                  ease: "easeInOutQuint",
                  duration: 50,
                },
                {
                  scale: 1,
                  width: "100%",
                  delay: 0,
                  duration: 50,
                  ease: "easeInOutQuint",
                },
              ],
            }}
          >
            Pizarro&nbsp;Frick
          </Texty>
          <TweenOne
            className="combined-bar"
            animation={{
              delay: 1100,
              width: 0,
              x: 158,
              type: "from",
              ease: "easeInOutExpo",
            }}
          />
          <Texty
            className="content"
            type="bottom"
            delay={1400}
            interval={10}
          >
            Desarrollador Full-Stack de Software
          </Texty>
        </div>
      </div>
    </div>
  );
}
