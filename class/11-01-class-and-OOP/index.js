class Monster {
    power = 10;

    constructor(attackStep) {
        if (attackStep) this.power = attackStep;
    }

    attack() {
        console.log("공격하자!!!");
        console.log(`내 공격력은 ${this.power}다.`);
    }

    fly() {
        console.log("날라서 ! 도망가자!!");
    }
}

const monster1 = new Monster();
monster1.attack();
monster1.fly();

const strongMonster = new Monster(50);
strongMonster.attack();
strongMonster.fly();
