"use strict";
// returning never
const raise = (err) => {
    throw new Error();
};
const page = (props) => {
    const id = props.params.id ?? raise("no id provided");
};
// we can now use raise to ensure id is provided to params.
// id now gets inferred as string, not string | undefined
