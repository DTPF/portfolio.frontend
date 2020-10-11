import React, { useState, useEffect } from "react";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import BannerAnim, { Element } from "rc-banner-anim";
import { getCoursesApi } from "../../../../api/education";
import "rc-banner-anim/assets/index.css";
import "./InfoBanner.scss";
TweenOne.plugins.push(Children);

export default function InfoBanner(props) {
  const [courses, setCourses] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  useEffect(() => {
    let unmounted = false;
    getCoursesApi(1000, 1).then((response) => {
      if (!unmounted) {
        setCourses(response.courses);
      }
    });
    window.scrollTo(0, 0);
    return () => {unmounted = true};
  }, [totalDuration]);
  useEffect(() => {
    let unmounted = false;
    const duration = [];
    let totalDuration = 0;
    courses &&
      courses.docs.forEach((course) => {
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
    return () => {unmounted = true};
  }, [courses]);
  return (
    <BannerAnim
      prefixCls="info-banner"
      arrow={false}
      thumb={false}
      autoPlay
      autoPlaySpeed={3000}
      type={["vertical", "across"]}
    >
      <Element prefixCls="info-banner-elem" key="0">
        <TweenOne
          className="info-banner-title"
          animation={{ y: 300, opacity: 0, type: "from" }}
        >
          <AnimationCountHours totalDuration={totalDuration} />
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
  );
}

function AnimationCountHours(props) {
  const { totalDuration } = props;
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
          duration: 2200,
        },
      });
    }
    return () => {unmounted = true};
  }, [totalDuration]);
  return (
    <TweenOne animation={state && state.animation}>
      {totalDuration === 0 ? 0 : totalDuration}
    </TweenOne>
  );
}

function Tecnologies(props) {
  const { courses } = props;
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
    return () => {unmounted = true};
  }, [courses]);
  return tecnologies;
}
