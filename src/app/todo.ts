export class ToDo {
    static nextID = 1;
    id: number;
    title: string;
    description: string;
    assignee: string;
    dueDate: Date;
    status: Status;
  
    constructor(title: string, description: string, assignee: string, dueDate: Date, status: string) {
      this.id = ToDo.nextID++;
      this.title = title;
      this.description = description;
      this.assignee = assignee;
      this.dueDate = dueDate;
      this.status = new Status(status);
    }
  }

  export class Status {
    status: string;
  
    constructor(status: string) {
      if (status === 'new' || status === 'todo' || status === 'delegate' || status === 'done') {
        this.status = status;
      }
      else {
        throw new Error('Invalid status');
      }
    }
  }