import * as React from "react";

function LoadingSpinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 19a8 8 0 118-8 8 8 0 01-8 8z"
        opacity={0.25}
      />
      <path
        fill="#347866"
        d="M10.14 1.16a11 11 0 00-9 8.92A1.59 1.59 0 002.46 12a1.52 1.52 0 001.65-1.3 8 8 0 016.66-6.61A1.42 1.42 0 0012 2.69a1.57 1.57 0 00-1.86-1.53z"
      ></path>
    </svg>
  );
}

const MemoLoadingSpinner = React.memo(LoadingSpinner);
export default MemoLoadingSpinner;
