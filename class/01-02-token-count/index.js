function getToken(count) {
    // count에 값을 넘겨주지 않은 경우
    if (count === undefined) {
        console.log("에러 발생!!! 갯수를 제대로 입력해 주세요.");
        return;
    }
    // count가 0보다 작거나 같은 경우(음수인 경우)
    else if (count <= 0) {
        console.log("에러 발생!!! 갯수가 너무 적습니다.");
        return;
    }
    // count가 10보다 큰 경우
    else if (count > 10) {
        console.log("에러 발생!!! 갯수가 너무 많습니다.");
        return;
    }

    const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");

    console.log(result); // 만들어진 토큰 출력

    return result;
}

getToken();
getToken(-1);
getToken(20);
