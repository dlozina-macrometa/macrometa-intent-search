export const getVisitorInfo = () => {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const referrer = document.referrer;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    return {
      userAgent,
      language,
      screenWidth,
      screenHeight,
      referrer,
      timeZone,
    };
  };