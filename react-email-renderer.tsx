"use client";

import React from "react";
import root from "react-shadow";

export function ReactEmailRenderer({
  html,
  parentClassName,
  css,
  sanitize,
}: {
  html: string;
  parentClassName?: string;
  css?: string;
  sanitize?: (text: string) => string;
}) {
  const safeHtml = (text: string): string => {
    if (sanitize) text = sanitize(text);

    /**
     * Add prefix https://wsrv.nl/?url= to all https://lh5.googleusercontent.com links
     * because Gmail image URLs have cors or same-origin policy issues, so we need to proxy them.
     */
    const lh5Regex = /https:\/\/lh5.googleusercontent.com/g;
    text = text.replace(
      lh5Regex,
      "https://wsrv.nl/?url=https://lh5.googleusercontent.com"
    );

    return text;
  };

  return (
    <div className={parentClassName}>
      <root.div>
        <style type="text/css">{`INJECT_CSS ${css ?? ""}`}</style>
        <div dangerouslySetInnerHTML={{ __html: safeHtml(html) }} />
      </root.div>
    </div>
  );
}
