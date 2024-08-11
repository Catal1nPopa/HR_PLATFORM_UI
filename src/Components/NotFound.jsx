import React from "react";
import image from "./../assets/notfound.jpg";

const NotFound = () => {
  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return <div style={styles.container}></div>;
};

export default NotFound;
