function checkValidationPhone(phone) {
    // phone으로 받은 숫자가 10자리(010-123-5678)도, 11자리(010-1234-5678)도 아니라면
    if (phone.length !== 10 && phone.length !== 11) {
        // 에러메세지 리턴
        console.log("핸드폰 번호를 제대로 입력해주세요.");
        return false;
    }
    // 검증 통과
    else {
        return true;
    }
}

function getToken(count) {
    // 토큰 예외처리
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

    return result; // 만들어진 토큰 출력
}

function sendTokenToSMS(phone, token) {
    console.log(`${phone}로 인증번호 ${token}를 전송했습니다.`);
}

// api 만들기
function createTokenOfPhone(phone, count) {
    // 1. 휴대폰 번호의 자릿수가 맞는지 확인 - 그 결과를 isValid 변수에 저장
    const isValid = checkValidationPhone(phone);

    // 1번이 true여야지
    if (isValid === true) {
        // 2. 핸드폰 토큰 6자리 만들기 실행 - 그 결과를 token 변수에 저장
        const token = getToken(count);

        // 3. 핸드폰 번호로 토큰 전송하기 실행 - 실제로 보내진 않고, 콘솔에만 출력되게 함
        sendTokenToSMS(phone, token);
    }
}
// api 실행하기
createTokenOfPhone("01012345678", 6);
