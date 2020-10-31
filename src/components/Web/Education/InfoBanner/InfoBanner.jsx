import React, { useState, useEffect, Suspense, lazy } from "react";
import { useGetCourses } from "../../../../hooks/useGetCourses";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin.js";
import BannerAnim, { Element } from "rc-banner-anim";
import "rc-banner-anim/assets/index.css";
import "./InfoBanner.scss";
const Spin = lazy(() => import("../../../../components/Spin"));

export default function InfoBanner() {
  TweenOne.plugins.push(Children);
  const [courses] = useGetCourses(10000, 1);
  const [totalDuration, setTotalDuration] = useState(0);
  const [duration, setDuration] = useState(0);
  setTimeout(() => {
    let unmounted = false;
    if (!unmounted) {
      setDuration(totalDuration);
    }
    return () => { unmounted = true };
  }, 1);
  useEffect(() => {
    let unmounted = false;
    const duration = [];
    let totalDuration = 0;
    if (courses) {
      courses.docs && courses.docs.forEach((course) => {
          if (!unmounted) {
            duration.push(course.duration);
          }
        });
      duration.forEach((num) => {
        totalDuration += num;
        if (!unmounted) {
          setTotalDuration(totalDuration);
        }
      });
    }
    return () => {unmounted = true };
  }, [courses]);

  return (
    <>
    {totalDuration === 0 ? (
      <Suspense fallback={<></>}>
        <Spin paddingTop="80px" height="200px" />
      </Suspense>
      ) : (
        <>
        <BannerAnim
          prefixCls="info-banner"
          arrow={false}
          thumb={false}
          autoPlay
          autoPlaySpeed={3000}
          dragPlay={false}
          type={["vertical", "across"]}
        >
          <Element prefixCls="info-banner-elem" key="0">
            <TweenOne
              className="info-banner-title"
              animation={{ y: 300, opacity: 0, type: "from" }}
            >
              <AnimationCountHours
                totalDuration={totalDuration}
                duration={duration}
              />
            </TweenOne>
            <TweenOne
              className="info-banner-text"
              animation={{ y: 300, opacity: 0, type: "from", delay: 100 }}
            >
              Horas de estudio presencial y online
            </TweenOne>
          </Element>
          <Element prefixCls="info-banner-elem" key="1">
            <TweenOne
              className="info-banner-title"
              animation={{ y: 300, opacity: 0, type: "from" }}
            >
              <Tecnologies courses={courses} />
            </TweenOne>
            <TweenOne
              className="info-banner-text"
              animation={{ y: 300, opacity: 0, type: "from", delay: 100 }}
            >
              Tecnologías utilizadas
            </TweenOne>
          </Element>
        </BannerAnim>
        </>
      )}
      </>
  );
}

function AnimationCountHours({ totalDuration, duration }) {
  const [state, setState] = useState(null);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        animation: {
          Children: {
            value: totalDuration,
            floatLength: 0,
          },
          duration: 2000,
        },
      });
    }
  }, [totalDuration]);
  return (
    <TweenOne animation={state && state.animation}>
      {duration && Math.round(duration)}
    </TweenOne>
  );
}

function Tecnologies({ courses }) {
  const [tecnologies, setTecnologies] = useState(0);
  useEffect(() => {
    let unmounted = false;
    let arrayTags = [];
    let tec = [];
    courses &&
      courses.docs.forEach((course) => {
        if (!unmounted) {
          arrayTags.push(course.tags);
        }
      });
    for (let i = 0; i < arrayTags.length; i++) {
      let tecnologies = arrayTags[i];
      for (let j = 0; j < tecnologies.length; j++) {
        let tecnology = tecnologies[j];
        if (!tec.includes(tecnology)) {
          if (!unmounted) {
            tec.push(tecnology);
          }
        }
      }
    }
    if (!unmounted) {
      setTecnologies(tec.length);
    }
    return () => {
      unmounted = true;
    };
  }, [courses]);
  return tecnologies;
}
