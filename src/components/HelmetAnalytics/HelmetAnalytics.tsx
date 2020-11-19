import React from "react";
import { Helmet } from "react-helmet";
import { Cookies } from "react-cookie";

export default function HelmetAnalytics(props: {
  titleHelmet: string;
  contentHelmet: string;
}) {
  const { titleHelmet, contentHelmet } = props;
  const cookie = new Cookies();
  const _gaCookies = cookie.get("_gaCookies");
  return (
    <>
      {!_gaCookies ? (
        <Helmet>
          <title>{titleHelmet}</title>
          <meta
            name="description"
            content={contentHelmet}
            data-react-helmet="true"
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>{titleHelmet}</title>
          <meta
            name="description"
            content={contentHelmet}
            data-react-helmet="true"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-66JXXM1GXF"
          ></script>
        </Helmet>
      )}
    </>
  );
}
