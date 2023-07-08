// returning never
const raise = (err: string): never => {
  throw new Error();
};
interface propsType {
  params: {
    id?: string;
  };
}
const page = (props: propsType) => {
  const id = props.params.id ?? raise("no id provided");
};
// we can now use raise to ensure id is provided to params.
// id now gets inferred as string, not string | undefined
