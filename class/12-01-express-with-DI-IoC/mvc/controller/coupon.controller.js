import { CashService } from "./services/cash.service.js";

export class CouponController {
    constructor(moneyService) {
        this.moneyService = moneyService;
    }

    buyCoupon = (req, res) => {
        // 1. 가진 돈 검증하는 코드 (대략 10줄 => 2줄)
        // const moneyService = new CashService();
        const hasMoney = this.moneyService.checkValue(); // true or false

        // 2. 쿠폰 구매하는 코드
        if (hasMoney) {
            res.send("쿠폰을 구매합니다.");
        }
    };
}
