const Component = (id: number) => {
  console.log("component init");

  return (target: Function) => {
    console.log("component run");
    target.prototype.id = id;
  };
};

const Logger = () => {
  console.log("logger init");

  return (targer: Function) => {
    console.log("logger run");
  };
};

const Method = (
  target: Object,
  propertyKey: string, // назв. метода исп. декор.
  propDescriptor: PropertyDescriptor
) => {
  console.log("Method dec propKey: ", propertyKey);
  // propDescriptor.value содержит сам метод
  const oldValue = propDescriptor.value.bind(target);
  console.log("Method dec propDescriptor.value (old):", oldValue); // [Function: changeId]

  propDescriptor.value = (...args: any[]) => {
    if (typeof args[0] === "number") {
      const [firstArg, ...restArgs] = args;
      return oldValue(firstArg * 10, ...restArgs);
    } else {
      oldValue(...args);
    }
  };
};

const Prop = (target: Object, propKey: string) => {
  console.log("Prop dec propKey:", propKey);
  let value: number;

  const getter = () => {
    console.log(`get ${propKey}!!!`);
    return value;
  };

  const setter = (newValue: number) => {
    console.log(`set ${propKey} to ${newValue}!!!`);
    value = newValue;
  };

  // метод для присваивания свойству propKey
  // объекта target новых методов (get и set)
  Object.defineProperty(target, propKey, {
    get: getter,
    set: setter,
  });
};

const Param = (target: Object, propKey: string, index: number) => {
  console.log(propKey, index);
};

// декораторы отрабатывают
// на этапе ИНИЦИАЛИЗАЦИИ
@Logger()
@Component(1)
class User {
  @Prop id: number;

  @Method
  changeId(@Param newId: number) {
    this.id = newId;
  }
}

const user = new User();
console.log(user.id); // 1
user.changeId(2);
console.log(user.id); // 20
user.changeId(3);
console.log(user.id); // 30
