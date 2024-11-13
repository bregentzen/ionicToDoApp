export class ToDo {
    static nextID = 1;
    id: number;
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    status: string;
  
    constructor(title: string, description: string, assignee: string, dueDate: string, status: string) {
      this.id = ToDo.nextID++;
      this.title = title;
      this.description = description;
      this.assignee = assignee;
      this.dueDate = dueDate;
      if (status == 'new' || status == 'todo' || status == 'delegate' || status == 'done') {
        this.status = status;
      }
      else {
        this.status = 'Invalid;';
        console.log('Invalid status: ' + status);
      }
    }
  }