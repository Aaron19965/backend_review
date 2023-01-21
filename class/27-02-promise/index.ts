const fetchData = async () => {
    console.log("여기는 1번!!");
    await new Promise((resolve, reject) => {
      // XMLHttpRequest(요청)
      // 뭔가 특정 작업(API보내기 등)
      setTimeout(() => {
        console.log("여기는 2번");
        try {
          resolve("성공시 받는 데이터");
        } catch (error) {
          reject("실패했습니다!!");
        }
      }, 2000);
    });
    console.log("여기는 3번");
  };
  
  fetchData();

  