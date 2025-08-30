import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "src/app/Model/Task";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
})
export class TaskDetailsComponent {
  @Input()
  currentTask: Task;

  @Output()
  CloseDetailView: EventEmitter<boolean> = new EventEmitter<boolean>();
  OnCloseTaskDetail() {
    this.CloseDetailView.emit(false);
  }
}
