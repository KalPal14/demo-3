type TClassDecoratorReturn = (targer: Function) => void;

const Component = (id: number): TClassDecoratorReturn => {
	console.log('component init');

	return (target: Function): void => {
		console.log('component run');
		target.prototype.id = id;
	};
};

const Logger = (): TClassDecoratorReturn => {
	console.log('logger init');

	return (targer: Function): void => {
		console.log('logger run');
	};
};

const Method = (
	target: Object,
	propertyKey: string, // назв. метода исп. декор.
	propDescriptor: PropertyDescriptor,
): void => {
	console.log('Method dec propKey: ', propertyKey);
	// propDescriptor.value содержит сам метод
	const oldValue = propDescriptor.value.bind(target);
	console.log('Method dec propDescriptor.value (old):', oldValue); // [Function: changeId]

	propDescriptor.value = (...args: any[]): unknown => {
		if (typeof args[0] === 'number') {
			const [firstArg, ...restArgs] = args;
			return oldValue(firstArg * 10, ...restArgs);
		} else {
			oldValue(...args);
		}
	};
};

const Prop = (target: Object, propKey: string): void => {
	console.log('Prop dec propKey:', propKey);
	let value: number;

	const getter = (): number => {
		console.log(`get ${propKey}!!!`);
		return value;
	};

	const setter = (newValue: number): void => {
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

const Param = (target: Object, propKey: string, index: number): void => {
	console.log(propKey, index);
};

// декораторы отрабатывают
// на этапе ИНИЦИАЛИЗАЦИИ
@Logger()
@Component(1)
class User {
	@Prop id: number;

	@Method
	changeId(@Param newId: number): void {
		this.id = newId;
	}
}

const user = new User();
console.log(user.id); // 1
user.changeId(2);
console.log(user.id); // 20
user.changeId(3);
console.log(user.id); // 30
