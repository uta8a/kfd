import React from "react";

export const Footer = () => {
  return (
    <footer className={"justify-center items-center mb-2"}>
      &copy; {new Date().getFullYear()} - <a href={"https://github.com/uta8a"}>uta8a</a> -{" "}
      <a className={"p-1"} href={"https://github.com/uta8a/kfd"}>
        Repository: uta8a/kfd
      </a>
    </footer>
  );
};
