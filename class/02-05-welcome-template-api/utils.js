// Date 객체의 메소드들
const date = new Date(); // 자바스크립트 Date객체를 date라는 변수에 할당합니다.

date.getFullYear(); // 연도를 반환합니다.
date.getMonth(); // 월을 반환합니다. 0(월)부터 시작하므로 주의하세요!
date.getDate(); // 일을 반환합니다.
date.getDay(); // 요일을 반환합니다.(일요일: 0)
date.getHours(); // 시를 반환합니다.
date.getMinutes(); // 분을 반환합니다.
date.getSeconds(); // 초를 반환합니다.
date.getMilliseconds(); // 밀리초를 반환합니다.

// 생성시간 함수 만들기
export function getToday() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return `${yyyy}-${mm}-${dd}`;
}

console.log(getToday());
