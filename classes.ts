interface ICoord {
  lat: number;
  long: number;

  calculateDistance: (newLat: number, newLong: number) => number;
}

interface IMapPoint extends ICoord {
  // get и set
  name: string;
}

class Coord implements ICoord {
  public lat: number;
  public long: number;
  protected message = "Coord";

  // сработает при вызове new
  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
    console.log(this.message);
  }

  public calculateDistance(newLat: number, newLong: number): number {
    return 2;
  }
}

class MapPoint extends Coord implements IMapPoint {
  // стандарт указания внутренних свойств
  // доступ к котороым возможен через
  // get и set
  private _name: string;
  protected message = "MapPoint";

  constructor(lat: number, long: number, name: string) {
    // обязательно сверху
    super(lat, long);
    // так вызывается set name
    this.name = name;
    console.log(this.message);
  }

  public get name(): string {
    return this._name;
  }

  public set name(n: string) {
    this._name = n + " cool!!!";
  }

  // override явно указывает что мы перезаписуем метод родительского класса
  // в случае перейменования или удаления метода calculateDistance
  // родительского класса мы получим ошибку
  override calculateDistance(newLat: number, newLong: number): number {
    console.log(this.name);
    const dist = super.calculateDistance(newLat, newLong);
    return dist * dist;
  }
}

const point = new MapPoint(44, 55, "Las Vegas drochilnya");
console.log(point);

const distOnMap = point.calculateDistance(34, 34);
console.log(distOnMap);

// срабатывает set name
point.name = "Zapor";
// срабатывает get name
console.log(point.name);

class MyClass<T> {
  static a = "FFFF";
  b: T;

  constructor(b: T) {
    this.b = b;
  }
}

// статические методы доступны напрямую из класса
MyClass.a;
const obj = new MyClass<string>("d");

abstract class Base {
  print(msg: string) {
    console.log(msg);
  }

  // для того что бы заставить пользователя
  // реализовать функцию внутри его класса
  abstract err(err: Error): void;
}

class BaseExtend extends Base {
  // какая то реализация

  err(err: Error) {
    console.log(err.message);
  }
}

new BaseExtend().print("ff");
