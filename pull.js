let customer = [
    { id: 1, firstName: "justin", balance: 10 },
    { id: 2, firstName: "sissel", balance: 0 },
    { id: 3, firstName: "justin", balance: -3 },
    { id: 4, firstName: "smudge", balance: 2 },
    { id: 5, firstName: "smudge", balance: 0 },
];

function* Scan(coll) {
    for (let x of coll) {
        yield x;
    }
}

let iterator = Scan(customer);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function* Select(p, iter) {
    for (let x of iter) {
        if (p(x)) {
            yield x;
        }
    }
}

function* Map(f, iter) {
    for (let x of iter) {
        yield f(x);
    }
}

function* Distinct(iter) {
    let seen = new Set();
    for (let x of iter) {
        if (!seen.has(x)) {
            yield x;
            seen.add(x);
        }
    }
}

// SELECT DISTINCT customer_first_name FROM customer WHERE customer_balance > 0

let result = [
    ...Distinct(
        Map(
            (x) => x.firstName,
            Select((x) => x.balance > 0, Scan(customer))
        )
    )];

console.log(result)
