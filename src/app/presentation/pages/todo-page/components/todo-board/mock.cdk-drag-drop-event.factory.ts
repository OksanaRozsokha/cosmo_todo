import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

export class DragDropEventFactory<T> {

   createInContainerEvent(containerId: string, data: T[], fromIndex: number, toIndex: number): CdkDragDrop<T[]> {
      const event = this.createEvent(fromIndex, toIndex);
      const container: any = { id: containerId, data: data };
      event.container = container;
      event.previousContainer = event.container;
      event.item = { data: data[fromIndex] } as CdkDrag<T>;
      event.previousIndex = fromIndex;
      event.currentIndex = toIndex;
      return event;
   }

   createCrossContainerEvent(from: ContainerModel<T>, to: ContainerModel<T>, fromIndex: number, toIndex: number): CdkDragDrop<T[]> {
      const event = this.createEvent(from.index, to.index);
      event.container = this.createContainer(to);
      event.previousContainer = this.createContainer(from);
      event.item = { data: from.data[from.index] } as CdkDrag<T>;
      event.previousIndex = fromIndex;
      event.currentIndex = toIndex;
      return event;
   }

   private createEvent(previousIndex: number, currentIndex: number): CdkDragDrop<T[]> {
      return {
         previousIndex: previousIndex,
         currentIndex: currentIndex,
         item: this.createItem({data: <T>{}}),
         container: this.createContainer({id: '', data: [], index: 0}),
         previousContainer: this.createContainer({id: '', data: [], index: 0}),
         isPointerOverContainer: true,
         distance: { x: 0, y: 0 },
         dropPoint: new MouseEvent(''),
         event: new MouseEvent('')
      };
   }

    private createContainer(model: ContainerModel<T>): CdkDropList<T[]> {
      const container: any = { id: model.id, data: model.data };
      return <CdkDropList<T[]>>container;
    }

    private createItem(model: ItemModel<T>): CdkDrag<T> {
        const item: any = {data: model.data}
        return <CdkDrag<T>>item;
    }

}

export interface ContainerModel<T> {
   id: string,
   data: T[],
   index: number
}

export interface ItemModel<T> {
    data: T,
}
