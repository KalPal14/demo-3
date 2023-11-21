import "reflect-metadata";

const Test = (target: Function) => {
  // сохраняем значение meta_value по ключу meta_key для target
  Reflect.defineMetadata("meta_key", "meta_value", target);
  const meta = Reflect.getMetadata("meta_key", target);
  console.log(meta); // meta_value
};

const Prop = (target: Object, name: string) => {};

@Test
class C {
  @Prop prop: number;
}
