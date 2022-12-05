import coolSMS from "coolsms-node-sdk";

export function checkValidationPhone(phone) {
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

export function getToken() {
    // 6자리 고정 토큰 만들기
    const count = 6;
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

export async function sendTokenToSMS(phone, token) {
    // sms 보내는 로직
    const SMS_KEY = process.env.SMS_KEY; // coolSms API Key 입력
    const SMS_SECRET = process.env.SMS_SECRET; // coolSms API Secret 입력
    const SMS_SENDER = process.env.SMS_SENDER; //coolSms sender 입력

    const mySMS = coolSMS.default; // SDK 가져오기
    // coolSMS sdk 예시 참고하여 작성
    const messageService = new mySMS(SMS_KEY, SMS_SECRET);
    const result = await messageService.sendOne({
        to: phone,
        from: SMS_SENDER,
        text: `[AaronProject] 안녕하세요?! 요청하신 인증번호는 [${token}] 입니다.`,
    });
    console.log(result);

    // console.log(`${phone}로 인증번호 ${token}를 전송했습니다.`);
}
