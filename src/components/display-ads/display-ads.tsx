import React, { useEffect } from "react";

export default function DisplayAds() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process
      .env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    const pushAd = () => {
      try {
        if ((window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
        } else {
          console.error("adsbygoogle is not available");
        }
      } catch (e) {
        console.error(e);
      }
    };

    let interval = setInterval(() => {
      if ((window as any).adsbygoogle) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7748316956330968"
      data-ad-slot="3545458418"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
