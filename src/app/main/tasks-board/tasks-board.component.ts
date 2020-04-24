import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/_services/task.service';
import { Task, Status } from 'src/app/_models/task';
import { first } from 'rxjs/operators';
import { CustomDate } from 'src/app/_helpers/custom-date';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss']
})
export class TasksBoardComponent implements OnInit {
  bsModalRef: BsModalRef;
  onReloadSubscription: Subscription;
  tasks: Task[] = [];
  todos : Task[] = [];
  inprogress: Task[] =[];
  inreview: Task[] =[];
  qatodo: Task[] =[];
  qainprogress: Task[] =[];
  done: Task[]=[];
  statusToDo = Status.ToDo;
  statusInProgress = Status.InProgress;
  statusInReview = Status.InReview;
  statusQaToDo = Status.QaToDo;
  statusQaInProgress = Status.QaInprogress;
  statusDone = Status.Done;
  name: string;

  constructor(private bsModalService: BsModalService,
    private taskService: TaskService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.GetLogedUserName();

    this.getMyTasks();
  }
  private getMyTasks(): void {
    this.taskService.getByUserId(this.authService.currentUserValue.id).pipe(first()).subscribe(tasks => {
      this.tasks = tasks;
      console.log(tasks);

      this.todos = tasks.filter(word => word.status == Status.ToDo);
      this.inprogress = tasks.filter(word => word.status == Status.InProgress);
      this.inreview = tasks.filter(word => word.status == Status.InReview);
      this.qatodo = tasks.filter(word => word.status == Status.QaToDo);
      this.qainprogress = tasks.filter(word => word.status == Status.QaInprogress);
      this.done = tasks.filter(word => word.status == Status.Done);
    });
  }

  onTaskDrop(task: Task, e : any): void {
    const draggedTask: Task = e.dragData;

    let newStatus: Status;
    
		if (task.status === Status.ToDo) {
			newStatus = Status.ToDo;
		} else if (task.status === Status.Done) {
			newStatus = Status.ToDo;
		}  else if (task.status === Status.InReview) {
			newStatus = Status.InReview;
    } else if (task.status === Status.QaToDo) {
			newStatus = Status.QaToDo;
		} else if (task.status === Status.QaInprogress) {
			newStatus = Status.QaInprogress;
    }else {
			newStatus = Status.InProgress;
    }
    
    draggedTask.status = newStatus;
  
    const formData = new FormData();
    formData.append('ID', draggedTask.id.toString()); 
    formData.append('Name', draggedTask.name);
    formData.append('Description', draggedTask.description);
    formData.append('AssigneeID', draggedTask.assignee.id.toString());
    formData.append('CreatorID', draggedTask.creator.id.toString());
    formData.append('Status', draggedTask.status.toString());
    formData.append('ProjectID', draggedTask.project.id.toString());
    formData.append('DueDate',  draggedTask.dueDate);
    
    this.taskService.set(formData)
      .pipe(first())
      .subscribe(
        (task : Task) => {
          this.getMyTasks();
        },
        error => {
        });
  }

  onStatusDrop(status: Status, e : any): void {
    const draggedTask: Task = e.dragData;
    var oldStatus = draggedTask.status;
    draggedTask.status = status;
  
    const formData = new FormData();
    formData.append('ID', draggedTask.id.toString()); 
    formData.append('Name', draggedTask.name);
    formData.append('Description', draggedTask.description);
    formData.append('AssigneeID', draggedTask.assignee.id.toString());
    formData.append('CreatorID', draggedTask.creator.id.toString());
    formData.append('Status', draggedTask.status.toString());
    formData.append('OldStatus', oldStatus.toString());
    formData.append('ProjectID', draggedTask.project.id.toString());
    formData.append('DueDate',  draggedTask.dueDate);
    
    this.taskService.set(formData)
      .pipe(first())
      .subscribe(
        (task : Task) => {
          this.getMyTasks();
        },
        error => {
        });
  }
  
  onEditClick(task? : Task): void {
		if (!task) {
			task = new Task();
		}
    debugger;
    
		this.bsModalRef = this.bsModalService.show(
      EditTaskModalComponent,
			{
				initialState: {
          task: task,
          name: this.name
				}
			}
    );

		this.onReloadSubscription = this.bsModalRef.content.onReloadEmitter.subscribe(() => {
      this.getMyTasks();
      }
    );
  }

  RequestTask() {
    this.taskService.getAll().pipe(first()).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onDeleteClick(taskId : number) {
    this.RequestDeleteTask(taskId);
  }
  
  RequestDeleteTask(taskId : number) {
    this.taskService.delete(taskId).pipe(first()).subscribe(data => {this.getMyTasks();});
  }

  GetLogedUserName() {
    const currentUser = this.authService.currentUserValue;
    this.name = currentUser.userName;
  }
}
