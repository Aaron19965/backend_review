import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

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
