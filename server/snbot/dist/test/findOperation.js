"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equation_1 = require("../equation");
let filterData = {
    user: [{
            name: 'Anne',
            id: '1234',
            address: 'Applestr. 14'
        },
        {
            name: 'John',
            id: '1010',
            address: 'Bakerstr. 11'
        },
        {
            name: 'Kelly',
            id: '2080',
            address: 'Oldstr. 2'
        },
        {
            name: 'Sugar',
            id: '2222',
            address: 'Bananastr. 7'
        }]
};
let database = {
    data: filterData.user,
    find(query) {
        let match = function (query, background) {
            let res = true;
            Object.keys(query).forEach((key, index) => {
                if (!(query[key] === background[key]))
                    res = false;
            });
            return res;
        };
        console.log('this.data:', this.data);
        let filtered = this.data.filter(oneData => {
            return match(query, oneData); //object의 Array 형식인 Data 중에서 매치되는 모든 data object의 Array 를 반환한다.
        });
        console.log('filtered:', filtered);
        return filtered;
    }
};
// find operation 수정
// 이유
// 1. 모든 database를 메모리에 얹는 것의 무거움
// 2. 다중 쿼리 불가
describe(' #FindOperation ', async function () {
    it('find', () => {
        let res = equation_1.operation['find']('Kelly', 'name', database);
        console.log('res :', res);
        let e = new equation_1.Equation([new equation_1.Operand(database), new equation_1.Operand('name'), new equation_1.Operand('Kelly'), equation_1.operator('find')]);
        let eqResult = e.calculate();
        console.log('eqResult : ', eqResult);
    });
});
// 결과 : find 도 operand가 2개 필요하게 됨 ( database(find 함수가 있는..), query 순으로 )
// database 는 internal ref(Operand 생성시 'filter'라고 옵션주면 되는..)를 이용해서 blacklist, 'filter' 하면 될듯
//# sourceMappingURL=findOperation.js.map