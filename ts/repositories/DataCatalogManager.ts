export class DataCatalogManager<T extends { id: string | number }> {

    private items: T[] = [];

    constructor(initialData: T[] = []) {

        this.items = [...initialData];

    }

    add(item: T): void {

        this.items.push(item);

    }

    getAll(): T[] {

        return this.items;

    }

    findById(id: string | number): T | undefined {

        return this.items.find(item => item.id === id);

    }

    update(id: string | number, data: Partial<T>): boolean {

        const item = this.findById(id);

        if (!item) {

            return false;

        }

        Object.assign(item, data);

        return true;

    }

    remove(id: string | number): boolean {

        const index = this.items.findIndex(item => item.id === id);

        if (index === -1) {

            return false;

        }

        this.items.splice(index, 1);

        return true;

    }

    filter(predicate: (item: T) => boolean): T[] {

        return this.items.filter(predicate);

    }

}