import React, { useEffect } from "react";

const WordEditor = ({ fileUrl }) => {
  useEffect(() => {
    const initializeOffice = async () => {
      try {
        const { Office } = window;
        Office.onReady(() => {
          Office.context.document.open({ url: fileUrl });
        });
      } catch (error) {
        console.error("Error loading Word editor:", error);
      }
    };

    initializeOffice();
  }, [fileUrl]);

  return <div id="office-container" style={{ height: "600px", width: "100%" }} />;
};

export default WordEditor;
