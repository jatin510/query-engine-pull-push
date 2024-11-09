let customer = [
    { id: 1, firstName: "justin", balance: 10 },
    { id: 2, firstName: "sissel", balance: 0 },
    { id: 3, firstName: "justin", balance: -3 },
    { id: 4, firstName: "smudge", balance: 2 },
    { id: 5, firstName: "smudge", balance: 0 },
];

function Scan(relation, out) {
    for (r of relation) {
        out(r);
    }
}

function Select(p, out) {
    return (x) => {
        if (p(x)) out(x);
    };
}

function Map(f, out) {
    return (x) => {
        out(f(x));
    };
}

function Distinct(out) {
    let seen = new Set();
    return (x) => {
        if (!seen.has(x)) {
            seen.add(x);
            out(x);
        }
    };
}

let result = [];
Scan(
    customer,
    Select(
        (c) => c.balance > 0,
        Map(
            (c) => c.firstName,
            Distinct((r) => result.push(r))
        )
    )
);

console.log(result);