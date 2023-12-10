class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  private tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Person entered the house.");
    } else {
      console.log("The door is closed. Person cannot enter.");
    }
  }

  getTenants(): Person[] {
    return this.tenants;
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key1 = new Key();
const key2 = new Key();

const house = new MyHouse(key1);

const person1 = new Person(key1);
const person2 = new Person(key2);

house.openDoor(person1.getKey());
house.comeIn(person1);

house.openDoor(person2.getKey()); // Wrong key, door is closed
house.comeIn(person2); // Wrong key, person not entered

console.log(house.getTenants()); // [person1]

export {};
