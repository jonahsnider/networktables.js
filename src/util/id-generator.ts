type Id = number;

export class IdGenerator {
	private readonly seenHoles: Set<Id> = new Set();
	private holes: Id[] = [];
	private nextId = 0;

	public generate(): Id {
		if (this.holes.length > 0) {
			const id = this.holes.pop()!;

			this.seenHoles.delete(id);
			return id;
		}

		return this.nextId++;
	}

	public release(id: Id): void {
		if (id >= this.nextId || this.seenHoles.has(id)) {
			return;
		}

		this.seenHoles.add(id);
		this.holes.push(id);
	}

	public clear(): void {
		this.seenHoles.clear();
		this.holes = [];
		this.nextId = 0;
	}
}
